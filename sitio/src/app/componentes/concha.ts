import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Concha de abanico dibujada a línea, un solo trazo como los iconos. Ornamento. */
@Component({
  selector: 'app-concha',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: `
    <svg viewBox="0 0 64 60" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 54C20 54 8 44 5.5 30.5 4 22 9 12.5 17 8.5 22 6 27 5 32 5s10 1 15 3.5c8 4 13 13.5 11.5 22C56 44 44 54 32 54z" />
      <path d="M32 54L32 6" />
      <path d="M32 54L22.5 7" />
      <path d="M32 54L41.5 7" />
      <path d="M32 54L13.5 11.5" />
      <path d="M32 54L50.5 11.5" />
      <path d="M32 54L7.5 19.5" />
      <path d="M32 54L56.5 19.5" />
      <path d="M32 54L5 30" />
      <path d="M32 54L59 30" />
      <path d="M25 54l-2.5 4h19L39 54" />
    </svg>
  `,
  styles: `
    :host { display: inline-block; width: var(--concha, 3rem); color: currentColor; }
    svg { width: 100%; height: auto; }
  `,
})
export class Concha {}
