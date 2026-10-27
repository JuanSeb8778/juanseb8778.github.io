import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { LangService } from './lang.service';
import { Endpoint, LINKS } from './content';

type TokenKind = 'key' | 'str' | 'bool' | 'punct';
interface Token {
  kind: TokenKind;
  text: string;
}
type Payload = Record<string, string | boolean | string[]>;

const TIMES: Record<Endpoint, string> = { profile: '38 ms', stack: '24 ms', contact: '17 ms' };

@Component({
  selector: 'app-api-panel',
  template: `
    <figure class="panel" [attr.aria-label]="i18n.t().hero.panelLabel">
      <div class="request">
        <span class="method">GET</span>
        <span class="path">/juan-sebastian/</span>
        <div class="tabs" role="group" [attr.aria-label]="i18n.t().hero.endpointsLabel">
          @for (ep of endpoints; track ep) {
            <button
              type="button"
              class="tab"
              [attr.aria-pressed]="endpoint() === ep"
              (click)="select(ep)"
            >
              {{ i18n.t().hero.endpoints[ep] }}
            </button>
          }
        </div>
      </div>
      <div class="status" [class.ready]="done()">
        <span class="dot" aria-hidden="true"></span>
        <span>{{ done() ? '200 OK' : '…' }}</span>
        <span class="time">{{ done() ? times[endpoint()] : '' }}</span>
      </div>
      <pre
        class="body"
        aria-hidden="true"
      ><code>@for (line of visibleLines(); track $index) {<span class="line">@for (tok of line; track $index) {<span [class]="tok.kind">{{ tok.text }}</span>}</span>}</code></pre>
      <figcaption class="sr-only" aria-live="polite">{{ summary() }}</figcaption>
    </figure>
  `,
  styleUrl: './api-panel.css',
})
export class ApiPanel implements OnInit, OnDestroy {
  protected readonly i18n = inject(LangService);
  protected readonly endpoints: Endpoint[] = ['profile', 'stack', 'contact'];
  protected readonly times = TIMES;
  protected readonly endpoint = signal<Endpoint>('profile');
  private readonly revealed = signal(0);
  private readonly reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  private timer?: ReturnType<typeof setInterval>;
  private delay?: ReturnType<typeof setTimeout>;

  private readonly payload = computed<Payload>(() => {
    const t = this.i18n.t();
    switch (this.endpoint()) {
      case 'stack':
        return Object.fromEntries(t.stack.groups.map((g) => [g.name.toLowerCase(), g.items]));
      case 'contact':
        return {
          email: LINKS.email,
          linkedin: LINKS.linkedin.replace('https://www.', ''),
          github: LINKS.github.replace('https://', ''),
        };
      default:
        return t.hero.api;
    }
  });

  private readonly lines = computed<Token[][]>(() => {
    const entries = Object.entries(this.payload());
    const out: Token[][] = [[{ kind: 'punct', text: '{' }]];
    entries.forEach(([key, value], i) => {
      const comma = i < entries.length - 1 ? ',' : '';
      const line: Token[] = [
        { kind: 'punct', text: '  ' },
        { kind: 'key', text: `"${key}"` },
        { kind: 'punct', text: ': ' },
      ];
      if (Array.isArray(value)) {
        line.push({ kind: 'punct', text: '[' });
        value.forEach((v, j) => {
          line.push({ kind: 'str', text: `"${v}"` });
          if (j < value.length - 1) line.push({ kind: 'punct', text: ', ' });
        });
        line.push({ kind: 'punct', text: ']' + comma });
      } else if (typeof value === 'boolean') {
        line.push({ kind: 'bool', text: String(value) }, { kind: 'punct', text: comma });
      } else {
        line.push({ kind: 'str', text: `"${value}"` }, { kind: 'punct', text: comma });
      }
      out.push(line);
    });
    out.push([{ kind: 'punct', text: '}' }]);
    return out;
  });

  protected readonly visibleLines = computed(() => this.lines().slice(0, this.revealed()));
  protected readonly done = computed(() => this.revealed() >= this.lines().length);
  protected readonly summary = computed(() =>
    Object.entries(this.payload())
      .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : String(v)}`)
      .join('; '),
  );

  ngOnInit(): void {
    // Al cargar, la primera respuesta llega línea por línea.
    this.play(450);
  }

  ngOnDestroy(): void {
    this.clear();
  }

  protected select(ep: Endpoint): void {
    if (ep === this.endpoint()) return;
    this.endpoint.set(ep);
    this.play(120);
  }

  private play(delay: number): void {
    this.clear();
    if (this.reduceMotion) {
      this.revealed.set(Number.MAX_SAFE_INTEGER);
      return;
    }
    this.revealed.set(0);
    this.delay = setTimeout(() => {
      this.timer = setInterval(() => {
        this.revealed.update((n) => n + 1);
        if (this.done()) this.clear();
      }, 70);
    }, delay);
  }

  private clear(): void {
    clearTimeout(this.delay);
    clearInterval(this.timer);
  }
}
