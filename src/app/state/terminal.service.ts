import { Injectable, computed, inject, signal } from '@angular/core';
import { CONTACT, FILES_BY_ID } from '../data/profile.data';
import type { FileId, TerminalChunk, TerminalLine } from '../data/profile.types';
import { IdeStateService } from './ide-state.service';

const PROMPT_PATH = '~/gayashan';

@Injectable({ providedIn: 'root' })
export class TerminalService {
  private readonly ide = inject(IdeStateService);
  private nextId = 1;

  readonly lines = signal<readonly TerminalLine[]>(this.bootLines());
  readonly history = signal<readonly string[]>([]);
  readonly historyIndex = signal(0);

  readonly hasOutput = computed(() => this.lines().length > 0);

  run(raw: string): void {
    const cmd = raw.trim();
    if (!cmd) return;

    this.history.update((h) => [...h, cmd]);
    this.historyIndex.set(this.history().length);
    this.append({ kind: 'cmd', chunks: [{ text: cmd }] });

    const [first, ...args] = cmd.split(/\s+/);
    if (!first) return;

    if (first === 'open' && args[0]) {
      const fileId = this.tryFileId(args[0]);
      if (fileId) {
        this.ide.openFile(fileId);
        this.append({
          kind: 'out',
          chunks: [{ text: 'opened ' }, { text: args[0], cls: 'fn-c' }],
        });
        return;
      }
    }

    const handler = COMMANDS[first];
    if (handler) {
      handler(this);
      return;
    }
    this.append({
      kind: 'out',
      chunks: [
        { text: 'zsh:', cls: 'tg' },
        { text: ` command not found: ${first}. Try ` },
        { text: 'help', cls: 'fn-c' },
        { text: '.' },
      ],
    });
  }

  walkHistory(direction: -1 | 1, current: string): string {
    const hist = this.history();
    if (!hist.length) return current;
    if (direction === -1) {
      const idx = Math.max(0, this.historyIndex() - 1);
      this.historyIndex.set(idx);
      return hist[idx] ?? current;
    }
    const next = this.historyIndex() + 1;
    if (next >= hist.length) {
      this.historyIndex.set(hist.length);
      return '';
    }
    this.historyIndex.set(next);
    return hist[next] ?? '';
  }

  clearLines(): void {
    this.lines.set([]);
  }

  append(line: Omit<TerminalLine, 'id'>): void {
    this.lines.update((curr) => [...curr, { id: this.nextId++, ...line }]);
  }

  promptPath(): string {
    return PROMPT_PATH;
  }

  private tryFileId(token: string): FileId | null {
    const stem = token.replace(/\.(ts|json|md)$/, '') as FileId;
    return stem in FILES_BY_ID ? stem : null;
  }

  private bootLines(): TerminalLine[] {
    const out = (chunks: TerminalChunk[]): TerminalLine => ({ id: this.nextId++, kind: 'out', chunks });
    const cmd = (text: string): TerminalLine => ({ id: this.nextId++, kind: 'cmd', chunks: [{ text }] });
    return [
      out([{ text: '# Welcome — type \'help\' to see available commands.', cls: 'cm' }]),
      cmd('whoami'),
      out([
        { text: 'gayashan', cls: 'str' },
        { text: ' · senior software engineer · frontend' },
      ]),
      cmd('uptime'),
      out([
        { text: '8', cls: 'num-c' },
        { text: ' years, ' },
        { text: '5', cls: 'num-c' },
        { text: ' companies, ' },
        { text: '9', cls: 'num-c' },
        { text: ' products' },
      ]),
    ];
  }
}

type CommandHandler = (svc: TerminalService) => void;

const COMMANDS: Readonly<Record<string, CommandHandler>> = {
  help: (s) =>
    s.append({
      kind: 'out',
      chunks: [
        { text: '# commands: ', cls: 'cm' },
        {
          text: 'help whoami uptime skills projects email phone linkedin github date open hire clear',
          cls: 'fn-c',
        },
      ],
    }),
  whoami: (s) =>
    s.append({
      kind: 'out',
      chunks: [
        { text: 'gayashan', cls: 'str' },
        { text: ' · senior software engineer · frontend' },
      ],
    }),
  uptime: (s) =>
    s.append({
      kind: 'out',
      chunks: [
        { text: '8', cls: 'num-c' },
        { text: ' years, ' },
        { text: '5', cls: 'num-c' },
        { text: ' companies, ' },
        { text: '9', cls: 'num-c' },
        { text: ' products' },
      ],
    }),
  skills: (s) => {
    s.append({
      kind: 'out',
      chunks: [
        { text: 'frontend', cls: 'kw' },
        { text: ': Angular 7-18+, RxJS, TypeScript, SCSS, React, Vue' },
      ],
    });
    s.append({
      kind: 'out',
      chunks: [
        { text: 'backend', cls: 'kw' },
        { text: ':  Node.js, PHP/Laravel, .NET, Firebase, REST' },
      ],
    });
    s.append({
      kind: 'out',
      chunks: [
        { text: 'data', cls: 'kw' },
        { text: ':     MySQL, SQL Server' },
      ],
    });
  },
  projects: (s) =>
    s.append({
      kind: 'out',
      chunks: [
        {
          text: 'SkillGround Medics SmartAH Beautech DentalPro CHERRI Galle Motors Classroom Salon',
          cls: 'fn-c',
        },
      ],
    }),
  email: (s) => {
    s.append({ kind: 'out', chunks: [{ text: 'opening mail client…' }] });
    window.location.href = `mailto:${CONTACT.email}`;
  },
  phone: (s) => s.append({ kind: 'out', chunks: [{ text: CONTACT.phoneDisplay }] }),
  linkedin: (s) => {
    s.append({
      kind: 'out',
      chunks: [{ text: `opening linkedin.com/in/${CONTACT.linkedinHandle}…` }],
    });
    window.open(CONTACT.linkedinUrl, '_blank', 'noopener,noreferrer');
  },
  github: (s) => {
    s.append({
      kind: 'out',
      chunks: [{ text: `opening github.com/${CONTACT.githubHandle}…` }],
    });
    window.open(CONTACT.githubUrl, '_blank', 'noopener,noreferrer');
  },
  date: (s) =>
    s.append({
      kind: 'out',
      chunks: [
        {
          text: new Intl.DateTimeFormat('en-GB', {
            dateStyle: 'full',
            timeStyle: 'medium',
            timeZone: 'Asia/Colombo',
          }).format(new Date()),
        },
      ],
    }),
  hire: (s) => {
    s.append({
      kind: 'out',
      chunks: [
        { text: '✓', cls: 'str' },
        { text: ` sending offer letter draft to mailto: ${CONTACT.email}` },
      ],
    });
    setTimeout(() => {
      window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent("Let's talk")}`;
    }, 600);
  },
  clear: (s) => s.clearLines(),
};
