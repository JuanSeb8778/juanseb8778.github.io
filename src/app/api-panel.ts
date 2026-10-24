import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { LangService } from './lang.service';

type TokenKind = 'key' | 'str' | 'bool' | 'punct';
interface Token {
  kind: TokenKind;
  text: string;
}

@Component({
  selector: 'app-api-panel',
  template: `
    <figure class="panel" [attr.aria-label]="i18n.t().hero.panelLabel">
      <div class="request">
        <span class="method">GET</span>
        <span class="path">/juan-sebastian<span class="query">?lang={{ i18n.lang() }}</span></span>
      </div>
      <div class="status" [class.ready]="done()">
        <span class="dot" aria-hidden="true"></span>
        <span>{{ done() ? '200 OK' : '…' }}</span>
        <span class="time">{{ done() ? '38 ms' : '' }}</span>
      </div>
      <pre class="body" aria-hidden="true"><code>@for (line of visibleLines(); track $index) {<span class="line">@for (tok of line; track $index) {<span [class]="tok.kind">{{ tok.text }}</span>}</span>}</code></pre>
      <figcaption class="sr-only">{{ summary() }}</figcaption>
    </figure>
  `,
  styleUrl: './api-panel.css',
})
export class ApiPanel implements OnInit, OnDestroy {
  protected readonly i18n = inject(LangService);
  private readonly revealed = signal(0);
  private timer?: ReturnType<typeof setInterval>;

  private readonly lines = computed<Token[][]>(() => {
    const data = this.i18n.t().hero.api;
    const entries = Object.entries(data);
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
  protected readonly summary = computed(() => {
    const api = this.i18n.t().hero.api;
    return Object.values(api)
      .map((v) => (Array.isArray(v) ? v.join(', ') : String(v)))
      .join('; ');
  });

  ngOnInit(): void {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      this.revealed.set(Number.MAX_SAFE_INTEGER);
      return;
    }
    // Una sola animación al cargar: la respuesta llega línea por línea.
    setTimeout(() => {
      this.timer = setInterval(() => {
        this.revealed.update((n) => n + 1);
        if (this.done()) this.stop();
      }, 90);
    }, 450);
  }

  ngOnDestroy(): void {
    this.stop();
  }

  private stop(): void {
    if (this.timer) clearInterval(this.timer);
    this.revealed.set(Number.MAX_SAFE_INTEGER);
  }
}
