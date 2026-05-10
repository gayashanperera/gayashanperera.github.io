export type FileId = 'profile' | 'experience' | 'skills' | 'contact';

export type JobId =
  | 'skillground'
  | 'synapsys'
  | 'edhirya'
  | 'sense'
  | 'openarc';

export type ProjectId =
  | 'skillground'
  | 'medics'
  | 'smartah'
  | 'beautech'
  | 'dentalpro'
  | 'cherri'
  | 'galle'
  | 'classroom';

export type PillTone = 'default' | 'kw' | 'fn' | 'str' | 'num';

export type RightPaneId = 'outline' | 'problems' | 'terminal';

export type GlyphKind = 'k' | 'f' | 'v' | 't';

export interface OutlineSymbol {
  readonly kind: GlyphKind;
  readonly name: string;
  readonly line: string;
}

export interface FileEntry {
  readonly id: FileId;
  readonly label: string;
  readonly crumb: string;
  readonly lang: 'TypeScript' | 'JSON' | 'Markdown';
  readonly dotColor: string;
  readonly iconColor: string;
  readonly iconGlyph: string;
  readonly outlineTitle: string;
  readonly symbols: readonly OutlineSymbol[];
}

export type CodeToken =
  | { readonly kind: 'text' | 'kw' | 'str' | 'fn' | 'num' | 'type' | 'prop' | 'comment' | 'tag'; readonly text: string }
  | {
      readonly kind: 'pill';
      readonly text: string;
      readonly tone: PillTone;
      readonly projectId?: ProjectId;
    }
  | { readonly kind: 'cursor' }
  | {
      readonly kind: 'hero';
      readonly leadingText: string;
      readonly accents: readonly string[];
      readonly trailingText: string;
      readonly sub: string;
    };

export interface CodeLine {
  readonly num: number | null;
  readonly tokens: readonly CodeToken[];
  readonly jobId?: JobId;
  readonly toggle?: boolean;
}

export interface JobMeta {
  readonly id: JobId;
  readonly company: string;
  readonly years: string;
  readonly role: string;
  readonly fullRole: string;
  readonly metaChips: readonly string[];
  readonly summary: string;
  readonly bullets: readonly string[];
  readonly stack: readonly { text: string; tone: PillTone }[];
}

export interface Project {
  readonly id: ProjectId;
  readonly name: string;
  readonly year: string;
  readonly tone: PillTone;
  readonly iconColor: string;
  readonly jobId: JobId;
  /** Subtitle shown in the command palette. */
  readonly paletteSub: string;
  /** Background color for the palette icon swatch. */
  readonly paletteIconBg: string;
  /** Foreground color for the palette icon swatch. */
  readonly paletteIconColor: string;
}

export type SkillGroup = 'frontend' | 'backend' | 'data' | 'tools';

export interface SkillBar {
  readonly name: string;
  readonly pct: number;
  readonly group: SkillGroup;
}

export interface SourceControlEntry {
  readonly file: string;
  readonly status: 'M' | '+';
  readonly diff: string;
}

export type PaletteSectionId = 'Files' | 'Actions' | 'Projects' | 'Panels';

export interface PaletteCommand {
  readonly section: PaletteSectionId;
  readonly id: string;
  readonly icon: string;
  readonly iconBg: string;
  readonly iconColor: string;
  readonly label: string;
  readonly sub: string;
  readonly action:
    | { readonly kind: 'open-file'; readonly file: FileId }
    | { readonly kind: 'open-project'; readonly project: ProjectId }
    | { readonly kind: 'right-pane'; readonly pane: RightPaneId }
    | { readonly kind: 'href'; readonly url: string }
    | { readonly kind: 'tel'; readonly number: string }
    | { readonly kind: 'mailto'; readonly to: string; readonly subject?: string };
}

export interface ProblemEntry {
  readonly severity: 'i' | 'w';
  readonly text: string;
  readonly file: string;
}

export interface ContactRow {
  readonly label: string;
  readonly value: string;
  readonly href: string;
  readonly external?: boolean;
}

export interface TerminalChunk {
  readonly text: string;
  readonly cls?: 'cm' | 'kw' | 'str' | 'fn-c' | 'num-c' | 'tg' | 'pr';
}

export interface TerminalLine {
  readonly id: number;
  readonly kind: 'cmd' | 'out';
  readonly chunks: readonly TerminalChunk[];
}
