import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ENTORNO } from '../../entornos/entorno';
import { telefonoLegible, whatsapp } from './sucursal';

export interface AvisoDemo {
  titulo: string;
  texto: string;
  mensaje?: string;
}

/**
 * Todo contacto sale por aquí. En modo demo (GitHub Pages) nada abre WhatsApp ni llama:
 * se muestra el mensaje que se habría enviado.
 */
@Injectable({ providedIn: 'root' })
export class Contacto {
  readonly demo = ENTORNO.modoDemo;
  private readonly navegador = isPlatformBrowser(inject(PLATFORM_ID));
  /** Aviso abierto en la demostración (lo pinta AvisoDemo). */
  readonly aviso = signal<AvisoDemo | null>(null);

  /** href de un enlace de WhatsApp; en demo no hay enlace real. */
  hrefWhatsapp(numero: string, mensaje: string) {
    return this.demo ? '#demo' : whatsapp(numero, mensaje);
  }

  hrefTelefono(numero: string) {
    return this.demo ? '#demo' : `tel:+52${numero}`;
  }

  /** Texto visible de un teléfono. */
  telefonoVisible(numero: string) {
    return this.demo ? 'Oculto en la demostración' : telefonoLegible(numero);
  }

  /** Clic en un enlace de WhatsApp: en demo evita la navegación y muestra el mensaje. */
  alClicWhatsapp(e: Event, mensaje: string) {
    if (!this.demo) return;
    e.preventDefault();
    this.mostrarMensaje(mensaje);
  }

  alClicTelefono(e: Event) {
    if (!this.demo) return;
    e.preventDefault();
    this.aviso.set({
      titulo: 'Demostración',
      texto: 'Aquí se llamaría a la sucursal. En este prototipo los teléfonos están ocultos y no se marca a nadie.',
    });
  }

  /** Envía un mensaje armado por código (el pedido). */
  enviarWhatsapp(numero: string, mensaje: string) {
    if (this.demo) {
      this.mostrarMensaje(mensaje);
      return;
    }
    if (this.navegador) window.open(whatsapp(numero, mensaje), '_blank', 'noopener');
  }

  private mostrarMensaje(mensaje: string) {
    this.aviso.set({
      titulo: 'Demostración',
      texto: 'Este es el mensaje que llegaría al restaurante por WhatsApp. No se envió nada.',
      mensaje,
    });
  }
}
