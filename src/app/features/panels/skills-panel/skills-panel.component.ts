import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { SKILLS } from '../../../data/profile.data';
import type { CodeLine, SkillBar, SkillGroup } from '../../../data/profile.types';
import { CodeLineComponent } from '../../../shared/code-line/code-line.component';
import { SkillBarComponent } from '../../../shared/skill-bar/skill-bar.component';
import { IdeStateService } from '../../../state/ide-state.service';

interface SkillSection {
  readonly group: SkillGroup;
  readonly openLine: CodeLine;
  readonly closeLine: CodeLine;
  readonly bars: readonly SkillBar[];
}

@Component({
  selector: 'app-skills-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CodeLineComponent, SkillBarComponent],
  templateUrl: './skills-panel.component.html',
  styleUrl: './skills-panel.component.scss',
})
export class SkillsPanelComponent {
  protected readonly state = inject(IdeStateService);
  protected readonly animate = signal(false);

  protected readonly intro: CodeLine = {
    num: 1,
    tokens: [{ kind: 'comment', text: '// skills.json — confidence is roughly years × intensity.' }],
  };
  protected readonly openBrace: CodeLine = { num: 2, tokens: [{ kind: 'text', text: '{' }] };
  protected readonly closeBrace: CodeLine = {
    num: 11,
    tokens: [{ kind: 'text', text: '}' }, { kind: 'cursor' }],
  };

  protected readonly sections: readonly SkillSection[] = [
    {
      group: 'frontend',
      openLine: this.openLine(3, 'frontend'),
      closeLine: this.closeLine(4, true),
      bars: SKILLS.filter((s) => s.group === 'frontend'),
    },
    {
      group: 'backend',
      openLine: this.openLine(5, 'backend'),
      closeLine: this.closeLine(6, true),
      bars: SKILLS.filter((s) => s.group === 'backend'),
    },
    {
      group: 'data',
      openLine: this.openLine(7, 'data'),
      closeLine: this.closeLine(8, true),
      bars: SKILLS.filter((s) => s.group === 'data'),
    },
    {
      group: 'tools',
      openLine: this.openLine(9, 'tools'),
      closeLine: this.closeLine(10, false),
      bars: SKILLS.filter((s) => s.group === 'tools'),
    },
  ];

  private readonly isActive = computed(() => this.state.activeFile() === 'skills');

  constructor() {
    effect(() => {
      if (!this.isActive()) {
        this.animate.set(false);
        return;
      }
      this.animate.set(false);
      queueMicrotask(() => this.animate.set(true));
    });
  }

  private openLine(num: number, key: SkillGroup): CodeLine {
    return {
      num,
      tokens: [
        { kind: 'text', text: '  ' },
        { kind: 'prop', text: `"${key}"` },
        { kind: 'text', text: ': [' },
      ],
    };
  }

  private closeLine(num: number, withComma: boolean): CodeLine {
    return { num, tokens: [{ kind: 'text', text: withComma ? '  ],' : '  ]' }] };
  }
}
