import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { AngularBugComponent } from '../features/angular-bug/angular-bug.component';
import { BreadcrumbComponent } from '../features/breadcrumb/breadcrumb.component';
import { CommandPaletteComponent } from '../features/command-palette/command-palette.component';
import { EditorTabsComponent } from '../features/editor-tabs/editor-tabs.component';
import { FileExplorerComponent } from '../features/file-explorer/file-explorer.component';
import { LinkedinPillComponent } from '../features/linkedin-pill/linkedin-pill.component';
import { MobileNavComponent } from '../features/mobile-nav/mobile-nav.component';
import { ContactPanelComponent } from '../features/panels/contact-panel/contact-panel.component';
import { ExperiencePanelComponent } from '../features/panels/experience-panel/experience-panel.component';
import { ProfilePanelComponent } from '../features/panels/profile-panel/profile-panel.component';
import { SkillsPanelComponent } from '../features/panels/skills-panel/skills-panel.component';
import { RightPanelComponent } from '../features/right-panel/right-panel.component';
import { StatusBarComponent } from '../features/status-bar/status-bar.component';
import { TitleBarComponent } from '../features/title-bar/title-bar.component';
import { IdeStateService } from '../state/ide-state.service';

@Component({
  selector: 'app-ide-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TitleBarComponent,
    FileExplorerComponent,
    EditorTabsComponent,
    BreadcrumbComponent,
    ProfilePanelComponent,
    ExperiencePanelComponent,
    SkillsPanelComponent,
    ContactPanelComponent,
    RightPanelComponent,
    StatusBarComponent,
    CommandPaletteComponent,
    MobileNavComponent,
    LinkedinPillComponent,
    AngularBugComponent,
  ],
  templateUrl: './ide-shell.component.html',
  styleUrl: './ide-shell.component.scss',
})
export class IdeShellComponent {
  protected readonly state = inject(IdeStateService);
  protected readonly editorPosition = signal(1);

  private readonly editorRef = viewChild.required<ElementRef<HTMLElement>>('editor');

  constructor() {
    effect(() => {
      void this.state.activeFile();
      queueMicrotask(() => this.editorRef().nativeElement.scrollTo({ top: 0, behavior: 'instant' }));
    });
  }

  onEditorScroll(): void {
    const top = this.editorRef().nativeElement.scrollTop;
    this.editorPosition.set(Math.max(1, Math.floor(top / 24) + 1));
  }

  @HostListener('document:keydown', ['$event'])
  onGlobalKey(event: KeyboardEvent): void {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      this.state.togglePalette();
    }
  }
}
