import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { IdeStateService } from '../../state/ide-state.service';

@Component({
  selector: 'app-title-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="traffic" aria-hidden="true">
      <span class="r"></span>
      <span class="y"></span>
      <span class="g"></span>
    </div>
    <div class="title">profile — <em>{{ activeLabel() }}</em> — ~/work/gayashan-perera</div>
    <button class="pal-trigger" type="button" (click)="state.openPalette()" aria-label="Open command palette">
      <span class="pal-label">Search files &amp; commands</span>
      <span class="kbd">⌘ K</span>
    </button>
  `,
  styleUrl: './title-bar.component.scss',
})
export class TitleBarComponent {
  protected readonly state = inject(IdeStateService);
  protected readonly activeLabel = computed(() => this.state.activeFileEntry().label);
}
