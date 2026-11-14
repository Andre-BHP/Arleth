import { Injectable, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Platillo, pesos } from './datos';
import { SUCURSAL } from './sucursal';
import { Contacto } from './contacto';

export interface Linea {
  clave: string;
  id: string;
  nombre: string;
  tamano: string;
  precio: number;
  cantidad: number;
  notas: string;
}

export type Entrega = 'recoger' | 'domicilio';

interface Guardado {
  lineas: Linea[];
  entrega: Entrega;
  direccion: string;
  nombre: string;
  hora: string;
}

const CLAVE = 'boca-pedido';

/** Pedido por WhatsApp: se arma en el sitio y sale como un solo mensaje ordenado. */
@Injectable({ providedIn: 'root' })
export class Carrito {
  private readonly navegador = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly contacto = inject(Contacto);

  readonly lineas = signal<Linea[]>([]);
  readonly entrega = signal<Entrega>('recoger');
  readonly direccion = signal('');
  readonly nombre = signal('');
  readonly hora = signal('');

  /** Panel del pedido abierto. */
  readonly abierto = signal(false);
  /** Platillo que se está agregando (abre la hoja de tamaño y cantidad). */
  readonly agregando = signal<Platillo | null>(null);
  /** Último cambio, para anunciarlo con aria-live. */
  readonly anuncio = signal('');

  readonly cuenta = computed(() => this.lineas().reduce((n, l) => n + l.cantidad, 0));
  readonly total = computed(() => this.lineas().reduce((n, l) => n + l.precio * l.cantidad, 0));

  constructor() {
    if (!this.navegador) return;
    try {
      const g = JSON.parse(localStorage.getItem(CLAVE) ?? 'null') as Guardado | null;
      if (g) {
        this.lineas.set(Array.isArray(g.lineas) ? g.lineas : []);
        this.entrega.set(g.entrega === 'domicilio' ? 'domicilio' : 'recoger');
        this.direccion.set(g.direccion ?? '');
        this.nombre.set(g.nombre ?? '');
        this.hora.set(g.hora ?? '');
      }
    } catch {}
    effect(() => {
      const g: Guardado = {
        lineas: this.lineas(), entrega: this.entrega(), direccion: this.direccion(), nombre: this.nombre(), hora: this.hora(),
      };
      try { localStorage.setItem(CLAVE, JSON.stringify(g)); } catch {}
    });
  }

  private contar() {
    const n = this.cuenta();
    return `Tu pedido tiene ${n} ${n === 1 ? 'producto' : 'productos'}.`;
  }

  pedirAgregar(p: Platillo) {
    this.agregando.set(p);
  }

  agregar(p: Platillo, tamano: string, precio: number, cantidad: number, notas: string) {
    const nota = notas.trim();
    const clave = `${p.id}|${tamano}|${nota}`;
    const actuales = this.lineas();
    const existe = actuales.find((l) => l.clave === clave);
    this.lineas.set(
      existe
        ? actuales.map((l) => (l.clave === clave ? { ...l, cantidad: l.cantidad + cantidad } : l))
        : [...actuales, { clave, id: p.id, nombre: p.nombre, tamano, precio, cantidad, notas: nota }],
    );
    this.anuncio.set(`Agregado: ${cantidad} × ${p.nombre}${tamano ? ` (${tamano})` : ''}. ${this.contar()}`);
  }

  cambiarCantidad(clave: string, delta: number) {
    this.lineas.set(
      this.lineas().flatMap((l) => (l.clave !== clave ? [l] : l.cantidad + delta > 0 ? [{ ...l, cantidad: l.cantidad + delta }] : [])),
    );
    this.anuncio.set(this.contar());
  }

  quitar(clave: string) {
    const l = this.lineas().find((x) => x.clave === clave);
    this.lineas.set(this.lineas().filter((x) => x.clave !== clave));
    if (l) this.anuncio.set(`Quitado: ${l.nombre}. ${this.contar()}`);
  }

  vaciar() {
    this.lineas.set([]);
    this.anuncio.set('Pedido vacío.');
  }

  /** Mensaje que llega al restaurante. */
  readonly mensaje = computed(() => {
    const renglones = this.lineas().map((l) => {
      const base = `• ${l.cantidad} × ${l.nombre}${l.tamano ? ` (${l.tamano})` : ''} — ${pesos(l.precio * l.cantidad)}`;
      return l.notas ? `${base}\n   Nota: ${l.notas}` : base;
    });
    const entrega =
      this.entrega() === 'domicilio'
        ? `A domicilio: ${this.direccion().trim() || '(dirección pendiente)'}`
        : `Recoger en sucursal (${SUCURSAL.direccion})`;
    return [
      'Hola, quiero hacer un pedido en Boca del Cielo Chapultepec:',
      '',
      ...renglones,
      '',
      `Total aproximado: ${pesos(this.total())} (precios del local; puede variar)`,
      `Entrega: ${entrega}`,
      `Nombre: ${this.nombre().trim() || '(pendiente)'}`,
      ...(this.hora() ? [`Hora deseada: ${this.hora()}`] : []),
    ].join('\n');
  });

  enviar() {
    this.contacto.enviarWhatsapp(SUCURSAL.whatsapp!, this.mensaje());
  }
}
