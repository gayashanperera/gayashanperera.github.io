import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import type { RightPaneId } from '../../data/profile.types';
import { IdeStateService } from '../../state/ide-state.service';
import { OutlineComponent } from './outline/outline.component';
import { ProblemsComponent } from './problems/problems.component';
import { TerminalComponent } from './terminal/terminal.component';

interface PaneTab {
  readonly id: RightPaneId;
  readonly label: string;
  readonly badge?: { text: string; tone: 'default' | 'ok' };
}

const TABS: readonly PaneTab[] = [
  { id: 'outline', label: 'Outline' },
  { id: 'problems', label: 'Problems', badge: { text: '0', tone: 'ok' } },
  { id: 'terminal', label: 'Terminal' },
];

@Component({
  selector: 'app-right-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [OutlineComponent, ProblemsComponent, TerminalComponent],
  templateUrl: './right-panel.component.html',
  styleUrl: './right-panel.component.scss',
})
export class RightPanelComponent {
  protected readonly state = inject(IdeStateService);
  protected readonly tabs = TABS;
}
