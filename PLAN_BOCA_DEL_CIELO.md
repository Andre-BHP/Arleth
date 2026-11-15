# Plan: rediseño del sitio de Boca del Cielo (Boca Mariscos Chapultepec)

Estado: plan, sin implementar. Fecha: 2026-11-13. Lo ejecuta la sesión **Arleth** en esta carpeta (`C:\Users\andre\OneDrive\Documentos\Proyectos\Arleth`).
Sitio actual: https://www.bocadelcielogdl.com (Wix). Menú completo ya transcrito en `C:\Users\andre\OneDrive\Documentos\Arthemis\consultas\boca-del-cielo-menu.md`.

> **Aviso:** Boca del Cielo es un negocio real. Esto es una **propuesta o prototipo local**.
> - No se publica como sitio oficial, no se usa su dominio y no se sube a un hosting público sin permiso del restaurante.
> - Las fotos del sitio y de su Instagram son suyas: sirven para el prototipo local, pero para publicarlas hace falta su autorización.
> - No se inventan cifras ni reseñas: cada dato de popularidad que se muestre debe tener fuente real.

---

## 1. Objetivo

Que el sitio se sienta fluido y apetitoso, y que lo primero que vea el cliente sean **los platillos que más gustan**, con un camino de un toque para pedir o llegar.

## 2. Diagnóstico del sitio actual

| Problema | Efecto |
|---|---|
| El menú son 13 imágenes JPG (2126×3250) | Ilegible en celular, no se puede buscar, Google no lo lee, pesa mucho y no es accesible |
| Los favoritos no destacan | El cliente tiene que hojear 8 páginas para encontrar el aguachile negro |
| Horarios que no coinciden: sitio "mar–dom 11:30–18:30", Cylex "diario 12–19", Rappi "12–18", Turismo GDL "jue–dom" | Clientes que llegan y está cerrado; además daña el SEO local |
| La portada del menú lista sucursales y teléfonos distintos a la página Sucursales (Chapultepec 2 y Centro solo aparecen ahí) | Datos de contacto confusos |
| Pedidos a domicilio en `bocadelcielo.mobi`, escondido en la portada del menú | Se pierden pedidos |
| Plantilla de Wix genérica | No transmite la marca (madera azul pintada, conchas, frascos con etiqueta) |

## 3. Los favoritos para la primera plana (investigación)

No hay datos públicos de ventas. El orden sale de reseñas y plataformas, contando cuántas fuentes independientes los mencionan bien. **Hay que pedir al restaurante sus 5 más vendidos reales (punto de venta) para confirmar antes de publicar.**

| # | Platillo (precio en local) | Evidencia |
|---|---|---|
| 1 | **Aguachile negro de camarón** (tostada $64 · media $132 · orden $210) | El más citado: 4 menciones positivas en Wanderlog (reseña destacada y Google); "aguachiles negros" como imprescindible en TripAdvisor |
| 2 | **Ceviche de pescado del cielo** (tostada $52 · media $112 · orden $185) | 4 menciones en Wanderlog; Time Out alaba su agridulce de mango y manzana; favorito en TripAdvisor ("ordena media, es mucho") |
| 3 | **Taco de tripita de calamar** ($42 · orden de 3 $112) | Time Out: "crujiente y bien sazonado"; Wanderlog lo marca como especialidad |
| 4 | **Carnitas de atún** (taco $46 · orden $125; entrada $178) | Recomendación local en Airbnb ("no te vayas sin probar…"); "los tacos de atún son lo mejor" en TripAdvisor |
| 5 | **Taco doradito gobernador** ($50 · orden $138) | **El dato más sólido:** 94 % de 68 calificaciones a favor en Uber Eats |
| 6 | **Tostadas de atún** (Atún fresco $60 / $126 / $200) | "Las tostadas de atún son soberbias" (TripAdvisor) |

