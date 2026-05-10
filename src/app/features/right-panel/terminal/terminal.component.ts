import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TerminalService } from '../../../state/terminal.service';

@Component({
  selector: 'app-terminal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  templateUrl: './terminal.component.html',
  styleUrl: './terminal.component.scss',
})
export class TerminalComponent {
  protected readonly terminal = inject(TerminalService);
  protected readonly draft = signal('');

  private readonly bodyRef = viewChild.required<ElementRef<HTMLDivElement>>('body');
  private readonly inputRef = viewChild.required<ElementRef<HTMLInputElement>>('input');

  constructor() {
    effect(() => {
      void this.terminal.lines();
      queueMicrotask(() => {
        const el = this.bodyRef().nativeElement;
        el.scrollTop = el.scrollHeight;
      });
    });
  }

  focusInput(): void {
    this.inputRef().nativeElement.focus();
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    const value = this.draft();
    this.draft.set('');
    this.terminal.run(value);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.draft.set(this.terminal.walkHistory(-1, this.draft()));
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.draft.set(this.terminal.walkHistory(1, this.draft()));
    }
  }
}
