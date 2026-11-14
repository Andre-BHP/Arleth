import { ChangeDetectionStrategy, Component, ElementRef, computed, effect, inject, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Carrito, Entrega } from '../servicios/carrito';
import { Contacto } from '../servicios/contacto';
import { HorarioServicio } from '../servicios/horario';
import { pesos } from '../servicios/datos';
import { SUCURSAL } from '../servicios/sucursal';
import { Icono } from './icono';

/** Panel del pedido: líneas, entrega, datos y envío por WhatsApp (o vista previa en la demo). */
@Component({
  selector: 'app-pedido',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icono, RouterLink],
  template: `
    <p class="solo-lector" aria-live="polite" aria-atomic="true">{{ carrito.anuncio() }}</p>
    @if (toast()) {
      <div class="toast" aria-hidden="true">
        <span>{{ toast() }}</span>
        <button type="button" (click)="carrito.abierto.set(true)" tabindex="-1">Ver pedido</button>
      </div>
    }

    <dialog #d class="panel" aria-labelledby="pedido-titulo" (close)="carrito.abierto.set(false)" (click)="clicFuera($event)">
      <div class="caja">
        <header class="cabeza">
          <h2 id="pedido-titulo">Tu pedido</h2>
          <button type="button" class="cerrar" (click)="d.close()" aria-label="Cerrar el pedido"><app-icono nombre="cerrar" /></button>
        </header>

        @if (carrito.lineas().length === 0) {
          <div class="vacio">
            <p>Todavía no agregas nada. En el menú, toca <strong>Agregar</strong> junto a cada platillo.</p>
            <a class="boton boton-azul" routerLink="/menu" (click)="d.close()">Ver el menú <app-icono nombre="flecha" /></a>
          </div>
        } @else {
          <ul class="lineas">
            @for (l of carrito.lineas(); track l.clave) {
              <li>
                <div class="linea-texto">
                  <span class="nombre">{{ l.nombre }}</span>
                  @if (l.tamano) { <span class="tamano">{{ l.tamano }}</span> }
                  @if (l.notas) { <span class="nota">Nota: {{ l.notas }}</span> }
                </div>
                <div class="paso" role="group" [attr.aria-label]="'Cantidad de ' + l.nombre">
                  <button type="button" (click)="carrito.cambiarCantidad(l.clave, -1)" [attr.aria-label]="l.cantidad === 1 ? 'Quitar ' + l.nombre : 'Uno menos de ' + l.nombre"><span aria-hidden="true">−</span></button>
                  <span class="dato">{{ l.cantidad }}</span>
                  <button type="button" (click)="carrito.cambiarCantidad(l.clave, 1)" [attr.aria-label]="'Uno más de ' + l.nombre"><app-icono nombre="mas" /></button>
                </div>
                <span class="dato importe">{{ pesos(l.precio * l.cantidad) }}</span>
              </li>
            }
          </ul>
          <p class="total"><span>Total aproximado</span> <span class="dato">{{ pesos(carrito.total()) }}</span></p>
          <p class="aclara">Con precios del local. El restaurante confirma el total y el costo de envío.</p>

          <form class="datos" (submit)="enviar($event)" novalidate>
            <fieldset>
              <legend>Entrega</legend>
              <div class="opciones">
                @for (o of entregas; track o.v) {
                  <label class="opcion">
                    <input type="radio" name="entrega" [value]="o.v" [checked]="carrito.entrega() === o.v" (change)="carrito.entrega.set(o.v)" />
                    <span>{{ o.t }}</span>
                  </label>
                }
              </div>
            </fieldset>
            @if (carrito.entrega() === 'recoger') {
              <p class="aclara">Se recoge en {{ sucursal.direccion }}.</p>
            } @else {
              <label class="campo">
                <span>Dirección de entrega</span>
                <input type="text" autocomplete="street-address" [value]="carrito.direccion()" (input)="carrito.direccion.set($any($event.target).value)"
                  [attr.aria-invalid]="intento() && !carrito.direccion().trim()" aria-describedby="error-direccion" />
                @if (intento() && !carrito.direccion().trim()) { <span class="error" id="error-direccion">Escribe la dirección para el envío.</span> }
              </label>
            }
            <div class="dos">
              <label class="campo">
                <span>Nombre</span>
                <input type="text" autocomplete="name" [value]="carrito.nombre()" (input)="carrito.nombre.set($any($event.target).value)"
                  [attr.aria-invalid]="intento() && !carrito.nombre().trim()" aria-describedby="error-nombre" />
                @if (intento() && !carrito.nombre().trim()) { <span class="error" id="error-nombre">Escribe tu nombre.</span> }
              </label>
              <label class="campo">
                <span>Hora deseada <small>(opcional)</small></span>
                <input type="time" min="11:30" max="19:30" step="900" [value]="carrito.hora()" (input)="carrito.hora.set($any($event.target).value)" />
              </label>
            </div>

            @if (fueraDeHorario()) {
              <p class="horario" role="note"><app-icono nombre="reloj" /> {{ fueraDeHorario() }}</p>
            }

            <details class="vista">
              <summary>Ver el mensaje que se enviará</summary>
              <pre>{{ carrito.mensaje() }}</pre>
            </details>

            <button type="submit" class="boton boton-principal enviar">
              <app-icono nombre="whatsapp" /> {{ contacto.demo ? 'Ver el mensaje del pedido' : 'Enviar pedido por WhatsApp' }}
            </button>
            <button type="button" class="vaciar" (click)="carrito.vaciar()">Vaciar pedido</button>
          </form>
        }
      </div>
    </dialog>
  `,
  styles: `
    .panel {
      margin: 0 0 0 auto; width: min(100%, 30rem); height: 100dvh; max-height: 100dvh; padding: 0; border: 0;
      background: var(--papel); color: var(--tinta); box-shadow: var(--sombra-alta);
    }
    .panel::backdrop { background: rgb(10 42 64 / 0.6); }
    .panel[open] { animation: entrar var(--d-lenta) var(--ease-salida); }
    @keyframes entrar { from { transform: translateX(24px); opacity: 0; } }
    .caja { display: flex; flex-direction: column; gap: var(--e-3); min-height: 100%; padding: var(--e-4) var(--e-4) calc(var(--e-5) + env(safe-area-inset-bottom)); }
    .cabeza { display: flex; align-items: center; justify-content: space-between; }
    h2 { font: 400 2.2rem/1 var(--f-nombre); color: var(--azul-hondo); }
    .cerrar {
      display: grid; place-items: center; width: 2.75rem; height: 2.75rem; border-radius: 50%;
      border: 0; background: var(--papel-2); color: var(--azul-hondo); cursor: pointer;
    }
    .vacio { display: grid; gap: var(--e-3); justify-items: start; color: var(--tinta-2); }
    .lineas { display: grid; border-top: 2px solid var(--azul); }
    .lineas li {
      display: grid; grid-template-columns: minmax(0, 1fr) auto auto; align-items: center; gap: var(--e-2) var(--e-3);
      padding: var(--e-3) 0; border-bottom: 1px dashed var(--papel-borde);
    }
    .linea-texto { display: grid; }
    .nombre { font-weight: 650; line-height: 1.25; }
    .tamano { font-size: var(--t-xs); color: var(--tinta-2); }
    .nota { font-size: var(--t-xs); color: var(--tinta-2); font-style: italic; }
    .paso { display: inline-flex; align-items: center; gap: 0.35rem; }
    .paso button {
      display: grid; place-items: center; width: 2.25rem; height: 2.25rem; border-radius: 50%;
      border: 1.5px solid var(--azul); background: transparent; color: var(--azul); font-size: 1.2rem; cursor: pointer;
    }
    .paso .dato { min-width: 2ch; text-align: center; font-weight: 600; }
    .importe { min-width: 4.5ch; text-align: right; font-weight: 600; color: var(--azul-hondo); }
    .total { display: flex; justify-content: space-between; align-items: baseline; font-weight: 650; font-size: var(--t-l); }
    .total .dato { color: var(--azul-hondo); }
    .aclara { font-size: var(--t-xs); color: var(--tinta-2); margin-top: calc(-1 * var(--e-2)); }
    .datos { display: grid; gap: var(--e-3); margin-top: var(--e-2); }
    fieldset { border: 0; margin: 0; padding: 0; }
    legend, .campo > span { font-size: var(--t-xs); font-weight: 650; color: var(--tinta-2); padding: 0; margin-bottom: var(--e-1); }
    .campo small { font-weight: 400; }
    .opciones { display: flex; flex-wrap: wrap; gap: var(--e-2); }
    .opcion {
      display: inline-flex; align-items: center; min-height: 2.75rem; padding: 0 1rem;
      border: 1.5px solid var(--papel-borde); border-radius: 999px; cursor: pointer; background: #fbf6ec; font-weight: 550;
    }
    .opcion:has(input:checked) { border-color: var(--azul); background: var(--azul); color: var(--papel); }
    .opcion:has(input:focus-visible) { outline: 3px solid var(--azul); outline-offset: 2px; }
    .opcion input { position: absolute; opacity: 0; pointer-events: none; }
    .campo { display: grid; }
    .campo input {
      min-height: 2.9rem; font: inherit; color: inherit; padding: 0 0.85rem;
      border: 1.5px solid var(--papel-borde); border-radius: var(--radio-m); background: #fffdf8;
    }
    .campo input:focus { outline: 3px solid var(--azul); outline-offset: 1px; }
    .campo input[aria-invalid='true'] { border-color: var(--chile); }
    .error { font-size: var(--t-xs); color: var(--chile); margin-top: var(--e-1); }
    .dos { display: grid; grid-template-columns: 1fr 1fr; gap: var(--e-3); }
    .horario {
      display: flex; gap: 0.5rem; align-items: flex-start; padding: var(--e-2) var(--e-3);
      border-radius: var(--radio-m); background: var(--papel-2); font-size: var(--t-s);
    }
    .vista summary { cursor: pointer; font-size: var(--t-s); font-weight: 600; color: var(--azul); }
    .vista pre {
      margin: var(--e-2) 0 0; padding: var(--e-3); white-space: pre-wrap; font: 400 var(--t-xs)/1.5 var(--f-dato);
      background: #fbf6ec; border: 1px dashed var(--papel-borde); border-radius: var(--radio-m);
    }
    .enviar { width: 100%; }
    .vaciar { justify-self: center; border: 0; background: none; color: var(--tinta-2); text-decoration: underline; cursor: pointer; font-size: var(--t-s); padding: var(--e-2); }

    .toast {
      position: fixed; z-index: 70; left: 50%; bottom: calc(5.5rem + env(safe-area-inset-bottom)); transform: translateX(-50%);
      display: flex; align-items: center; gap: var(--e-3); max-width: calc(100% - 2rem);
      padding: 0.7rem 0.7rem 0.7rem 1.1rem; border-radius: 999px;
      background: var(--azul-hondo); color: var(--papel); box-shadow: var(--sombra-alta); font-size: var(--t-s);
      animation: toast var(--d-lenta) var(--ease-salida);
    }
    .toast button { border: 0; border-radius: 999px; padding: 0.45rem 0.9rem; background: var(--papel); color: var(--azul-hondo); font-weight: 650; cursor: pointer; }
    @keyframes toast { from { transform: translate(-50%, 10px); opacity: 0; } }
    @media (min-width: 60rem) { .toast { bottom: var(--e-5); } }
    @media (max-width: 30rem) { .dos { grid-template-columns: 1fr; } }
  `,
})
export class Pedido {
  protected readonly carrito = inject(Carrito);
  protected readonly contacto = inject(Contacto);
  private readonly horario = inject(HorarioServicio).estado;
  protected readonly pesos = pesos;
  protected readonly sucursal = SUCURSAL;
  protected readonly entregas: { v: Entrega; t: string }[] = [
    { v: 'recoger', t: 'Recoger en sucursal' },
    { v: 'domicilio', t: 'A domicilio' },
  ];
  private readonly d = viewChild.required<ElementRef<HTMLDialogElement>>('d');
  protected readonly intento = signal(false);
  protected readonly toast = signal('');
  private previo: HTMLElement | null = null;
  private reloj: ReturnType<typeof setTimeout> | undefined;

