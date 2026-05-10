import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FILES, PROJECTS, SOURCE_CONTROL } from '../../data/profile.data';
import { IconComponent } from '../../shared/icon/icon.component';
import { IdeStateService } from '../../state/ide-state.service';

@Component({
  selector: 'app-file-explorer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  templateUrl: './file-explorer.component.html',
  styleUrl: './file-explorer.component.scss',
})
export class FileExplorerComponent {
  protected readonly state = inject(IdeStateService);
  protected readonly files = FILES;
  protected readonly projects = PROJECTS;
  protected readonly sourceControl = SOURCE_CONTROL;
}
