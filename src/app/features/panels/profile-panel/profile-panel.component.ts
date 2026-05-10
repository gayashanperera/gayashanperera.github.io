import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  CERTIFICATIONS,
  PROFILE_PANEL_LINES,
  PROFILE_PANEL_LINES_AFTER_CERTS,
} from '../../../data/profile.data';
import type { ProjectId } from '../../../data/profile.types';
import { CertCardComponent } from '../../../shared/cert-card/cert-card.component';
import { CodeLineComponent } from '../../../shared/code-line/code-line.component';
import { IdeStateService } from '../../../state/ide-state.service';

@Component({
  selector: 'app-profile-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CodeLineComponent, CertCardComponent],
  templateUrl: './profile-panel.component.html',
  styleUrl: './profile-panel.component.scss',
})
export class ProfilePanelComponent {
  private readonly state = inject(IdeStateService);
  protected readonly head = PROFILE_PANEL_LINES;
  protected readonly tail = PROFILE_PANEL_LINES_AFTER_CERTS;
  protected readonly certs = CERTIFICATIONS;

  onPill(id: ProjectId): void {
    this.state.openProject(id);
  }
}
