import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CONTACT_ROWS } from '../../../data/profile.data';

@Component({
  selector: 'app-contact-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact-panel.component.html',
  styleUrl: './contact-panel.component.scss',
})
export class ContactPanelComponent {
  protected readonly rows = CONTACT_ROWS;
}
