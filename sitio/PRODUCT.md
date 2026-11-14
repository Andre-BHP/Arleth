# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Comensal de Guadalajara, casi siempre en celular, que está decidiendo qué pedir en Boca del Cielo o cómo llegar a la sucursal Chapultepec (Morelos 1548, col. Americana). Llega con hambre y prisa: quiere ver los platillos que más gustan, su precio y un camino de un toque para pedir o llegar.

Segunda audiencia: el propio restaurante, a quien se le presenta este prototipo como propuesta frente a su sitio actual en Wix.

## Product Purpose

Rediseño del sitio de Boca del Cielo (marca local "Boca Mariscos Chapultepec"), antojitos del mar. Muestra primero los favoritos respaldados por reseñas reales, el menú completo en texto (buscable, legible en celular, leído por Google) y los datos de la sucursal con horario y "abierto ahora". Éxito: el cliente encuentra el aguachile negro en un vistazo y pide o llega en un toque.

Es un prototipo. No es el sitio oficial ni usa su dominio. André decidió publicarlo en GitHub Pages solo como prototipo no oficial: con aviso fijo, sin indexar y sin contacto real (ver Publicación).

## Positioning

Su propio mundo físico: frascos de vidrio con etiqueta redonda "Boca del Cielo · antojitos del mar", madera pintada de azul, conchas dibujadas a línea y trazo de pincel amarillo. Ningún otro restaurante de mariscos puede copiar eso con verdad.

## Operating Context

- Pedidos: el sitio arma un pedido (tamaño, cantidad, notas, entrega, nombre y hora) y lo envía como un solo mensaje al WhatsApp de la sucursal. Rappi y Uber Eats existen; bocadelcielo.mobi ya no resuelve. Los números viven en `src/entornos/numeros.ts`.
- "Boca del Cielo en casa": guisos al vacío, listos para calentar y salsas por su propio WhatsApp (distinto al de la sucursal; el restaurante debe confirmar cuál recibe pedidos).
- Se llena después de las 14:00; las reseñas critican esperas y música alta.

## Capabilities and Constraints

- Angular standalone con signals, CSS propio sin librerías de UI, prerender estático (SSG). Sin backend.
- Datos en `src/datos/menu.json` (152 productos transcritos) y `src/datos/sucursales.json` (solo Chapultepec, por decisión de André).
- Precios del local en MXN; la fecha de la lista no se conoce.
- Horario de Chapultepec según su sitio: martes a domingo 11:30 a 18:30. Otras fuentes dicen otra cosa; se marca como dato a confirmar.
- Sin modo oscuro.

## Brand Commitments

- Nombre: Boca del Cielo. Logo en `fuentes-fotos/logo.png`.
- Acento: amarillo del pincel de su marca (decidido por André), solo en la acción principal.
- Interfaz profesional, sin emojis, en español.

## Evidence on Hand

- Fotos reales de platillos de su sitio (uso local; publicarlas requiere su autorización) en `public/fotos/`: aguachile negro, ceviche del cielo, carnitas de atún, atún fresco, tiradito, tortuga, taco de calamar, tostada de pulpo, pulpo a las brasas. Fotos de bebidas recortadas de las páginas de su menú (mojito, limonada con moras, naranjada con maracuyá, pepino frappé, michelada con camarones, cantarito, vampiro). No hay foto del taco gobernador.
- Favoritos por reseñas (no por ventas): Wanderlog, Time Out, TripAdvisor, Airbnb. La evidencia queda en `menu.json` y no se muestra; en pantalla solo citas cortas con fuente. El 94 % de Uber Eats del gobernador es de la sucursal Tlaquepaque y no se usa. Hay que pedir sus 5 más vendidos reales antes de publicar.
- No hay cifras de ventas. No inventarlas. No generar fotos de comida con IA.

## Publicación

Versión local (para el restaurante): `ng build`, con números reales. Versión publicada en GitHub Pages (`ng build -c pages`): modo demo con aviso fijo de prototipo no oficial, `noindex`, sin JSON-LD, sin teléfonos, WhatsApp ni correo reales; los botones muestran el mensaje que se habría enviado.

## Product Principles

1. Lo que más gusta, primero: los favoritos encabezan; su evidencia se guarda, no se exhibe.
2. Cada dato es real o se marca como pendiente de confirmar.
3. Un toque para actuar: agregar al pedido, pedir o cómo llegar siempre a la mano.
4. Legible en celular antes que vistoso: el menú es texto, no imágenes.

## Accessibility & Inclusion

WCAG 2.1 AA, contraste 4.5:1, sin scroll horizontal a 360 px, `prefers-reduced-motion` respetado.
