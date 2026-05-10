import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import type { FileId } from '../../data/profile.types';
import { IdeStateService } from '../../state/ide-state.service';

interface MobileFileBtn {
  readonly id: FileId;
  readonly glyph: string;
  readonly label: string;
}

const FILE_BTNS: readonly MobileFileBtn[] = [
  { id: 'profile', glyph: '⌥', label: 'profile' },
  { id: 'experience', glyph: '⊙', label: 'career' },
  { id: 'skills', glyph: '▤', label: 'skills' },
  { id: 'contact', glyph: '✉', label: 'contact' },
];

@Component({
  selector: 'app-mobile-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './mobile-nav.component.html',
  styleUrl: './mobile-nav.component.scss',
})
export class MobileNavComponent {
  protected readonly state = inject(IdeStateService);
  protected readonly fileBtns = FILE_BTNS;

  openSheetTerminal(): void {
    this.state.toggleSheet();
    if (this.state.sheetOpen()) {
      this.state.setRightPane('terminal');
    }
  }
}
