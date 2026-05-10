import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { IconComponent } from '../../shared/icon/icon.component';
import { IdeStateService } from '../../state/ide-state.service';

@Component({
  selector: 'app-status-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  templateUrl: './status-bar.component.html',
  styleUrl: './status-bar.component.scss',
})
export class StatusBarComponent {
  private readonly state = inject(IdeStateService);
  readonly position = input(1);
  protected readonly lang = computed(() => this.state.activeFileEntry().lang);
}
