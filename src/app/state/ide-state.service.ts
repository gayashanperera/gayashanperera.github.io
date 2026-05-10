import { DestroyRef, Injectable, computed, effect, inject, signal } from '@angular/core';
import {
  FILES_BY_ID,
  PALETTE_COMMANDS,
  PROJECT_TO_JOB,
} from '../data/profile.data';
import type {
  FileId,
  JobId,
  PaletteCommand,
  ProjectId,
  RightPaneId,
} from '../data/profile.types';

@Injectable({ providedIn: 'root' })
export class IdeStateService {
  private readonly destroyRef = inject(DestroyRef);

  readonly activeFile = signal<FileId>('profile');
  readonly expandedJobs = signal<ReadonlySet<JobId>>(new Set());

  readonly paletteOpen = signal(false);
  readonly paletteQuery = signal('');
  readonly paletteSelIndex = signal(0);

  readonly rightPaneTab = signal<RightPaneId>('outline');

  readonly drawerOpen = signal(false);
  readonly sheetOpen = signal(false);

  readonly clock = signal(this.formatColomboTime());

  readonly activeFileEntry = computed(() => FILES_BY_ID[this.activeFile()]);

  readonly filteredCommands = computed<readonly PaletteCommand[]>(() => {
    const q = this.paletteQuery().trim().toLowerCase();
    if (!q) return PALETTE_COMMANDS;
    return PALETTE_COMMANDS.filter((c) =>
      `${c.label} ${c.sub} ${c.section}`.toLowerCase().includes(q),
    );
  });

  constructor() {
    const interval = setInterval(() => this.clock.set(this.formatColomboTime()), 1000);
    this.destroyRef.onDestroy(() => clearInterval(interval));

    effect(() => {
      const max = Math.max(0, this.filteredCommands().length - 1);
      if (this.paletteSelIndex() > max) this.paletteSelIndex.set(0);
    });
  }

  openFile(id: FileId): void {
    this.activeFile.set(id);
    this.drawerOpen.set(false);
  }

  toggleJob(id: JobId): void {
    const next = new Set(this.expandedJobs());
    if (next.has(id)) next.delete(id);
    else next.add(id);
    this.expandedJobs.set(next);
  }

  openProject(id: ProjectId): void {
    const jobId = PROJECT_TO_JOB[id];
    this.activeFile.set('experience');
    this.expandedJobs.set(new Set([jobId]));
  }

  isJobExpanded(id: JobId): boolean {
    return this.expandedJobs().has(id);
  }

  openPalette(): void {
    this.paletteQuery.set('');
    this.paletteSelIndex.set(0);
    this.paletteOpen.set(true);
  }

  closePalette(): void {
    this.paletteOpen.set(false);
  }

  togglePalette(): void {
    if (this.paletteOpen()) this.closePalette();
    else this.openPalette();
  }

  setPaletteQuery(q: string): void {
    this.paletteQuery.set(q);
    this.paletteSelIndex.set(0);
  }

  movePaletteSelection(delta: number): void {
    const items = this.filteredCommands();
    if (!items.length) return;
    const next = Math.min(items.length - 1, Math.max(0, this.paletteSelIndex() + delta));
    this.paletteSelIndex.set(next);
  }

  runPaletteSelected(): void {
    const items = this.filteredCommands();
    const cmd = items[this.paletteSelIndex()];
    if (cmd) this.runPaletteCommand(cmd);
  }

  runPaletteCommand(cmd: PaletteCommand): void {
    this.closePalette();
    switch (cmd.action.kind) {
      case 'open-file':
        this.openFile(cmd.action.file);
        return;
      case 'open-project':
        this.openProject(cmd.action.project);
        return;
      case 'right-pane':
        this.setRightPane(cmd.action.pane);
        return;
      case 'href':
        window.open(cmd.action.url, '_blank', 'noopener,noreferrer');
        return;
      case 'tel':
        window.location.href = `tel:${cmd.action.number}`;
        return;
      case 'mailto': {
        const subject = cmd.action.subject ? `?subject=${encodeURIComponent(cmd.action.subject)}` : '';
        window.location.href = `mailto:${cmd.action.to}${subject}`;
        return;
      }
    }
  }

  setRightPane(pane: RightPaneId): void {
    this.rightPaneTab.set(pane);
  }

  toggleDrawer(): void {
    const open = !this.drawerOpen();
    this.drawerOpen.set(open);
    if (open) this.sheetOpen.set(false);
  }

  toggleSheet(): void {
    const open = !this.sheetOpen();
    this.sheetOpen.set(open);
    if (open) this.drawerOpen.set(false);
  }

  closeMobileOverlays(): void {
    this.drawerOpen.set(false);
    this.sheetOpen.set(false);
  }

  private formatColomboTime(): string {
    return new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'Asia/Colombo',
    }).format(new Date());
  }
}
