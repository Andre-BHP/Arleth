import { ChangeDetectionStrategy, Component, ElementRef, effect, inject, viewChild } from '@angular/core';
import { Contacto } from '../servicios/contacto';
import { Icono } from './icono';

/** Diálogo de la demostración: muestra lo que se habría enviado o marcado. */
@Component({
  selector: 'app-aviso-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icono],
  template: `
    <dialog #d class="hoja" aria-labelledby="aviso-demo-titulo" (close)="contacto.aviso.set(null)" (click)="clicFuera($event)">
      @if (contacto.aviso(); as a) {
        <div class="caja">
          <h2 id="aviso-demo-titulo">{{ a.titulo }}</h2>
          <p>{{ a.texto }}</p>
          @if (a.mensaje) { <pre class="mensaje">{{ a.mensaje }}</pre> }
          <button type="button" class="boton boton-azul" (click)="d.close()">Entendido</button>
          <button type="button" class="cerrar" (click)="d.close()" aria-label="Cerrar"><app-icono nombre="cerrar" /></button>
        </div>
      }
    </dialog>
  `,
  styles: `
    .hoja {
      width: min(100% - 2rem, 34rem); max-height: calc(100dvh - 2rem); padding: 0; border: 0;
      border-radius: var(--radio-l); background: var(--papel); color: var(--tinta); box-shadow: var(--sombra-alta);
    }
    .hoja::backdrop { background: rgb(10 42 64 / 0.72); }
    .caja { position: relative; display: grid; gap: var(--e-3); padding: var(--e-5) var(--e-4) var(--e-4); }
    h2 { font: 400 2rem/1 var(--f-nombre); color: var(--azul-hondo); padding-right: 3rem; }
    p { color: var(--tinta-2); }
    .mensaje {
      margin: 0; padding: var(--e-3); max-height: 50dvh; overflow: auto;
      white-space: pre-wrap; font: 400 var(--t-s)/1.5 var(--f-dato);
      background: #fbf6ec; border: 1px dashed var(--papel-borde); border-radius: var(--radio-m);
    }
    .boton { justify-self: start; }
    .cerrar {
      position: absolute; top: var(--e-3); right: var(--e-3); display: grid; place-items: center;
      width: 2.75rem; height: 2.75rem; border-radius: 50%; border: 0; background: var(--papel-2); color: var(--azul-hondo); cursor: pointer;
    }
  `,
})
export class AvisoDemo {
  protected readonly contacto = inject(Contacto);
  private readonly d = viewChild.required<ElementRef<HTMLDialogElement>>('d');
  private previo: HTMLElement | null = null;

  constructor() {
    effect(() => {
      const a = this.contacto.aviso();
      const dlg = this.d().nativeElement;
      if (a && !dlg.open) {
        this.previo = document.activeElement as HTMLElement | null;
        // Otro diálogo abierto (el pedido) queda debajo; este se apila encima.
        queueMicrotask(() => dlg.showModal());
      } else if (!a && dlg.open) {
        dlg.close();
      }
      if (!a && this.previo) {
        this.previo.focus();
        this.previo = null;
      }
    });
  }

  protected clicFuera(e: MouseEvent) {
    if (e.target === this.d().nativeElement) this.d().nativeElement.close();
  }
}
