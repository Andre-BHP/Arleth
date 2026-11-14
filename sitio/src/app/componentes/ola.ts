import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Borde de oleaje irregular entre una sección y la siguiente.
 * `color` es el color de la sección de abajo; el SVG se monta sobre la de arriba.
 * La capa trasera se desplaza un poco con el scroll (ver Movimiento).
 */
@Component({
  selector: 'app-ola',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true', class: 'ola', '[style.--ola]': 'color()', '[class.volteada]': 'volteada()' },
  template: `
    <svg viewBox="0 0 1440 90" preserveAspectRatio="none">
      <path class="atras" data-ola-atras d="M-80 52c90-26 170-30 262-10 98 21 160 24 262 0 100-23 170-25 268-2 96 22 168 20 262-4 100-25 182-22 270 4 70 20 136 20 200 6V90H-80z" />
      <path class="frente" d="M0 62c80-18 158-20 238-4 88 18 152 18 240-2 92-20 166-20 254 2 86 21 160 20 246-2 90-22 172-20 258 2 72 18 136 18 204 6V90H0z" />
    </svg>
  `,
  styles: `
    :host { display: block; position: relative; height: clamp(28px, 4.5vw, 64px); margin-top: calc(-1 * clamp(28px, 4.5vw, 64px)); pointer-events: none; z-index: 1; }
    :host(.volteada) { transform: scaleX(-1); }
    svg { width: 100%; height: 100%; overflow: visible; }
    .frente { fill: var(--ola); }
    .atras { fill: var(--ola); opacity: 0.45; will-change: transform; }
  `,
})
export class Ola {
  readonly color = input('var(--papel)');
  readonly volteada = input(false);
}
