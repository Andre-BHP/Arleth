import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icono } from '../../componentes/icono';

@Component({
  selector: 'app-no-encontrado',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Icono],
  template: `
    <main id="contenido" class="madera">
      <div class="envoltura">
        <p class="cifra dato" aria-hidden="true">404</p>
        <h1>Esta página se fue con la <span class="pincel subrayado">marea</span></h1>
        <p>No encontramos lo que buscabas. El menú y la sucursal siguen en su lugar.</p>
        <div class="acciones">
          <a class="boton boton-principal" routerLink="/menu">Ver el menú <app-icono nombre="flecha" /></a>
          <a class="boton boton-contorno" routerLink="/">Volver al inicio</a>
        </div>
      </div>
    </main>
  `,
  styles: `
    main { min-height: 70vh; display: grid; align-items: center; padding: var(--e-8) 0; }
    .cifra { font-size: clamp(4rem, 3rem + 6vw, 8rem); color: var(--azul-texto); line-height: 1; font-weight: 600; }
    h1 { margin-top: var(--e-3); font: 400 var(--t-xl)/0.95 var(--f-nombre); max-width: 18ch; }
    h1 .pincel { color: var(--papel); }
    p { margin-top: var(--e-3); color: var(--azul-texto); max-width: 46ch; }
    .acciones { display: flex; flex-wrap: wrap; gap: var(--e-2); margin-top: var(--e-5); }
  `,
})
export class NoEncontrado {}
