import { ChangeDetectionStrategy, Component, ElementRef, computed, effect, inject, signal, untracked, viewChild } from '@angular/core';
import { Carrito } from '../servicios/carrito';
import { pesos } from '../servicios/datos';
import { Icono } from './icono';

/** Hoja para elegir tamaño, cantidad y notas antes de agregar un platillo al pedido. */
@Component({
  selector: 'app-agregar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icono],
  template: `
    <dialog #d class="hoja" aria-labelledby="agregar-titulo" (close)="alCerrar()" (click)="clicFuera($event)">
      @if (carrito.agregando(); as p) {
        <form class="caja" (submit)="confirmar($event)">
          <h2 id="agregar-titulo">{{ p.nombre }}</h2>
          @if (p.desc) { <p class="desc">{{ p.desc }}</p> }

          @if (p.precios.length > 1) {
            <fieldset>
              <legend>Tamaño</legend>
              <div class="tamanos">
                @for (pr of p.precios; track $index) {
                  <label class="opcion">
                    <input type="radio" name="tamano" [value]="$index" [checked]="indice() === $index" (change)="indice.set($index)" />
                    <span>{{ pr.t || 'Pieza' }}</span>
                    <span class="dato">{{ pesos(pr.v) }}</span>
                  </label>
                }
              </div>
            </fieldset>
          }

          <div class="cantidad">
            <span id="agregar-cantidad">Cantidad</span>
            <div class="paso" role="group" aria-labelledby="agregar-cantidad">
              <button type="button" (click)="cantidad.set(cantidad() - 1)" [disabled]="cantidad() <= 1" aria-label="Uno menos"><span aria-hidden="true">−</span></button>
              <output class="dato" aria-live="polite">{{ cantidad() }}</output>
              <button type="button" (click)="cantidad.set(cantidad() + 1)" [disabled]="cantidad() >= 20" aria-label="Uno más"><app-icono nombre="mas" /></button>
            </div>
          </div>

          <label class="notas">
            <span>Notas para la cocina <small>(opcional)</small></span>
            <textarea rows="2" maxlength="140" [value]="notas()" (input)="notas.set($any($event.target).value)" placeholder="Sin cebolla, salsa aparte…"></textarea>
          </label>

          <button type="submit" class="boton boton-principal enviar">Agregar al pedido · <span class="dato">{{ pesos(subtotal()) }}</span></button>
          <button type="button" class="cerrar" (click)="d.close()" aria-label="Cerrar"><app-icono nombre="cerrar" /></button>
        </form>
      }
    </dialog>
  `,
  styles: `
    .hoja {
      width: min(100% - 2rem, 30rem); max-height: calc(100dvh - 2rem); padding: 0; border: 0;
      border-radius: var(--radio-l); background: var(--papel); color: var(--tinta); box-shadow: var(--sombra-alta);
    }
    .hoja::backdrop { background: rgb(10 42 64 / 0.72); }
    .hoja[open] { animation: subir var(--d-media) var(--ease-salida); }
    @keyframes subir { from { transform: translateY(12px); opacity: 0; } }
    .caja { position: relative; display: grid; gap: var(--e-3); padding: var(--e-5) var(--e-4) var(--e-4); }
    h2 { font: 400 2rem/0.95 var(--f-nombre); color: var(--azul-hondo); padding-right: 3rem; }
    .desc { color: var(--tinta-2); font-size: var(--t-s); }
    fieldset { border: 0; margin: 0; padding: 0; }
    legend, .cantidad > span, .notas > span { font-size: var(--t-xs); font-weight: 650; color: var(--tinta-2); margin-bottom: var(--e-2); padding: 0; }
    .tamanos { display: flex; flex-wrap: wrap; gap: var(--e-2); }
    .opcion {
      display: inline-flex; align-items: baseline; gap: 0.5rem; min-height: 2.75rem; padding: 0.55rem 0.95rem;
      border: 1.5px solid var(--papel-borde); border-radius: 999px; cursor: pointer; background: #fbf6ec;
    }
    .opcion:has(input:checked) { border-color: var(--azul); background: var(--azul); color: var(--papel); }
    .opcion:has(input:focus-visible) { outline: 3px solid var(--azul); outline-offset: 2px; }
    .opcion input { position: absolute; opacity: 0; pointer-events: none; }
    .cantidad { display: flex; align-items: center; justify-content: space-between; }
    .cantidad > span { margin: 0; }
    .paso { display: inline-flex; align-items: center; gap: var(--e-2); }
    .paso button {
      display: grid; place-items: center; width: 2.75rem; height: 2.75rem; border-radius: 50%;
      border: 1.5px solid var(--azul); background: transparent; color: var(--azul); font-size: 1.4rem; cursor: pointer;
    }
    .paso button:disabled { opacity: 0.35; cursor: default; }
    .paso output { min-width: 2ch; text-align: center; font-size: var(--t-l); font-weight: 600; }
    .notas { display: grid; }
    .notas small { font-weight: 400; }
    textarea {
      font: inherit; color: inherit; padding: 0.6rem 0.8rem; border: 1.5px solid var(--papel-borde);
      border-radius: var(--radio-m); background: #fffdf8; resize: vertical;
    }
    textarea:focus { outline: 3px solid var(--azul); outline-offset: 1px; }
    textarea::placeholder { color: #55626d; }
    .enviar { width: 100%; }
    .cerrar {
      position: absolute; top: var(--e-3); right: var(--e-3); display: grid; place-items: center;
      width: 2.75rem; height: 2.75rem; border-radius: 50%; border: 0; background: var(--papel-2); color: var(--azul-hondo); cursor: pointer;
    }
    @media (max-width: 36rem) {
      .hoja { width: 100%; max-width: 100%; margin: auto 0 0; border-radius: var(--radio-l) var(--radio-l) 0 0; padding-bottom: env(safe-area-inset-bottom); }
    }
  `,
})
export class Agregar {
  protected readonly carrito = inject(Carrito);
  protected readonly pesos = pesos;
  private readonly d = viewChild.required<ElementRef<HTMLDialogElement>>('d');

  protected readonly indice = signal(0);
  protected readonly cantidad = signal(1);
  protected readonly notas = signal('');
  private previo: HTMLElement | null = null;

  protected readonly subtotal = computed(() => {
    const p = this.carrito.agregando();
    return p ? (p.precios[this.indice()]?.v ?? 0) * this.cantidad() : 0;
  });

  constructor() {
    effect(() => {
      const p = this.carrito.agregando();
      const dlg = this.d().nativeElement;
      if (p && !dlg.open) {
        untracked(() => {
          // Por defecto, el tamaño intermedio cuando hay tres (tostada, media, orden): la media orden.
          this.indice.set(p.precios.length === 3 ? 1 : 0);
          this.cantidad.set(1);
          this.notas.set('');
        });
        this.previo = document.activeElement as HTMLElement | null;
        queueMicrotask(() => dlg.showModal());
      }
    });
  }

  protected confirmar(e: Event) {
    e.preventDefault();
    const p = this.carrito.agregando();
    if (!p) return;
    const pr = p.precios[this.indice()];
    this.carrito.agregar(p, pr.t, pr.v, this.cantidad(), this.notas());
    this.d().nativeElement.close();
  }

  protected alCerrar() {
    this.carrito.agregando.set(null);
    // El foco vuelve al botón que abrió la hoja; el aviso "Agregado" lo da el pedido (aria-live).
    this.previo?.focus();
    this.previo = null;
  }

  protected clicFuera(e: MouseEvent) {
    if (e.target === this.d().nativeElement) this.d().nativeElement.close();
  }
}