  protected readonly fueraDeHorario = computed(() => {
    const h = this.horario();
    if (!h || h.abierto) return '';
    const abre = h.texto.replace(/^Cerrado · /, '');
    return `Ahorita está cerrado. Puedes enviar tu pedido y te responden al abrir (${abre}).`;
  });

  constructor() {
    effect(() => {
      const abierto = this.carrito.abierto();
      const dlg = this.d().nativeElement;
      if (abierto && !dlg.open) {
        this.previo = document.activeElement as HTMLElement | null;
        this.toast.set('');
        dlg.showModal();
      } else if (!abierto && dlg.open) {
        dlg.close();
      }
      if (!abierto && this.previo) {
        this.previo.focus();
        this.previo = null;
      }
    });
    // Aviso breve y visible cuando se agrega algo (el lector de pantalla lo recibe por aria-live).
    effect(() => {
      const a = this.carrito.anuncio();
      if (!a.startsWith('Agregado') || this.carrito.abierto()) return;
      this.toast.set(a.split('.')[0]);
      clearTimeout(this.reloj);
      this.reloj = setTimeout(() => this.toast.set(''), 3500);
    });
  }

  protected enviar(e: Event) {
    e.preventDefault();
    this.intento.set(true);
    const faltaDireccion = this.carrito.entrega() === 'domicilio' && !this.carrito.direccion().trim();
    if (!this.carrito.nombre().trim() || faltaDireccion) {
      // Tras pintar los errores, el foco va al primer campo pendiente.
      setTimeout(() => this.d().nativeElement.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }
    this.carrito.enviar();
  }

  protected clicFuera(e: MouseEvent) {
    if (e.target === this.d().nativeElement) this.d().nativeElement.close();
  }
}
