import { Injectable, computed, effect, signal } from '@angular/core';
import { CONTENT, Lang } from './content';

const STORAGE_KEY = 'lang';

function initialLang(): Lang {
  const fromUrl = new URLSearchParams(location.search).get('lang');
  if (fromUrl === 'es' || fromUrl === 'en') return fromUrl;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'es' || saved === 'en') return saved;
  } catch {
    /* almacenamiento no disponible */
  }
  return navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en';
}

@Injectable({ providedIn: 'root' })
export class LangService {
  readonly lang = signal<Lang>(initialLang());
  readonly t = computed(() => CONTENT[this.lang()]);

  constructor() {
    effect(() => {
      const lang = this.lang();
      const t = CONTENT[lang];
      document.documentElement.lang = lang;
      document.title = t.meta.title;
      document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description);
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch {
        /* almacenamiento no disponible */
      }
    });
  }

  toggle(): void {
    this.lang.update((l) => (l === 'es' ? 'en' : 'es'));
  }
}
