import {
  ApplicationRef, ChangeDetectionStrategy, Component, ElementRef, inject, signal, viewChild,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Foto } from '../../componentes/foto';
import { Sello } from '../../componentes/sello';
import { Icono } from '../../componentes/icono';
import { Concha } from '../../componentes/concha';
import { FAVORITOS, pesos } from '../../servicios/datos';
import { Carrito } from '../../servicios/carrito';

type Fav = (typeof FAVORITOS)[number];

@Component({
  selector: 'app-favoritos',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Foto, Sello, Icono, Concha],
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css',
})
export class Favoritos {
  private readonly doc = inject(DOCUMENT);
  private readonly app = inject(ApplicationRef);
  private readonly dialogo = viewChild.required<ElementRef<HTMLDialogElement>>('dialogo');

  protected readonly favoritos = FAVORITOS;
  protected readonly pesos = pesos;
  protected readonly abierto = signal<Fav | null>(null);
  private origen: HTMLElement | null = null;

  private readonly carrito = inject(Carrito);

  /** Cierra el detalle y abre la hoja para elegir tamaño y cantidad. */
  protected pedirEste(f: Fav) {
    this.dialogo().nativeElement.close();
    this.abierto.set(null);
    this.app.tick();
    this.origen?.focus();
    this.carrito.pedirAgregar(f.platillo);
  }

  protected resumen(f: Fav) {
    return f.platillo.precios.map((p) => `${p.t} ${pesos(p.v)}`).join(' · ');
  }

  protected abrir(f: Fav, evento: Event) {
    const tarjeta = evento.currentTarget as HTMLElement;
    this.origen = tarjeta;
    const imagen = tarjeta.querySelector<HTMLElement>('.foto img');
    const mostrar = () => {
      if (imagen) imagen.style.viewTransitionName = '';
      this.abierto.set(f);
      this.app.tick();
      this.dialogo().nativeElement.showModal();
    };
    this.transicion(() => {
      if (imagen) imagen.style.viewTransitionName = 'plato';
    }, mostrar);
  }

  protected cerrar() {
    const tarjeta = this.origen;
    const imagen = tarjeta?.querySelector<HTMLElement>('.foto img');
    const ocultar = () => {
      this.dialogo().nativeElement.close();
      this.abierto.set(null);
      this.app.tick();
      if (imagen) imagen.style.viewTransitionName = 'plato';
    };
    this.transicion(() => {}, ocultar, () => {
      if (imagen) imagen.style.viewTransitionName = '';
      tarjeta?.focus();
    });
  }

  protected alCancelar(e: Event) {
    e.preventDefault();
    this.cerrar();
  }

  protected clicFuera(e: MouseEvent) {
    if (e.target === this.dialogo().nativeElement) this.cerrar();
  }

  /** View Transition cuando el navegador la soporta y no se pidió menos movimiento. */
  private transicion(antes: () => void, cambio: () => void, despues?: () => void) {
    const d = this.doc as Document & { startViewTransition?: (cb: () => void) => { finished: Promise<void> } };
    const reducir = this.doc.defaultView?.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!d.startViewTransition || reducir) {
      cambio();
      despues?.();
      return;
    }
    antes();
    d.startViewTransition(cambio).finished.finally(() => despues?.());
  }
}
