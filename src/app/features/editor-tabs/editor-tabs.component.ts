import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterNextRender,
  effect,
  inject,
  viewChild,
} from '@angular/core';
import { FILES } from '../../data/profile.data';
import { IdeStateService } from '../../state/ide-state.service';

@Component({
  selector: 'app-editor-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './editor-tabs.component.html',
  styleUrl: './editor-tabs.component.scss',
})
export class EditorTabsComponent {
  protected readonly state = inject(IdeStateService);
  protected readonly files = FILES;

  private readonly tabsHost = viewChild.required<ElementRef<HTMLElement>>('tabsHost');

  constructor() {
    afterNextRender(() => this.centerActiveTab());

    effect(() => {
      void this.state.activeFile();
      queueMicrotask(() => this.centerActiveTab());
    });
  }

  private centerActiveTab(): void {
    const host = this.tabsHost().nativeElement;
    const active = host.querySelector<HTMLElement>('.tab.active');
    if (!active) return;
    if (host.scrollWidth <= host.clientWidth) return;
    const target = active.offsetLeft - (host.clientWidth - active.offsetWidth) / 2;
    host.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
  }
}
