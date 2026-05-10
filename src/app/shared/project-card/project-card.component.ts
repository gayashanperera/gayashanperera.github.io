import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { JobMeta } from '../../data/profile.types';
import { PillComponent } from '../pill/pill.component';

@Component({
  selector: 'app-project-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PillComponent],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
  host: {
    '[class.proj-card]': 'true',
    '[class.open]': 'open()',
    '[attr.data-jobcard]': 'job().id',
    '[attr.aria-hidden]': '!open()',
  },
})
export class ProjectCardComponent {
  readonly job = input.required<JobMeta>();
  readonly open = input(false);
}
