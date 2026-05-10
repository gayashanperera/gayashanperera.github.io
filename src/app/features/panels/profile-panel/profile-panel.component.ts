import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PROFILE_PANEL_LINES } from '../../../data/profile.data';
import type { ProjectId } from '../../../data/profile.types';
import { CodeLineComponent } from '../../../shared/code-line/code-line.component';
import { IdeStateService } from '../../../state/ide-state.service';

@Component({
  selector: 'app-profile-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CodeLineComponent],
  template: `
    @for (line of lines; track $index) {
      <app-code-line [line]="line" (pillClicked)="onPill($event)" />
    }
  `,
  styles: [
    `
      :host {
        display: block;
        padding: 14px 0 60px;
        font-size: 13.5px;
        line-height: 1.7;
      }
      @media (max-width: 900px) {
        :host {
          font-size: 12.5px;
          line-height: 1.65;
        }
      }
    `,
  ],
})
export class ProfilePanelComponent {
  private readonly state = inject(IdeStateService);
  protected readonly lines = PROFILE_PANEL_LINES;

  onPill(id: ProjectId): void {
    this.state.openProject(id);
  }
}
