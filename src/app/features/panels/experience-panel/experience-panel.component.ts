import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  EXPERIENCE_PANEL_HEAD,
  EXPERIENCE_PANEL_JOBS,
  EXPERIENCE_PANEL_TAIL,
  JOBS,
  JOBS_BY_ID,
} from '../../../data/profile.data';
import type { CodeLine, JobId } from '../../../data/profile.types';
import { CodeLineComponent } from '../../../shared/code-line/code-line.component';
import { ProjectCardComponent } from '../../../shared/project-card/project-card.component';
import { IdeStateService } from '../../../state/ide-state.service';

@Component({
  selector: 'app-experience-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CodeLineComponent, ProjectCardComponent],
  templateUrl: './experience-panel.component.html',
  styleUrl: './experience-panel.component.scss',
})
export class ExperiencePanelComponent {
  protected readonly state = inject(IdeStateService);
  protected readonly head = EXPERIENCE_PANEL_HEAD;
  protected readonly tail = EXPERIENCE_PANEL_TAIL;
  protected readonly jobs = JOBS;

  protected jobLineFor(id: JobId): CodeLine {
    const found = EXPERIENCE_PANEL_JOBS.find((l) => l.jobId === id);
    if (!found) throw new Error(`No code line for job ${id}`);
    return found;
  }

  protected jobMeta(id: JobId) {
    return JOBS_BY_ID[id];
  }
}
