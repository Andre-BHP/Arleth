import { ChangeDetectionStrategy, Component, PLATFORM_ID, computed, inject, input } from '@angular/core';
import { isPlatformServer } from '@angular/common';

/** Medidas reales de cada foto exportada (ancho × alto del original recortado). */
const MEDIDAS: Record<string, [number, number]> = {
  'pulpo-brasas-recorte': [3829, 2599],
  'taco-calamar-recorte': [2979, 2631],
  'tortuga-recorte': [4001, 2276],
  'tostada-pulpo-recorte': [3958, 2636],
  // Bebidas: recortes 3:4 de las páginas del menú.
  'bebida-mojito': [3, 4], 'bebida-limonada-moras': [3, 4], 'bebida-naranjada-maracuya': [3, 4], 'bebida-pepino-frappe': [3, 4],
  'bebida-michelada': [3, 4], 'bebida-cantarito': [3, 4], 'bebida-vampiro': [3, 4],
  logo: [825, 823],
};
const ANCHOS = [480, 720, 960, 1600];

@Component({
  selector: 'app-foto',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display:contents' },
  template: `
    <picture>
      <source type="image/avif" [attr.srcset]="cargar() ? srcset('avif') : null" [attr.sizes]="tamanos()" />
      <source type="image/webp" [attr.srcset]="cargar() ? srcset('webp') : null" [attr.sizes]="tamanos()" />
      <img
        [attr.src]="cargar() ? 'fotos/' + nombre() + '-' + respaldo() + '.webp' : null"
        [alt]="alt()"
        [attr.width]="medida()[0]"
        [attr.height]="medida()[1]"
        [attr.loading]="prioridad() ? 'eager' : 'lazy'"
        [attr.fetchpriority]="prioridad() ? 'high' : null"
        [attr.decoding]="prioridad() ? 'sync' : 'async'"
        [class]="clase()"
      />
    </picture>
  `,
})
export class Foto {
  readonly nombre = input.required<string>();
  readonly alt = input('');
  readonly tamanos = input('(min-width: 60rem) 40vw, 100vw');
  readonly prioridad = input(false);
  readonly clase = input('');
  /** Anchos exportados de esta foto (las bebidas solo tienen 320 y 480). */
  readonly anchos = input<number[]>(ANCHOS);
  /**
   * Con `diferir`, el HTML prerenderizado sale sin la imagen y esta se pide al hidratarse
   * su bloque (al entrar en pantalla), para no competir con la foto del héroe.
   */
  readonly diferir = input(false);

  private readonly enServidor = isPlatformServer(inject(PLATFORM_ID));
  protected readonly cargar = computed(() => !(this.enServidor && this.diferir()));

  protected readonly respaldo = computed(() => (this.anchos().includes(960) ? 960 : this.anchos().at(-1)));

  protected readonly medida = computed(() => {
    const m = MEDIDAS[this.nombre()] ?? [2400, 1600];
    return [1600, Math.round((1600 * m[1]) / m[0])];
  });

  protected srcset(formato: 'avif' | 'webp') {
    return this.anchos().map((w) => `fotos/${this.nombre()}-${w}.${formato} ${w}w`).join(', ');
  }
}
