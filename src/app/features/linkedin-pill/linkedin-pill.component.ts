import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CONTACT } from '../../data/profile.data';
import { IconComponent } from '../../shared/icon/icon.component';

@Component({
  selector: 'app-linkedin-pill',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  template: `
    <a class="back" [href]="url" target="_blank" rel="noopener noreferrer">
      <app-icon name="linkedin" />
      LINKEDIN
    </a>
  `,
  styleUrl: './linkedin-pill.component.scss',
})
export class LinkedinPillComponent {
  protected readonly url = CONTACT.linkedinUrl;
}
