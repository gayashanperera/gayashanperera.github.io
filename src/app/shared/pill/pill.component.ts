import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import type { PillTone } from '../../data/profile.types';

@Component({
  selector: 'app-pill',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="pill" [class]="'pill--' + tone()" (click)="clicked.emit($event)">{{ text() }}</span>`,
  styleUrl: './pill.component.scss',
})
export class PillComponent {
  readonly text = input.required<string>();
  readonly tone = input<PillTone>('default');
  readonly clicked = output<MouseEvent>();
}
