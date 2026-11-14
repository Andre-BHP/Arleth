import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Carrito } from '../servicios/carrito';
import { SUCURSAL } from '../servicios/sucursal';
import { Icono } from './icono';

/** Barra fija abajo en celular: pedido y cómo llegar, siempre a un toque. */
@Component({
  selector: 'app-barra-movil',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icono],
  template: `
    <nav class="barra" aria-label="Acciones rápidas">
      <button type="button" class="boton pedir" (click)="carrito.abierto.set(true)">
        <app-icono nombre="bolsa" />
        Pedir
        @if (carrito.cuenta()) { <span class="cuenta dato">{{ carrito.cuenta() }}<span class="solo-lector"> en el pedido</span></span> }
      </button>
      <a class="boton boton-contorno" [href]="mapa" target="_blank" rel="noopener"><app-icono nombre="mapa" /> Cómo llegar</a>
    </nav>
  `,
  styles: `
    :host { display: none; }
    @media (max-width: 60rem) {
      :host {
        display: block; position: fixed; z-index: 60; left: 0; right: 0; bottom: 0;
        padding: var(--e-2) var(--gutter) calc(var(--e-2) + env(safe-area-inset-bottom));
        background: rgb(10 42 64 / 0.96); border-top: 1px solid rgb(246 239 227 / 0.12);
        color: var(--papel);
      }
    }
    .barra { display: grid; grid-template-columns: 1.2fr 1fr; gap: var(--e-2); }
    .boton { --alto: 3rem; width: 100%; padding: 0 0.6em; gap: 0.45em; font-size: var(--t-s); white-space: nowrap; }
    /* El amarillo queda para la acción principal de cada pantalla; aquí, papel sobre azul. */
    .pedir { background: var(--papel); color: var(--azul-hondo); }
    .cuenta {
      display: inline-grid; place-items: center; min-width: 1.6rem; height: 1.6rem; padding: 0 0.35rem;
      border-radius: 999px; background: var(--azul-hondo); color: var(--papel); font-size: 0.8rem;
    }
  `,
})
export class BarraMovil {
  protected readonly carrito = inject(Carrito);
  protected readonly mapa = SUCURSAL.mapa;
}
