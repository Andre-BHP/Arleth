import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Etiqueta, NOMBRE_ETIQUETA } from '../servicios/datos';

let siguiente = 0;

/**
 * Etiqueta redonda como la de sus frascos: "Boca del Cielo · antojitos del mar"
 * alrededor y la palabra al centro. Tamaño "chico" es una píldora para listas.
 */
@Component({
  selector: 'app-sello',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': '"sello sello-" + tipo() + " sello-" + tamano()' },
  template: `
    @if (tamano() === 'grande') {
      <svg viewBox="0 0 120 120" role="img" [attr.aria-label]="texto()">
        <defs><path [attr.id]="idCirculo" d="M60 60m-45 0a45 45 0 1 1 90 0a45 45 0 1 1-90 0" /></defs>
        <circle cx="60" cy="60" r="57" class="fondo" />
        <circle cx="60" cy="60" r="53" class="aro" />
        <circle cx="60" cy="60" r="35" class="aro" />
        <text class="orla"><textPath [attr.href]="'#' + idCirculo" startOffset="0" textLength="276">BOCA DEL CIELO · ANTOJITOS DEL MAR ·</textPath></text>
        <text x="60" y="68" text-anchor="middle" class="centro">{{ texto() }}</text>
      </svg>
    } @else {
      <span>{{ texto() }}</span>
    }
  `,
  styles: `
    :host { display: inline-flex; flex: none; line-height: 1; }
    :host(.sello-grande) { width: var(--sello, 7.5rem); aspect-ratio: 1; filter: drop-shadow(0 6px 10px rgb(10 42 64 / 0.3)); }
    svg { width: 100%; height: 100%; overflow: visible; }
    .fondo { fill: var(--s-fondo); }
    .aro { fill: none; stroke: var(--s-tinta); stroke-width: 1.2; }
    .orla { font: 400 11.5px var(--f-nombre); letter-spacing: 0.5px; fill: var(--s-tinta); }
    .centro { font: 400 20px var(--f-pincel); fill: var(--s-tinta); }

    :host(.sello-chico) span {
      display: inline-block;
      padding: 0.3em 0.65em 0.22em;
      border-radius: 999px;
      border: 1.5px solid var(--s-borde, var(--s-fondo));
      background: var(--s-fondo);
      color: var(--s-tinta);
      font: 400 0.9rem/1 var(--f-nombre);
      letter-spacing: 0.06em;
    }

    :host(.sello-favorito) { --s-fondo: var(--papel); --s-tinta: var(--azul); --s-borde: var(--azul); }
    :host(.sello-nuevo) { --s-fondo: var(--azul); --s-tinta: var(--papel); }
    :host(.sello-picante) { --s-fondo: var(--chile); --s-tinta: #fff6ec; }
    :host(.sello-crudo), :host(.sello-ninos), :host(.sello-artesanal) {
      --s-fondo: transparent; --s-tinta: var(--tinta-2); --s-borde: var(--papel-borde);
    }
  `,
})
export class Sello {
  readonly tipo = input.required<Etiqueta>();
  readonly tamano = input<'grande' | 'chico'>('chico');
  protected readonly texto = computed(() => NOMBRE_ETIQUETA[this.tipo()]);
  protected readonly idCirculo = `sello-c-${siguiente++}`;
}
