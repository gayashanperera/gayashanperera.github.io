import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  signal,
  viewChild,
} from '@angular/core';

type Phase =
  | { kind: 'walking'; from: number; duration: number; sx: number; sy: number; tx: number; ty: number; angle: number }
  | { kind: 'pausing'; from: number; duration: number; x: number; y: number; angle: number }
  | { kind: 'looking'; from: number; duration: number; x: number; y: number; baseAngle: number; sweep: number };

@Component({
  selector: 'app-angular-bug',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './angular-bug.component.html',
  styleUrl: './angular-bug.component.scss',
})
export class AngularBugComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly hostRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly bugRef = viewChild.required<ElementRef<HTMLElement>>('bug');
  private readonly shadowRef = viewChild.required<ElementRef<HTMLElement>>('shadow');

  protected readonly walking = signal(false);

  private rafId = 0;
  private phase: Phase | null = null;
  private bounds: { w: number; h: number } = { w: 0, h: 0 };

  // Calibrated speed (px/sec). Real ladybugs do ~10cm/min ~= ~30 px/s on screen.
  private readonly walkSpeed = 26;

  constructor() {
    afterNextRender(() => this.start());
  }

  private start(): void {
    if (typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const el = this.bugRef().nativeElement;
      el.style.transform = 'translate3d(40px, 40px, 0) rotate(20deg)';
      this.shadowRef().nativeElement.style.transform = 'translate3d(40px, 42px, 0) rotate(20deg)';
      return;
    }

    this.measure();
    this.phase = this.makeWalkPhase(performance.now() / 1000, this.bounds.w * 0.5, this.bounds.h * 0.5, 0);

    const tick = (now: number) => {
      this.measure();
      this.step(now / 1000);
      this.rafId = requestAnimationFrame(tick);
    };
    this.rafId = requestAnimationFrame(tick);

    this.destroyRef.onDestroy(() => cancelAnimationFrame(this.rafId));
  }

  private measure(): void {
    const host = this.hostRef.nativeElement;
    this.bounds = { w: host.clientWidth, h: host.clientHeight };
  }

  private step(t: number): void {
    if (!this.phase || this.bounds.w === 0 || this.bounds.h === 0) return;

    const elapsed = t - this.phase.from;
    const ph = this.phase;

    if (ph.kind === 'walking') {
      const u = Math.min(1, elapsed / ph.duration);
      const e = easeInOutSine(u);
      const x = ph.sx + (ph.tx - ph.sx) * e;
      const y = ph.sy + (ph.ty - ph.sy) * e;
      this.applyTransform(x, y, ph.angle, true);

      if (u >= 1) {
        // Decide next state — usually pause briefly, sometimes immediately walk again
        const r = Math.random();
        if (r < 0.55) {
          this.phase = this.makePausePhase(t, ph.tx, ph.ty, ph.angle);
        } else if (r < 0.8) {
          this.phase = this.makeLookPhase(t, ph.tx, ph.ty, ph.angle);
        } else {
          const next = this.pickWalkTarget(ph.tx, ph.ty);
          this.phase = this.makeWalkPhase(t, ph.tx, ph.ty, next.angle, next);
        }
      }
      return;
    }

    if (ph.kind === 'pausing') {
      this.applyTransform(ph.x, ph.y, ph.angle, false);
      if (elapsed >= ph.duration) {
        if (Math.random() < 0.4) {
          this.phase = this.makeLookPhase(t, ph.x, ph.y, ph.angle);
        } else {
          const next = this.pickWalkTarget(ph.x, ph.y);
          this.phase = this.makeWalkPhase(t, ph.x, ph.y, next.angle, next);
        }
      }
      return;
    }

    // looking
    const u = elapsed / ph.duration;
    const wave = Math.sin(u * Math.PI * 2);
    const angle = ph.baseAngle + wave * ph.sweep;
    this.applyTransform(ph.x, ph.y, angle, false);
    if (elapsed >= ph.duration) {
      const next = this.pickWalkTarget(ph.x, ph.y);
      this.phase = this.makeWalkPhase(t, ph.x, ph.y, ph.baseAngle, next);
    }
  }

  private applyTransform(x: number, y: number, angle: number, isWalking: boolean): void {
    const bug = this.bugRef().nativeElement;
    const shadow = this.shadowRef().nativeElement;
    bug.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${angle}deg)`;
    shadow.style.transform = `translate3d(${x}px, ${y + 4}px, 0) rotate(${angle}deg)`;
    if (this.walking() !== isWalking) this.walking.set(isWalking);
  }

  private makeWalkPhase(
    t: number,
    sx: number,
    sy: number,
    currentAngle: number,
    target?: { tx: number; ty: number; angle: number },
  ): Phase {
    const tgt = target ?? this.pickWalkTarget(sx, sy);
    const dist = Math.hypot(tgt.tx - sx, tgt.ty - sy);
    const duration = Math.max(0.6, dist / this.walkSpeed);
    return {
      kind: 'walking',
      from: t,
      duration,
      sx,
      sy,
      tx: tgt.tx,
      ty: tgt.ty,
      angle: tgt.angle,
    };
  }

  private makePausePhase(t: number, x: number, y: number, angle: number): Phase {
    return { kind: 'pausing', from: t, duration: 0.6 + Math.random() * 1.4, x, y, angle };
  }

  private makeLookPhase(t: number, x: number, y: number, baseAngle: number): Phase {
    return {
      kind: 'looking',
      from: t,
      duration: 1.6 + Math.random() * 1.0,
      x,
      y,
      baseAngle,
      sweep: 18 + Math.random() * 14,
    };
  }

  private pickWalkTarget(sx: number, sy: number): { tx: number; ty: number; angle: number } {
    const w = this.bounds.w;
    const h = this.bounds.h;
    const margin = 40;
    // 6 random candidates, pick one that's neither the wall nor too close.
    let best = { tx: w * 0.5, ty: h * 0.5, score: -Infinity };
    for (let i = 0; i < 6; i++) {
      const tx = margin + Math.random() * (w - margin * 2);
      const ty = margin + Math.random() * (h - margin * 2);
      const dist = Math.hypot(tx - sx, ty - sy);
      // Prefer mid-range walks (60–220 px), penalise tiny moves and full-pane sprints
      const desired = 140;
      const score = -Math.abs(dist - desired);
      if (score > best.score) best = { tx, ty, score };
    }
    const angle = Math.atan2(best.ty - sy, best.tx - sx) * (180 / Math.PI) + 90;
    return { tx: best.tx, ty: best.ty, angle };
  }
}

function easeInOutSine(u: number): number {
  return -(Math.cos(Math.PI * u) - 1) / 2;
}
