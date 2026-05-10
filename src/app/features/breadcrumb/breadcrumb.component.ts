import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { IconComponent } from '../../shared/icon/icon.component';
import { IdeStateService } from '../../state/ide-state.service';

@Component({
  selector: 'app-breadcrumb',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  template: `
    <span class="seg">profile</span>
    <app-icon name="chevron-right" />
    <span class="seg">src</span>
    <app-icon name="chevron-right" />
    <span class="cur">{{ current() }}</span>
  `,
  styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent {
  private readonly state = inject(IdeStateService);
  protected readonly current = computed(() => this.state.activeFileEntry().crumb);
}
