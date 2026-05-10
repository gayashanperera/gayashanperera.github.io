import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IdeShellComponent } from './ide-shell/ide-shell.component';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IdeShellComponent],
  template: `<app-ide-shell />`,
})
export class App {}
