import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import type { GlyphKind } from '../../../data/profile.types';
import { IdeStateService } from '../../../state/ide-state.service';

@Component({
  selector: 'app-outline',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './outline.component.html',
  styleUrl: './outline.component.scss',
})
export class OutlineComponent {
  protected readonly state = inject(IdeStateService);
  protected readonly entry = computed(() => this.state.activeFileEntry());

  protected glyphChar(kind: GlyphKind): string {
    return kind === 'v' ? '⊙' : kind;
  }
}
