import {
  ChangeDetectionStrategy, Component, DestroyRef, ElementRef, PLATFORM_ID, afterNextRender, computed,
  effect, inject, signal, viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Foto } from '../../componentes/foto';
import { Sello } from '../../componentes/sello';
import { Icono } from '../../componentes/icono';
import { Ola } from '../../componentes/ola';
import { Movimiento } from '../../servicios/movimiento';
import { BASE, Seo } from '../../servicios/seo';
import { CATEGORIAS, Categoria, Etiqueta, Platillo, pesos } from '../../servicios/datos';
import { Carrito } from '../../servicios/carrito';

type Filtro = 'favorito' | 'picante' | 'sin-crudo' | 'ninos' | 'nuevo';
type Vista = 'fotos' | 'lista';

const FILTROS: { id: Filtro; nombre: string }[] = [
  { id: 'favorito', nombre: 'Favoritos' },
  { id: 'picante', nombre: 'Picante' },
  { id: 'sin-crudo', nombre: 'Sin mariscos crudos' },
  { id: 'ninos', nombre: 'Para niños' },
  { id: 'nuevo', nombre: 'Nuevo' },
];

const normalizar = (t: string) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const CLAVE_VISTA = 'boca-vista-menu';

/** schema.org Menu con todas las secciones y precios. */
const esquemaMenu = () => ({
  '@type': 'Menu',
  url: `${BASE}/menu`,
  inLanguage: 'es-MX',
  hasMenuSection: CATEGORIAS.map((c) => ({
    '@type': 'MenuSection',
    name: c.titulo,
    hasMenuItem: c.secciones.flatMap((s) =>
      s.items.map((p) => ({
        '@type': 'MenuItem',
        name: p.nombre,
        ...(p.desc ? { description: p.desc } : {}),
        offers: p.precios.map((pr) => ({ '@type': 'Offer', ...(pr.t ? { name: pr.t } : {}), price: pr.v, priceCurrency: 'MXN' })),
      })),
    ),
  })),
});

@Component({
  selector: 'app-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Foto, Sello, Icono, Ola],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  private readonly navegador = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly movimiento = inject(Movimiento);
  private readonly indice = viewChild<ElementRef<HTMLElement>>('indice');

  protected readonly filtros = FILTROS;
  protected readonly pesos = pesos;
  protected readonly busqueda = signal('');
  protected readonly activos = signal<ReadonlySet<Filtro>>(new Set());
  protected readonly vista = signal<Vista>('lista');
  protected readonly activa = signal(CATEGORIAS[0].id);
  protected readonly etiquetasVisibles: Etiqueta[] = ['favorito', 'nuevo', 'picante', 'ninos'];

  protected readonly categorias = computed(() => {
    const q = normalizar(this.busqueda().trim());
    const f = this.activos();
    const pasa = (p: Platillo) => {
      if (q && !normalizar(`${p.nombre} ${p.desc ?? ''}`).includes(q)) return false;
      for (const x of f) {
        if (x === 'sin-crudo' ? p.tags.includes('crudo') : !p.tags.includes(x)) return false;
      }
      return true;
    };
    return CATEGORIAS.map((c): Categoria => ({
      ...c,
      secciones: c.secciones.map((s) => ({ ...s, items: s.items.filter(pasa) })).filter((s) => s.items.length),
    })).filter((c) => c.secciones.length);
  });

  protected readonly total = computed(() =>
    this.categorias().reduce((n, c) => n + c.secciones.reduce((m, s) => m + s.items.length, 0), 0),
  );
  protected readonly filtrando = computed(() => !!this.busqueda().trim() || this.activos().size > 0);

  constructor() {
    inject(Seo).establecer({
      titulo: 'Menú con precios · Boca del Cielo Chapultepec',
      descripcion: 'Menú completo de Boca del Cielo: tostadas, aguachiles, tacos, tortugas, cócteles, platillos, bebidas y destilados, con precios en el local.',
      ruta: '/menu',
      menu: esquemaMenu(),
    });
    if (!this.navegador) return;
    const destruir = inject(DestroyRef);

    afterNextRender(() => {
      try {
        const v = localStorage.getItem(CLAVE_VISTA);
        if (v === 'fotos' || v === 'lista') this.vista.set(v);
      } catch {}
      const abre = location.hash.slice(1);
      if (abre) {
        const el = document.getElementById(abre);
        if (el) setTimeout(() => { this.movimiento.irA(el, true); this.activa.set(abre); }, 150);
      }
    });

    // El índice marca la categoría que está a la vista.
    let observador: IntersectionObserver | null = null;
    effect(() => {
      this.categorias();
      queueMicrotask(() => {
        observador?.disconnect();
        observador = new IntersectionObserver(
          (entradas) => {
            const visible = entradas.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
            if (visible) this.activa.set(visible.target.id);
          },
          { rootMargin: '-30% 0px -60% 0px' },
        );
        this.host.nativeElement.querySelectorAll('section.categoria').forEach((s: Element) => observador!.observe(s));
      });
    });
    destruir.onDestroy(() => observador?.disconnect());

    // En móvil, la pastilla activa del índice se mantiene a la vista.
    effect(() => {
      const id = this.activa();
      const caja = this.indice()?.nativeElement;
      const pastilla = caja?.querySelector<HTMLElement>(`[data-cat="${id}"]`);
      if (caja && pastilla && caja.scrollWidth > caja.clientWidth) {
        caja.scrollTo({ left: pastilla.offsetLeft - caja.clientWidth / 2 + pastilla.offsetWidth / 2, behavior: 'smooth' });
      }
    });
  }

  protected cambiarVista(v: Vista) {
    this.vista.set(v);
    try { localStorage.setItem(CLAVE_VISTA, v); } catch {}
  }

  protected alternar(f: Filtro) {
    const s = new Set(this.activos());
    s.has(f) ? s.delete(f) : s.add(f);
    this.activos.set(s);
  }

  protected limpiar() {
    this.busqueda.set('');
    this.activos.set(new Set());
  }

  protected ir(id: string, e: Event) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      this.movimiento.irA(el);
      history.replaceState(null, '', `#${id}`);
      this.activa.set(id);
    }
  }

  private readonly carrito = inject(Carrito);

  protected agregar(p: Platillo) {
    this.carrito.pedirAgregar(p);
  }

  protected etiquetas(p: Platillo) {
    return this.etiquetasVisibles.filter((t) => p.tags.includes(t));
  }
}
