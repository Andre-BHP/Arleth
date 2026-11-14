import { ChangeDetectionStrategy, Component, ViewEncapsulation, computed, input } from '@angular/core';

export type NombreIcono =
  | 'whatsapp' | 'telefono' | 'mapa' | 'reloj' | 'flecha' | 'cerrar' | 'buscar'
  | 'lista' | 'cuadricula' | 'instagram' | 'facebook' | 'x' | 'correo' | 'bolsa' | 'mas';

/** Iconos dibujados a línea, trazo 1.75, mismo cuerpo de 24 px. */
const TRAZOS: Record<NombreIcono, string> = {
  whatsapp:
    '<path d="M4.5 19.5l1.1-3.6A8 8 0 1 1 8.4 18.6z"/><path d="M9.2 8.6c.2-.5.6-.6 1-.6l.6 1.5-.6.9c.5 1 1.3 1.8 2.4 2.4l.9-.6 1.5.6c0 .5-.2.9-.7 1.1-.9.4-2.8-.2-4.2-1.6S8.8 9.5 9.2 8.6z"/>',
  telefono:
    '<path d="M6.6 3.5h2.6l1.3 4-1.9 1.3a10.6 10.6 0 0 0 6.6 6.6l1.3-1.9 4 1.3v2.6a2 2 0 0 1-2.2 2C10.8 19 5 13.2 4.6 5.7a2 2 0 0 1 2-2.2z"/>',
  mapa:
    '<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
  reloj: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  flecha: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  cerrar: '<path d="M6 6l12 12M18 6L6 18"/>',
  buscar: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4 4"/>',
  lista: '<path d="M8 6.5h12M8 12h12M8 17.5h12"/><path d="M4 6.5h.01M4 12h.01M4 17.5h.01" stroke-width="2.6"/>',
  cuadricula: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
  instagram: '<rect x="4" y="4" width="16" height="16" rx="4.5"/><circle cx="12" cy="12" r="3.6"/><path d="M16.6 7.4h.01" stroke-width="2.4"/>',
  facebook: '<path d="M14.5 8.5h2V5h-2.3C11.9 5 10.5 6.6 10.5 9v1.8H8.5v3.3h2V20h3.4v-5.9h2.4l.4-3.3h-2.8V9.4c0-.6.3-.9.6-.9z"/>',
  x: '<path d="M5 5l14 14M19 5L5 19"/>',
  correo: '<rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="M4 7l8 6 8-6"/>',
  bolsa: '<path d="M5.5 8.5h13l-1 11h-11z"/><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5"/>',
  mas: '<path d="M12 5v14M5 12h14"/>',
};

interface Trazo { tag: string; a: Record<string, string>; }

/** Convierte las cadenas de trazos en elementos declarativos (sirve también en el prerender). */
const ELEMENTOS = Object.fromEntries(
  Object.entries(TRAZOS).map(([k, v]) => [
    k,
    [...v.matchAll(/<(\w+)([^>]*)\/>/g)].map(
      (m): Trazo => ({ tag: m[1], a: Object.fromEntries([...m[2].matchAll(/([\w-]+)="([^"]*)"/g)].map((x) => [x[1], x[2]])) }),
    ),
  ]),
) as Record<NombreIcono, Trazo[]>;

@Component({
  selector: 'app-icono',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { 'aria-hidden': 'true', style: 'display:contents' },
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
      @for (e of elementos(); track $index) {
        @switch (e.tag) {
          @case ('path') { <svg:path [attr.d]="e.a['d']" [attr.stroke-width]="e.a['stroke-width'] ?? null" /> }
          @case ('circle') { <svg:circle [attr.cx]="e.a['cx']" [attr.cy]="e.a['cy']" [attr.r]="e.a['r']" /> }
          @case ('rect') { <svg:rect [attr.x]="e.a['x']" [attr.y]="e.a['y']" [attr.width]="e.a['width']" [attr.height]="e.a['height']" [attr.rx]="e.a['rx']" /> }
        }
      }
    </svg>
  `,
})
export class Icono {
  readonly nombre = input.required<NombreIcono>();
  protected readonly elementos = computed(() => ELEMENTOS[this.nombre()]);
}