**Bebidas favoritas:** mojitos ($86; 4 menciones), limonada especial de moras o guanábana ($50 / $82), micheladas ($68; con camarones $109).
**Novedades para una franja aparte:** Pulpo especial, Atún tropical y Tiradito de atún tropical (marcados como "Nuevo" en su menú).
**Lo que se critica en reseñas:** esperas, servicio lento al llenarse (después de las 14:00) y música alta. El sitio puede ayudar con un aviso honesto de "horas más tranquilas" y un botón de pedir para llevar.

Fuentes:
- [Wanderlog](https://wanderlog.com/place/details/5329631/boca-del-cielo)
- [Time Out](https://www.timeoutmexico.mx/ciudad-de-mexico/restaurantes/boca-del-cielo)
- [TripAdvisor](https://www.tripadvisor.com/Restaurant_Review-g150798-d3687050-Reviews-or15-Boca_del_cielo-Guadalajara_Guadalajara_Metropolitan_Area.html)
- [Uber Eats](https://www.ubereats.com/mx/store/boca-del-cielo-tlaquepaque/eG4p633KTRKSgAPWi_59RA)
- [Airbnb](https://it.airbnb.ch/things-to-do/places/459353)

## 4. Identidad visual

- **Metáfora (dis-050):** su propio mundo. El frasco de vidrio con la etiqueta redonda "Boca del Cielo · antojitos del mar", la madera pintada de azul, las conchas dibujadas a línea y el trazo de pincel amarillo. La etiqueta redonda sirve de insignia ("Favorito", "Nuevo", "Picante") y el pincel subraya títulos.
- **Material (dis-009):** madera pintada (azul en secciones oscuras, blanca en las claras) más papel de menú. Nada de vidrio ni desenfoques.
- **Color (dis-043):** dos colores de base y un acento solo para la acción principal.

  | Rol | Propuesta inicial | Notas |
  |---|---|---|
  | Base oscura | Azul marino de su madera (≈ #0f3a57) | Fondos de héroe, bebidas y pie |
  | Base clara | Arena o crema (≈ #f6efe3) | Menú, favoritos |
  | Acento | Coral (≈ #ff6a4d) **o** el amarillo de su pincel (≈ #f5c518) | Solo en el botón principal; decidir con `impeccable` y verificar contraste 4.5:1 |

- **Tipografía:**
  - Nombres de platillo en una condensada como la de su menú (Bebas Neue u Oswald).
  - Títulos de sección con pincel (Caveat Brush o similar), solo en palabras sueltas.
  - Texto en una grotesca legible (DM Sans o Inter).
  - Precios y horarios en mono pequeña (dis-039), porque son datos reales.
- **Especificación antes de construir (dis-019):** tokens de color, escala tipográfica, espaciado de 8 px, radios, sombras y duraciones en `DESIGN.md` desde el día uno.

## 5. Estructura del sitio

### Inicio (una página larga)
| # | Sección | Qué lleva | Cartas de Uatu |
|---|---|---|---|
| 1 | **Héroe** | Foto macro del aguachile negro, una sola frase ("El mar, en Guadalajara") y un botón sólido "Ver el menú"; "Pedir" en contorno. Abajo, una línea mono con datos reales: "Abierto hoy 11:30–18:30 · Morelos 1548" (abierto o cerrado según la hora) | dis-054, dis-008, dis-051, dis-039; opcional dis-049 (ondas sutiles al pasar el cursor) |
| 2 | **Los favoritos** | Bento: aguachile negro en tarjeta grande 2×2 y los otros 5 alrededor. Cada tarjeta lleva foto, nombre, precio de tostada, media orden y orden, y etiquetas flotantes (Favorito, Picante, Nuevo). Al pasar el cursor, escena con paralaje (ingredientes); al tocarla, se expande a pantalla completa con descripción, fotos y "Pedir este" | dis-040, dis-002, dis-032, dis-034 |
| 3 | **Bebidas** | Franja horizontal de frascos (mojitos, limonadas, micheladas) que avanza con el scroll | dis-028 |
| 4 | **Novedades** | Pulpo especial, Atún tropical y Tiradito tropical | — |
| 5 | **Menú rápido** | Las categorías como accesos directos al menú completo | — |
| 6 | **Boca del Cielo en casa** | Listos para calentar, guisos al vacío y salsas; botón de WhatsApp con mensaje prellenado | — |
| 7 | **Sucursales** | Las 7 (incluida Chapultepec 2), cada una con dirección, horario, "abierto ahora", llamar, WhatsApp y "Cómo llegar" (Google Maps) | dis-052 |
| 8 | **Pie que demuestra que es real** | Sucursales, horarios, redes, pedidos, aviso legal y facturación | dis-052, dis-053 |

Entre secciones claras y oscuras, un borde de **ola** irregular que se mueve un poco con el scroll (dis-047 adaptada: en vez de papel rasgado, oleaje).

### Menú (página aparte, en texto real)
- Generado desde un JSON con la transcripción completa (categorías, platillos, descripciones, tamaños, precios, etiquetas).
- **Índice de categorías fijo** que marca dónde vas (dis-044): Entradas, Tortugas, Tacos, Tostadas, Cócteles, Platillos, Ensaladas, Tortas, Empanadas, Hamburguesas, Niños, Bebidas, Destilados.
- **Interruptor Fotos / Lista rápida** (dis-027): cuadrícula con fotos para explorar, o lista densa con precios para decidir rápido; se recuerda la elección.
- Buscador y filtros: picante, sin mariscos crudos, para niños, nuevo.
- Los favoritos llevan su insignia también aquí.
- Las imágenes originales del menú se pueden descargar en PDF para quien las quiera.

### 404 (opcional, dis-046)
Minijuego "atrapa los camarones con el plato" en canvas, con botón claro para volver al inicio.

## 6. Movimiento

- **Un protagonista por página (dis-023):** en Inicio es el héroe (entrada lenta de la foto y ondas opcionales); en Menú, el índice que sigue el scroll. Todo lo demás, transiciones de 150 a 250 ms.
- **Scroll suave** con Lenis y **GSAP ScrollTrigger** para la franja de bebidas y las olas (dis-036). Aquí sí conviene: no hay otro motor de scroll que choque.
- Curvas y duraciones con la skill `emil-design-eng`.
- **`prefers-reduced-motion`:** sin olas, sin paralaje, franja horizontal convertida en cuadrícula.

## 7. Técnica

- **Stack:** Angular standalone con signals y CSS propio (lo que André domina), con **prerender (SSG)** para que cada página llegue como HTML y Google la lea. Sin backend: los datos van en `src/datos/menu.json` y `src/datos/sucursales.json`.
- **Imágenes:** fotos del sitio y del Instagram oficial, recortadas y exportadas en AVIF/WebP con `srcset`. El héroe con `fetchpriority="high"`. No se generan fotos de comida con IA: mostrarían platillos que no existen.
- **SEO local:**
  - schema.org `Restaurant` por sucursal, con `openingHoursSpecification`, `servesCuisine`, `hasMenu` y `Menu`/`MenuItem` con precios.
  - Mismo nombre, dirección y teléfono en todos lados.
  - Lista de directorios que corregir (Google, Cylex, Rappi, Turismo GDL) para que el restaurante unifique horarios.
- **Pedidos:** enlaces de WhatsApp por sucursal con mensaje prellenado ("Hola, quiero pedir: …" desde "Pedir este"), y enlaces a Rappi y Uber Eats. Verificar si `bocadelcielo.mobi` sigue vivo antes de enlazarlo.
- **Metas:** Lighthouse de 90 o más en rendimiento, accesibilidad, buenas prácticas y SEO en móvil; LCP menor a 2.5 s; WCAG 2.1 AA; sin scroll horizontal en 360 px.

## 8. Herramientas y skills

### Ya instaladas
| Skill o herramienta | Para qué |
|---|---|
| `impeccable` | Dirección visual, crítica, pulido, `DESIGN.md` (su flujo de shape, build y polish) |
| `anthropic-skills:emil-design-eng` | Curvas, tiempos y microinteracciones |
| `uatu` | Si hacen falta más referencias: `/uatu sitios web de restaurantes de mariscos` |
| `arthemis` | Consultar el menú transcrito y este plan |
| `hyperframes` | Opcional: video corto promocional de los favoritos a partir de sus fotos, para el héroe o para redes |
| `scroll-world` | **Opcional, de pago** (Higgsfield o Monid): un héroe tipo "viaje" del mar a la mesa. Solo si André aprueba el costo |
| Playwright y el navegador integrado | Capturas en escritorio y móvil, pruebas de flujo, revisión visual |

### Encontradas con find-skills (instalar en la sesión Arleth)
| Skill | Instalaciones | Fuente | Para qué |
|---|---|---|---|
| `anthropics/skills@frontend-design` | 1.1 M | Anthropic (oficial) | Base de diseño frontend sin aspecto genérico |
| `vercel-labs/agent-skills@web-design-guidelines` | 857 K | Vercel (oficial) | Auditoría de interfaz (la "Web Interface Guidelines" de dis-055) |
| `leonxlnx/taste-skill@design-taste-frontend` | 773 K | Comunidad | Criterio para evitar el aspecto "hecho con IA" |
| `greensock/gsap-skills@gsap-scrolltrigger` | 84.9 K | GreenSock (oficial) | Animaciones con scroll (dis-055) |
| `wondelai/skills@refactoring-ui` | 10.3 K | Comunidad | Auditoría con puntaje de jerarquía, espaciado y color (dis-055) |
| `agricidaniel/claude-seo@seo-local` | 8.3 K | Comunidad | SEO local y datos estructurados de restaurante |

```bash
npx skills add anthropics/skills@frontend-design -g -y
```
```bash
npx skills add vercel-labs/agent-skills@web-design-guidelines -g -y
```
```bash
npx skills add leonxlnx/taste-skill@design-taste-frontend -g -y
```
```bash
npx skills add greensock/gsap-skills@gsap-scrolltrigger -g -y
```
```bash
npx skills add wondelai/skills@refactoring-ui -g -y
```
```bash
npx skills add agricidaniel/claude-seo@seo-local -g -y
```

**Descartadas:** las de "restaurant website" (33 instalaciones o menos), las de Lottie (casi sin instalaciones) y las copias de GSAP de autores desconocidos.

### Cartas de Uatu que **no** se usan
- dis-041, dis-045: vidrio y superficies que siguen al cursor (no van con el material).
- dis-035, dis-048: 3D y tela (pesan y no aportan a vender comida).
- dis-010: video ligado al scroll (pesado; solo si hay video real del restaurante).
- dis-013: partículas.
- dis-014, dis-015, dis-056: ASCII (no es la voz de esta marca).
- dis-021: mancha de tinta (no hay modo oscuro).
- dis-033: pila de paneles.
- dis-042: lámpara.

## 9. Fases para la sesión Arleth

1. **Preparar:** instalar las skills, crear el proyecto Angular con prerender y pasar el menú transcrito a `menu.json` y las sucursales a `sucursales.json`.
2. **Dirección visual** con `impeccable` (shape): confirmar acento coral o amarillo, tipografías, tokens y `DESIGN.md`. Bocetar el héroe y el bento antes de programar.
3. **Construir Inicio:** héroe, favoritos (bento con tarjetas que se expanden), bebidas, novedades, en casa, sucursales, pie.
4. **Construir Menú:** índice sincronizado, interruptor fotos/lista, buscador y filtros.
5. **Movimiento:** Lenis, ScrollTrigger y olas, con `emil-design-eng`; un protagonista por página.
6. **SEO local y datos estructurados** con `seo-local`; lista de correcciones de directorios para el restaurante.
7. **Auditoría:** `web-design-guidelines`, `refactoring-ui`, `impeccable` (critique, audit, polish), Lighthouse y axe. Capturas con Playwright en 360, 768 y 1440 px.
8. **Presentación (dis-020):** capturas del sitio en un mockup de laptop y teléfono, y un antes/después contra el Wix actual, para mostrárselo al restaurante.

## 10. Pendientes que decide André
- Acento: coral o el amarillo del pincel de su marca.
- Si se usa `scroll-world` (de pago) o `hyperframes` para el héroe, o solo foto.
- Si se contacta al restaurante para pedir sus más vendidos reales, fotos en alta y permiso de publicación.
