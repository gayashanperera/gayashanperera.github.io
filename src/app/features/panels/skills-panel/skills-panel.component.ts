import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
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
})
export class SkillsPanelComponent {
  private readonly state = inject(IdeStateService);
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
    this.section('frontend', 3, 4, true),
    this.section('backend', 5, 6, true),
    this.section('data', 7, 8, true),
    this.section('tools', 9, 10, false),
  ];

  constructor() {
    effect(() => {
      if (this.state.activeFile() !== 'skills') {
        this.animate.set(false);
        return;
      }
      this.animate.set(false);
      queueMicrotask(() => this.animate.set(true));
    });
  }

  private section(group: SkillGroup, openNum: number, closeNum: number, withComma: boolean): SkillSection {
    return {
      group,
      openLine: {
        num: openNum,
        tokens: [
          { kind: 'text', text: '  ' },
          { kind: 'prop', text: `"${group}"` },
          { kind: 'text', text: ': [' },
        ],
      },
      closeLine: {
        num: closeNum,
        tokens: [{ kind: 'text', text: withComma ? '  ],' : '  ]' }],
      },
      bars: SKILLS.filter((s) => s.group === group),
    };
  }
}
