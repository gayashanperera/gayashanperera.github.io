import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { Certification } from '../../data/profile.types';

@Component({
  selector: 'app-cert-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cert-card.component.html',
  styleUrl: './cert-card.component.scss',
})
export class CertCardComponent {
  readonly cert = input.required<Certification>();
}
