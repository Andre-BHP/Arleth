import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { Cabecera } from './componentes/cabecera';
import { Pie } from './componentes/pie';
import { Pedido } from './componentes/pedido';
import { Agregar } from './componentes/agregar';
import { AvisoDemo } from './componentes/aviso-demo';
import { BarraMovil } from './componentes/barra-movil';
import { Movimiento } from './servicios/movimiento';
import { Seo } from './servicios/seo';

const PAGINAS: Record<string, { titulo: string; descripcion: string }> = {
  '/': {
    titulo: 'Boca del Cielo Chapultepec · Aguachiles, ceviches y tacos de mariscos en Guadalajara',
    descripcion: 'Antojitos del mar hechos al momento en Morelos 1548, col. Americana. Aguachile negro, ceviche del cielo, tacos de calamar y carnitas de atún. Martes a domingo, 11:30 a 18:30.',
  },
};

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, Cabecera, Pie, Pedido, Agregar, AvisoDemo, BarraMovil],
  // Los diálogos del pedido se cargan cuando el navegador queda libre: no pesan en la primera carga.
  template: `<app-cabecera /><router-outlet /><app-pie /><app-barra-movil />@defer (on idle) {<app-pedido /><app-agregar /><app-aviso-demo />}`,
  host: { style: 'display:block' },
})
export class App {
  constructor() {
    const seo = inject(Seo);
    const movimiento = inject(Movimiento);
    movimiento.iniciarScroll();
    inject(Router)
      .events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        const ruta = e.urlAfterRedirects.split(/[?#]/)[0] || '/';
        if (ruta === '/menu') return; // la página del menú pone su propio SEO con el esquema Menu
        const p = PAGINAS[ruta];
        if (p) seo.establecer({ ...p, ruta });
        else seo.establecer({ titulo: 'Página no encontrada · Boca del Cielo', descripcion: 'Esta página no existe.', ruta, indexar: false });
      });
  }
}
