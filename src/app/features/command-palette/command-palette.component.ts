import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  computed,
  effect,
  inject,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { PaletteCommand, PaletteSectionId } from '../../data/profile.types';
import { IconComponent } from '../../shared/icon/icon.component';
import { IdeStateService } from '../../state/ide-state.service';

interface PaletteGroup {
  readonly section: PaletteSectionId;
  readonly items: readonly { command: PaletteCommand; index: number }[];
}

@Component({
  selector: 'app-command-palette',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, IconComponent],
  templateUrl: './command-palette.component.html',
  styleUrl: './command-palette.component.scss',
  host: {
    '[class.open]': 'state.paletteOpen()',
    '[attr.aria-hidden]': '!state.paletteOpen()',
  },
})
export class CommandPaletteComponent {
  protected readonly state = inject(IdeStateService);
  private readonly inputRef = viewChild<ElementRef<HTMLInputElement>>('input');
  private readonly listRef = viewChild<ElementRef<HTMLDivElement>>('list');

  protected readonly groups = computed<readonly PaletteGroup[]>(() => {
    const items = this.state.filteredCommands();
    const groups = new Map<PaletteSectionId, { command: PaletteCommand; index: number }[]>();
    items.forEach((c, i) => {
      const arr = groups.get(c.section) ?? [];
      arr.push({ command: c, index: i });
      groups.set(c.section, arr);
    });
    return Array.from(groups.entries()).map(([section, list]) => ({ section, items: list }));
  });

  constructor() {
    effect(() => {
      if (this.state.paletteOpen()) {
        queueMicrotask(() => this.inputRef()?.nativeElement.focus());
      }
    });

    effect(() => {
      void this.state.paletteSelIndex();
      queueMicrotask(() => {
        const list = this.listRef()?.nativeElement;
        list?.querySelector<HTMLElement>('.pal-item.sel')?.scrollIntoView({ block: 'nearest' });
      });
    });
  }

  onQueryChange(value: string): void {
    this.state.setPaletteQuery(value);
  }

  @HostListener('document:keydown', ['$event'])
  handleKey(event: KeyboardEvent): void {
    if (!this.state.paletteOpen()) return;
    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        this.state.closePalette();
        return;
      case 'ArrowDown':
        event.preventDefault();
        this.state.movePaletteSelection(1);
        return;
      case 'ArrowUp':
        event.preventDefault();
        this.state.movePaletteSelection(-1);
        return;
      case 'Enter':
        event.preventDefault();
        this.state.runPaletteSelected();
        return;
    }
  }

  onScrimClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) this.state.closePalette();
  }

  run(cmd: PaletteCommand): void {
    this.state.runPaletteCommand(cmd);
  }
}
