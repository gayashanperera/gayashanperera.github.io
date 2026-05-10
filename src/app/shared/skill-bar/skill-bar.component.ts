import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-skill-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="name">{{ name() }}</div>
    <div class="track">
      <div class="fill" [style.width.%]="fillPct()"></div>
    </div>
    <div class="pct">{{ pct() }}%</div>
  `,
  styleUrl: './skill-bar.component.scss',
})
export class SkillBarComponent {
  readonly name = input.required<string>();
  readonly pct = input.required<number>();
  readonly animate = input(true);

  readonly fillPct = computed(() => (this.animate() ? this.pct() : 0));
}
