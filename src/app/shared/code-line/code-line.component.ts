import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import type { CodeLine, CodeToken, ProjectId } from '../../data/profile.types';
import { PillComponent } from '../pill/pill.component';

@Component({
  selector: 'app-code-line',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PillComponent],
  templateUrl: './code-line.component.html',
  styleUrl: './code-line.component.scss',
  host: {
    '[class.code-line]': 'true',
    '[class.code-line--toggle]': 'isToggle()',
    '[class.code-line--open]': 'open()',
    '[attr.data-job]': 'line().jobId ?? null',
  },
})
export class CodeLineComponent {
  readonly line = input.required<CodeLine>();
  readonly open = input(false);

  readonly pillClicked = output<ProjectId>();
  readonly toggle = output<void>();

  readonly tokens = computed(() => this.line().tokens);
  readonly num = computed(() => this.line().num);
  readonly isToggle = computed(() => this.line().toggle === true);

  onPillClick(event: MouseEvent, projectId: ProjectId | undefined): void {
    event.stopPropagation();
    if (projectId) this.pillClicked.emit(projectId);
  }

  onRowClick(): void {
    if (this.isToggle()) this.toggle.emit();
  }

  asPill(token: CodeToken): { text: string; tone: 'default' | 'kw' | 'fn' | 'str' | 'num'; projectId?: ProjectId } | null {
    return token.kind === 'pill' ? token : null;
  }

  asHero(
    token: CodeToken,
  ): { leadingText: string; accents: readonly string[]; trailingText: string; sub: string } | null {
    return token.kind === 'hero' ? token : null;
  }

  asUrl(text: string): { open: string; href: string; close: string } | null {
    const m = text.match(/^(["'`]?)(https?:\/\/[^\s"'`]+)(["'`]?)$/);
    if (!m) return null;
    return { open: m[1] ?? '', href: m[2] ?? '', close: m[3] ?? '' };
  }
}
