# Boca del Cielo Chapultepec · prototipo de sitio

Prototipo no oficial de rediseño para el restaurante Boca del Cielo (Morelos 1548, Guadalajara). No es su sitio ni recibe pedidos. Las fotos, el menú y la marca pertenecen al restaurante.

## Dos versiones

| | Local (para el restaurante) | Publicada (GitHub Pages) |
|---|---|---|
| Comando | `npm run build` | `npx ng build -c pages` y `node scripts/preparar-pages.mjs dist/pages/browser` |
| Contacto | WhatsApp, teléfonos y correo reales | Nada real: los botones muestran el mensaje que se habría enviado |
| Aviso | En el pie | Franja fija arriba en todas las páginas y en el pie |
| Buscadores | Indexable, con schema.org `Restaurant` y `Menu` | `noindex, nofollow`, `robots.txt` con `Disallow: /`, sin JSON-LD ni sitemap |

La bandera vive en `src/entornos/entorno.ts` (`modoDemo`) y los números en `src/entornos/numeros.ts`; la configuración `pages` de `angular.json` los reemplaza por `entorno.pages.ts` y `numeros.pages.ts`. `scripts/preparar-pages.mjs` corrige las rutas del CSS en línea para la base `/Arleth/`, crea `404.html` y `.nojekyll`, y falla si encuentra un número o correo real.

## Correr

```bash
npm install
npm start            # http://localhost:4200
npm run build        # dist/sitio/browser con / y /menu prerenderizados
```

## Qué hay

- **Inicio:** héroe con video del aguachile negro (HyperFrames, en `../video-heroe`), cinco favoritos con detalle a pantalla completa (View Transitions), bebidas con fotos reales de su menú, novedades, menú rápido, "en casa" y la sucursal con "abierto ahora" en hora de Guadalajara.
- **Menú:** los 152 productos en texto, índice que sigue el scroll, lista rápida o con fotos, buscador, filtros y botón "Agregar" en cada platillo.
- **Pedido por WhatsApp:** tamaño, cantidad y notas por platillo; total aproximado con precios del local; recoger o a domicilio, nombre y hora; un solo mensaje ordenado a `wa.me` con el número de la sucursal. Se guarda en `localStorage`. Fuera de horario avisa que responden al abrir, sin bloquear. "En casa" conserva su propio WhatsApp.
- **Celular:** barra fija abajo con "Pedir" y "Cómo llegar", con espacio reservado y área segura.

## Estructura

- `src/datos/menu.json`: menú completo, favoritos (la evidencia es interna; en pantalla solo citas cortas con fuente) y "en casa".
- `src/datos/sucursales.json`: Chapultepec, horario y redes.
- `src/app/servicios`: datos, horario, carrito, contacto (modo demo), movimiento (Lenis + GSAP solo en escritorio) y SEO.
- `src/app/componentes`: cabecera, pie, foto, sello, ola, concha, hoja de agregar, panel del pedido, barra móvil y aviso de demostración.
- `public/fotos`: AVIF y WebP (480 a 1600 px; bebidas 320 y 480), con su origen incrustado. `public/texturas`: veta y fibra.

## Herramientas (en `../herramientas`)

`fotos-720.mjs`, `bebidas.mjs`, `recortar.mjs`, `texturas.mjs` y `fuente-pincel.mjs` regeneran recursos; `pruebas.mjs` recorre el pedido completo y la versión publicada; `axe.mjs` revisa accesibilidad; `capturas.mjs` saca capturas de página completa.

## Pendiente con el restaurante

Ver `../entregables/correcciones-para-el-restaurante.md`.
