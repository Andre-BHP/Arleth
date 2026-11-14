import { DestroyRef, ElementRef, Injectable, PLATFORM_ID, afterNextRender, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

type Gsap = typeof import('gsap').gsap;
type ST = typeof import('gsap/ScrollTrigger').ScrollTrigger;

/**
 * Un protagonista por página. Inicio: entrada lenta del plato del héroe,
 * olas que se mueven un poco con el scroll y la franja de frascos.
 * Con prefers-reduced-motion no se anima nada y la franja queda como lista desplazable.
 */
@Injectable({ providedIn: 'root' })
export class Movimiento {
  private readonly navegador = isPlatformBrowser(inject(PLATFORM_ID));
  private lenis: import('lenis').default | null = null;
  private cargando: Promise<{ gsap: Gsap; ScrollTrigger: ST }> | null = null;

  private get reducir() {
    return matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * En celulares (pantalla angosta o táctil) no se cargan GSAP ni Lenis:
   * el scroll nativo ya es suave y el trabajo extra bloquea el hilo principal.
   */
  private get ligero() {
    return this.reducir || matchMedia('(max-width: 60rem), (pointer: coarse)').matches;
  }

  private cargar() {
    this.cargando ??= Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([g, s]) => {
      g.gsap.registerPlugin(s.ScrollTrigger);
      return { gsap: g.gsap, ScrollTrigger: s.ScrollTrigger };
    });
    return this.cargando;
  }

  /** Scroll suave global (se llama una vez desde App). */
  /** Espera a que la página cargue y el hilo quede libre antes de traer GSAP y Lenis. */
  private cuandoLibre() {
    return new Promise<void>((listo) => {
      const libre = () => ('requestIdleCallback' in window ? requestIdleCallback(() => listo(), { timeout: 2000 }) : setTimeout(listo, 300));
      if (document.readyState === 'complete') libre();
      else addEventListener('load', libre, { once: true });
    });
  }

  iniciarScroll() {
    if (!this.navegador) return;
    afterNextRender(async () => {
      if (this.ligero) return;
      await this.cuandoLibre();
      const [{ default: Lenis }, { gsap, ScrollTrigger }] = await Promise.all([import('lenis'), this.cargar()]);
      this.lenis = new Lenis({ duration: 1.05, easing: (t) => 1 - Math.pow(1 - t, 4), anchors: { offset: -((document.querySelector<HTMLElement>('app-cabecera')?.offsetHeight ?? 64) + 8) } });
      this.lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((t) => this.lenis?.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    });
  }

  irArriba() {
    if (this.lenis) this.lenis.scrollTo(0, { immediate: true });
    else if (this.navegador) scrollTo(0, 0);
  }

  irA(objetivo: HTMLElement, inmediato = false) {
    // Cabecera fija (72 px) más el índice fijo del menú en pantallas angostas.
    // Alto real de la cabecera fija (incluye el aviso de la demo) más el índice fijo del menú en celular.
    const cabecera = document.querySelector<HTMLElement>('app-cabecera')?.offsetHeight ?? 64;
    const offset = -(cabecera + 8 + (matchMedia('(max-width: 60rem)').matches && document.querySelector('.indice') ? 60 : 0));
    if (this.lenis) this.lenis.scrollTo(objetivo, { offset, immediate: inmediato });
    else objetivo.scrollIntoView({ behavior: inmediato || this.reducir ? 'instant' : 'smooth' });
  }

  inicio(host: ElementRef<HTMLElement>) {
    if (!this.navegador) return;
    const destruir = inject(DestroyRef);
    afterNextRender(async () => {
      const raiz = host.nativeElement;
      const video = raiz.querySelector<HTMLVideoElement>('[data-video-heroe]');
      const ahorro = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
      if (video && !this.reducir && !ahorro && matchMedia('(min-width: 60rem)').matches) {
        // El video entra después de la carga para no competir con la foto (LCP).
        const arrancar = () => setTimeout(() => {
          video.querySelectorAll<HTMLSourceElement>('source[data-src]').forEach((s) => (s.src = s.dataset['src']!));
          video.preload = 'auto';
          video.load();
          video.addEventListener('playing', () => video.classList.add('listo'), { once: true });
          video.play().catch(() => {});
        }, 1200);
        if (document.readyState === 'complete') arrancar();
        else addEventListener('load', arrancar, { once: true });
      }
      if (this.ligero) return;

      await this.cuandoLibre();
      const { gsap, ScrollTrigger } = await this.cargar();
      const ctx = gsap.context(() => {
        // Entrada del héroe: el plato llega a la mesa.
        gsap.from('.heroe-plato .marco', { scale: 1.06, rotate: 3, duration: 1.4, ease: 'expo.out' });
        gsap.from('.heroe-sello', { scale: 0.6, rotate: -40, duration: 1.1, delay: 0.35, ease: 'back.out(1.6)' });
        gsap.from('.heroe-texto > *', { y: 18, duration: 0.9, stagger: 0.07, ease: 'expo.out' });

        // Olas: la capa de atrás se corre un poco con el scroll.
        gsap.utils.toArray<SVGPathElement>('[data-ola-atras]').forEach((p) => {
          gsap.fromTo(p, { x: -40 }, {
            x: 40, ease: 'none',
            scrollTrigger: { trigger: p.closest('app-ola'), start: 'top bottom', end: 'bottom top', scrub: true },
          });
        });

        // Franja de frascos: se fija y avanza en horizontal en pantallas anchas.
        const mm = gsap.matchMedia();
        mm.add('(min-width: 60rem)', () => {
          const seccion = raiz.querySelector<HTMLElement>('[data-franja]');
          const pista = raiz.querySelector<HTMLElement>('[data-franja-pista]');
          if (!seccion || !pista) return;
          pista.style.overflow = 'visible';
          const recorrido = () => Math.max(0, pista.scrollWidth - innerWidth);
          gsap.to(pista, {
            x: () => -recorrido(),
            ease: 'none',
            scrollTrigger: {
              trigger: seccion,
              start: 'top top',
              end: () => `+=${recorrido()}`,
              pin: true,
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          });
          return () => { pista.style.overflow = ''; };
        });
      }, raiz);
      ScrollTrigger.refresh();
      destruir.onDestroy(() => ctx.revert());
    });
  }
}
