import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Icono } from './icono';
import { Carrito } from '../servicios/carrito';
import { Contacto } from '../servicios/contacto';

@Component({
  selector: 'app-cabecera',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, Icono],
  host: { role: 'banner' },
  template: `
    <a class="saltar" href="#contenido">Saltar al contenido</a>
    @if (demo) {
      <p class="aviso-demo">Prototipo no oficial de rediseño. No es el sitio de Boca del Cielo ni recibe pedidos.</p>
    }
    <div class="barra envoltura">
      <a routerLink="/" class="marca" aria-label="Boca del Cielo, inicio">
        <picture>
          <source type="image/avif" srcset="fotos/logo-256.avif" />
          <img src="fotos/logo-256.webp" alt="" width="48" height="48" />
        </picture>
        <span class="nombre">Boca del Cielo</span>
      </a>
      <nav aria-label="Principal">
        <ul>
          <li><a routerLink="/" fragment="favoritos">Favoritos</a></li>
          <li><a routerLink="/menu" routerLinkActive="activo" ariaCurrentWhenActive="page">Menú</a></li>
          <li class="ocultar-movil"><a routerLink="/" fragment="sucursal">Sucursal</a></li>
        </ul>
      </nav>
      <button type="button" class="boton boton-contorno pedir" (click)="carrito.abierto.set(true)">
        <app-icono nombre="bolsa" /><span class="texto">Pedido</span>
        <span class="cuenta dato" [class.vacia]="!carrito.cuenta()">{{ carrito.cuenta() }}<span class="solo-lector"> productos</span></span>
      </button>
    </div>
  `,
  styles: `
    :host {
      position: sticky; top: 0; z-index: 50; display: block;
      background: rgb(10 42 64 / 0.94);
      color: var(--papel);
      border-bottom: 1px solid rgb(246 239 227 / 0.08);
    }
    @supports (backdrop-filter: blur(1px)) {
      :host { background: rgb(10 42 64 / 0.86); backdrop-filter: saturate(1.4) blur(10px); }
    }
    .aviso-demo {
      margin: 0; padding: 0.4rem var(--gutter);
      background: var(--papel); color: var(--azul-hondo);
      font-size: var(--t-xs); font-weight: 650; text-align: center; line-height: 1.35;
    }
    .barra { display: flex; align-items: center; gap: var(--e-3); min-height: 4rem; }
    .marca { display: inline-flex; align-items: center; gap: 0.6rem; text-decoration: none; margin-right: auto; }
    .marca img { width: 2.75rem; height: 2.75rem; border-radius: 50%; background: var(--papel); }
    .nombre { font: 400 1.6rem/1 var(--f-nombre); letter-spacing: 0.02em; padding-top: 0.15em; }
    ul { display: flex; gap: clamp(0.75rem, 2vw, 1.75rem); }
    nav a {
      font-weight: 550; font-size: var(--t-s); text-decoration: none; padding: 0.5rem 0.1rem;
      background: linear-gradient(var(--papel), var(--papel)) no-repeat left 88% / 0 2px;
      transition: background-size var(--d-media) var(--ease-salida);
    }
    nav a:hover, nav a.activo { background-size: 100% 2px; }
    .pedir { --alto: 2.6rem; padding: 0 0.5em 0 0.9em; font-size: var(--t-s); gap: 0.45em; }
    .cuenta {
      display: inline-grid; place-items: center; min-width: 1.5rem; height: 1.5rem; padding: 0 0.3rem;
      border-radius: 999px; background: var(--papel); color: var(--azul-hondo); font-size: 0.78rem;
    }
    .cuenta.vacia { background: transparent; color: var(--azul-texto); }
    .saltar {
      position: absolute; left: var(--e-3); top: -4rem; padding: 0.6rem 1rem; z-index: 2;
      background: var(--amarillo); color: var(--azul-hondo); border-radius: var(--radio-s); font-weight: 650;
    }
    .saltar:focus { top: var(--e-2); }
    @media (max-width: 40rem) {
      .nombre, .ocultar-movil { display: none; }
      .pedir .texto { display: none; }
    }
  `,
})
export class Cabecera {
  protected readonly carrito = inject(Carrito);
  protected readonly demo = inject(Contacto).demo;
}
