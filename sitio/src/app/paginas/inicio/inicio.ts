import { ChangeDetectionStrategy, Component, ElementRef, PLATFORM_ID, inject } from '@angular/core';
import { DOCUMENT, isPlatformServer } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Foto } from '../../componentes/foto';
import { Sello } from '../../componentes/sello';
import { Icono } from '../../componentes/icono';
import { Ola } from '../../componentes/ola';
import { Favoritos } from './favoritos';
import { Movimiento } from '../../servicios/movimiento';
import { HorarioServicio } from '../../servicios/horario';
import { CATEGORIAS, CONTACTO, EN_CASA, NOVEDADES, Platillo, SUCURSAL, pesos, platillo, telefonoLegible } from '../../servicios/datos';
import { Carrito } from '../../servicios/carrito';
import { Contacto } from '../../servicios/contacto';

/** Fotos reales de su menú (herramientas/bebidas.mjs). */
const BEBIDAS = [
  { id: 'mojitos', foto: 'bebida-mojito', detalle: 'Moras, maracuyá y naranja, coco-guanábana, pepino y sandía, jengibre y limón.' },
  { id: 'limonada-especial', foto: 'bebida-limonada-moras', detalle: 'De moras, maracuyá o guanábana, en frasco.' },
  { id: 'naranjada-maracuya', foto: 'bebida-naranjada-maracuya', detalle: 'Naranja natural con pulpa de maracuyá.' },
  { id: 'frappe', foto: 'bebida-pepino-frappe', detalle: 'De moras, o pepino con hierbabuena.' },
  { id: 'michelada-fruta-camarones', foto: 'bebida-michelada', detalle: 'Con fruta y camarones.' },
  { id: 'cantarito', foto: 'bebida-cantarito', detalle: 'De litro, con sandía, limón y chile en el borde.' },
  { id: 'vampiro', foto: 'bebida-vampiro', detalle: 'De litro, con sandía y chile en el borde.' },
];

@Component({
  selector: 'app-inicio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Foto, Sello, Icono, Ola, Favoritos],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {
  protected readonly horario = inject(HorarioServicio).estado;
  protected readonly s = SUCURSAL;
  protected readonly pesos = pesos;
  protected readonly heroe = platillo('aguachile-negro');
  protected readonly novedades = NOVEDADES;
  protected readonly enCasa = EN_CASA;
  protected readonly bebidas = BEBIDAS.map((b) => ({ ...b, p: platillo(b.id) }));

  protected readonly categorias = CATEGORIAS.map((c) => {
    const items = c.secciones.flatMap((x) => x.items);
    return { id: c.id, nombre: c.nombre, total: items.length, desde: Math.min(...items.flatMap((i) => i.precios.map((p) => p.v))) };
  });

  protected readonly verMenu = '/menu';
  protected readonly k = inject(Contacto);
  private readonly carrito = inject(Carrito);
  /** "En casa" conserva su propio WhatsApp; el pedido del sitio usa el de la sucursal. */
  protected readonly casaNumero = CONTACTO['whatsappEnCasa'];
  protected readonly casaMensaje = 'Hola, quiero pedir de Boca del Cielo en casa: ';
  protected readonly telCasa = telefonoLegible(CONTACTO['whatsappEnCasa']);
  protected readonly sucursalMensaje = 'Hola, tengo una pregunta.';
  /** Miniatura borrosa del plato: se ve desde el primer cuadro mientras llega la foto. */
  protected readonly lqip = 'url(data:image/webp;base64,UklGRo4AAABXRUJQVlA4IIIAAACwBQCdASogABUAPu1cqk2ppKQiMBgMATAdiUATploYNU6CD8Lj490hklJmCQOJNKQJYxjeqgAA/q/sVIRPDbV93jbW4UmF36nS2KW63V7dMRY+vhsfp5Sl28zOy1FCF7k1d19XYF2A7sNTmI6eKiaRKlCNCJxUjcwr9tmgeqLTvAAA)';

  protected agregar(p: Platillo) {
    this.carrito.pedirAgregar(p);
  }

  constructor() {
    inject(Movimiento).inicio(inject(ElementRef<HTMLElement>));
    // En el prerender, la foto del héroe se pide antes que el JavaScript (mejora la LCP).
    if (isPlatformServer(inject(PLATFORM_ID))) {
      const doc = inject(DOCUMENT);
      const l = doc.createElement('link');
      l.rel = 'preload';
      l.setAttribute('as', 'image');
      l.setAttribute('type', 'image/avif');
      l.setAttribute('fetchpriority', 'high');
      l.setAttribute('imagesrcset', [480, 720, 960, 1600].map((w) => `fotos/aguachile-negro-${w}.avif ${w}w`).join(', '));
      l.setAttribute('imagesizes', '(min-width: 60rem) 58vw, calc(100vw - 2rem)');
      doc.head.insertBefore(l, doc.head.querySelector('link, style'));
    }
  }
}
