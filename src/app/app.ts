import { Component, inject, signal } from '@angular/core';
import { ApiPanel } from './api-panel';
import { LangService } from './lang.service';
import { LINKS, Layer } from './content';

@Component({
  selector: 'app-root',
  imports: [ApiPanel],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly i18n = inject(LangService);
  protected readonly links = LINKS;
  protected readonly layers: Layer[] = ['client', 'agent', 'service'];
  protected readonly year = new Date().getFullYear();
  protected readonly copied = signal(false);
  protected readonly menuOpen = signal(false);

  protected async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.links.email);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2200);
    } catch {
      location.href = `mailto:${this.links.email}`;
    }
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
