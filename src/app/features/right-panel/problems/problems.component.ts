import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROBLEMS } from '../../../data/profile.data';

@Component({
  selector: 'app-problems',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './problems.component.html',
  styleUrl: './problems.component.scss',
})
export class ProblemsComponent {
  protected readonly problems = PROBLEMS;
}
