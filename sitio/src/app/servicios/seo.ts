import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { CONTACTO, SUCURSAL } from './sucursal';
import { ENTORNO } from '../../entornos/entorno';

/** Dominio de prueba (.test, reservado). Se cambia solo si el restaurante autoriza publicarlo en su dominio. */
export const BASE = 'https://boca-del-cielo.test';

const DIAS_SCHEMA = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function restaurante(menu?: object) {
  const s = SUCURSAL;
  const datos: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${BASE}/#chapultepec`,
    name: 'Boca del Cielo Chapultepec',
    alternateName: 'Boca Mariscos Chapultepec',
    image: `${BASE}/fotos/aguachile-negro-1600.webp`,
    logo: `${BASE}/fotos/logo-512.webp`,
    url: `${BASE}/`,
    telephone: `+52${s.telefono}`,
    email: CONTACTO['correo'],
    servesCuisine: ['Mariscos', 'Mexicana'],
    priceRange: '$$',
    acceptsReservations: false,
    hasMenu: `${BASE}/menu`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Calle Morelos 1548, Ladrón de Guevara, Americana',
      addressLocality: s.ciudad,
      addressRegion: s.estado,
      postalCode: s.cp,
      addressCountry: 'MX',
    },
    openingHoursSpecification: (s.horario ?? []).map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.dias.map((d) => DIAS_SCHEMA[d]),
      opens: h.abre,
      closes: h.cierra,
    })),
    sameAs: [CONTACTO['instagram'], CONTACTO['facebook']],
  };
  if (menu) datos['hasMenu'] = menu;
  return datos;
}

@Injectable({ providedIn: 'root' })
export class Seo {
  private readonly doc = inject(DOCUMENT);
  private readonly titulo = inject(Title);
  private readonly meta = inject(Meta);

  establecer(opc: { titulo: string; descripcion: string; ruta: string; menu?: object; indexar?: boolean }) {
    const url = `${BASE}${opc.ruta}`;
    this.titulo.setTitle(opc.titulo);
    this.meta.updateTag({ name: 'description', content: opc.descripcion });
    // La versión publicada (demo) es un prototipo no oficial: no se indexa ni lleva datos estructurados.
    const indexar = opc.indexar !== false && !ENTORNO.modoDemo;
    this.meta.updateTag({ name: 'robots', content: ENTORNO.modoDemo ? 'noindex, nofollow' : indexar ? 'index, follow' : 'noindex' });
    this.meta.updateTag({ property: 'og:title', content: opc.titulo });
    this.meta.updateTag({ property: 'og:description', content: opc.descripcion });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: 'restaurant' });
    this.meta.updateTag({ property: 'og:image', content: `${BASE}/fotos/aguachile-negro-1600.webp` });
    this.meta.updateTag({ property: 'og:locale', content: 'es_MX' });

    let canonico = this.doc.head.querySelector<HTMLLinkElement>('link[rel=canonical]');
    if (!canonico) {
      canonico = this.doc.createElement('link');
      canonico.rel = 'canonical';
      this.doc.head.appendChild(canonico);
    }
    canonico.href = url;

    this.doc.head.querySelector('script[data-schema]')?.remove();
    if (indexar) {
      const script = this.doc.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-schema', '');
      script.textContent = JSON.stringify(restaurante(opc.menu));
      this.doc.head.appendChild(script);
    }
  }
}
