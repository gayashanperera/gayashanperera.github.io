import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type IconName =
  | 'folder'
  | 'globe'
  | 'menu'
  | 'chevron-right'
  | 'search'
  | 'branch'
  | 'arrow-up-right'
  | 'linkedin';

interface IconShape {
  readonly fill: 'none' | 'currentColor';
  readonly paths: readonly { readonly d: string }[];
  readonly circles?: readonly { readonly cx: number; readonly cy: number; readonly r: number }[];
}

const ICONS: Readonly<Record<IconName, IconShape>> = {
  folder: {
    fill: 'currentColor',
    paths: [{ d: 'M5 4h6l2 2h6v12H5z' }],
  },
  globe: {
    fill: 'none',
    circles: [{ cx: 12, cy: 12, r: 9 }],
    paths: [{ d: 'M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18' }],
  },
  menu: { fill: 'none', paths: [{ d: 'M3 6h18M3 12h18M3 18h18' }] },
  'chevron-right': { fill: 'none', paths: [{ d: 'M9 6l6 6-6 6' }] },
  search: {
    fill: 'none',
    circles: [{ cx: 11, cy: 11, r: 7 }],
    paths: [{ d: 'M21 21l-5-5' }],
  },
  branch: {
    fill: 'none',
    paths: [{ d: 'M6 3v12M6 15a3 3 0 1 1 0 6 3 3 0 0 1 0-6z' }],
  },
  'arrow-up-right': { fill: 'none', paths: [{ d: 'M7 17L17 7M9 7h8v8' }] },
  linkedin: {
    fill: 'currentColor',
    paths: [
      {
        d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4z',
      },
    ],
  },
};

@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let s = shape();
    <svg
      viewBox="0 0 24 24"
      [attr.fill]="s.fill"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      @for (c of s.circles ?? []; track $index) {
        <circle [attr.cx]="c.cx" [attr.cy]="c.cy" [attr.r]="c.r" />
      }
      @for (p of s.paths; track $index) {
        <path [attr.d]="p.d" />
      }
    </svg>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1em;
        height: 1em;
        line-height: 0;
      }
      svg {
        width: 100%;
        height: 100%;
        display: block;
      }
    `,
  ],
})
export class IconComponent {
  readonly name = input.required<IconName>();
  readonly shape = computed<IconShape>(() => ICONS[this.name()]);
}
