---
name: Boca del Cielo
description: Antojitos del mar en Chapultepec, Guadalajara. Mesa de madera azul, frascos con etiqueta redonda y papel de menú.
colors:
  azul: "#0f3a57"
  azul-hondo: "#0a2a40"
  azul-veta: "#164a6d"
  azul-texto: "#c3d6e4"
  amarillo: "#f5c518"
  amarillo-claro: "#ffd43b"
  papel: "#f6efe3"
  papel-2: "#ece1cd"
  papel-tarjeta: "#fbf6ec"
  papel-borde: "#d8c9ae"
  tinta: "#13222d"
  tinta-2: "#45535e"
  chile: "#a92e1c"
  verde-abierto: "#1f7a4d"
typography:
  display:
    fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif"
    fontSize: "clamp(3.25rem, 2rem + 6vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.86
    letterSpacing: "0.005em"
  pincel:
    fontFamily: "'Caveat Brush', cursive"
    fontWeight: 400
    letterSpacing: "0"
  headline:
    fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif"
    fontSize: "clamp(2rem, 1.5rem + 2.2vw, 3.25rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "0.01em"
  title:
    fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif"
    fontSize: "1.6rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.02em"
  lead:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.4
  body:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
    fontVariation: "'wdth' 100"
  label:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 650
    fontVariation: "'wdth' 92"
  dato:
    fontFamily: "'Geist Mono Variable', ui-monospace, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    letterSpacing: "-0.01em"
    fontFeature: "tnum"
rounded:
  s: "6px"
  m: "14px"
  l: "26px"
  pildora: "999px"
spacing:
  e-1: "0.25rem"
  e-2: "0.5rem"
  e-3: "1rem"
  e-4: "1.5rem"
  e-5: "2rem"
  e-6: "3rem"
  e-7: "4.5rem"
  e-8: "7rem"
  gutter: "clamp(1rem, 0.5rem + 2.5vw, 2.5rem)"
  ancho: "76rem"
components:
  button-principal:
    backgroundColor: "{colors.amarillo}"
    textColor: "{colors.azul-hondo}"
    typography: "{typography.label}"
    rounded: "{rounded.pildora}"
    padding: "0 1.4em"
    height: "3.25rem"
  button-principal-hover:
    backgroundColor: "{colors.amarillo-claro}"
  button-azul:
    backgroundColor: "{colors.azul}"
    textColor: "{colors.papel}"
    typography: "{typography.label}"
    rounded: "{rounded.pildora}"
    padding: "0 1.4em"
    height: "3.25rem"
  button-azul-hover:
    backgroundColor: "{colors.azul-veta}"
  button-contorno:
    textColor: "{colors.papel}"
    typography: "{typography.label}"
    rounded: "{rounded.pildora}"
    padding: "0 1.4em"
    height: "3.25rem"
  button-contorno-papel:
    textColor: "{colors.azul}"
    rounded: "{rounded.pildora}"
  filtro:
    textColor: "{colors.papel}"
    rounded: "{rounded.pildora}"
    padding: "0 1rem"
    height: "2.5rem"
  filtro-activo:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.azul-hondo}"
  buscador:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.pildora}"
    padding: "0 1rem"
    height: "3.25rem"
  tarjeta-platillo:
    backgroundColor: "{colors.papel-tarjeta}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.l}"
  tarjeta-carta:
    backgroundColor: "{colors.papel-tarjeta}"
    rounded: "{rounded.m}"
    padding: "1rem"
  sello-favorito:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.azul}"
    rounded: "{rounded.pildora}"
  sello-nuevo:
    backgroundColor: "{colors.azul}"
    textColor: "{colors.papel}"
    rounded: "{rounded.pildora}"
  sello-picante:
    backgroundColor: "{colors.chile}"
    textColor: "#fff6ec"
    rounded: "{rounded.pildora}"
---

# Design System: Boca del Cielo

## Overview

**Creative North Star: "La mesa de Boca del Cielo vista desde arriba"**

El sitio es la mesa del local: tablón de madera pintada de azul marino con veta, papel de menú color arena encima, frascos de vidrio con su etiqueta redonda "Boca del Cielo · antojitos del mar", conchas dibujadas a línea y un solo trazo de pincel amarillo. Las secciones alternan entre madera (oscuras, texto papel) y papel (claras, texto tinta), y se separan con bordes de ola irregulares, nunca con una línea recta.

La densidad es de carta de restaurante: nombres grandes y condensados, precios alineados en cifras tabulares, renglones con regla punteada o discontinua como en un menú impreso. Las piezas de papel se apoyan sobre la madera con una sombra suave y a veces giradas uno o dos grados, como hojas dejadas en la mesa. El acento amarillo es escaso a propósito: marca la acción principal y una palabra.

El mundo rechaza la plantilla genérica de restaurante: foto a sangre con titular centrado y tres tarjetas iguales. Las fotos son reales (platillos de su sitio y bebidas recortadas de su menú), nunca imágenes generadas.

**Key Characteristics:**
- Dos materiales: madera azul (#0f3a57 con veta) y papel arena (#f6efe3 con fibra).
- Un acento amarillo pincel, solo en la acción principal y el trazo bajo "mar".
- Cuatro voces tipográficas con papeles fijos: Bebas Neue, Caveat Brush, Archivo, Geist Mono.
- Etiqueta redonda de frasco como sistema de insignias.
- Bordes de ola entre madera y papel; conchas e iconos a línea de un solo trazo.
- Esquinas redondeadas y píldoras; nada de cantos vivos en piezas interactivas.

## Colors

Paleta de dos materiales y un acento: azules de madera pintada, arenas de papel, y amarillo pincel en dosis mínimas.

### Primary
- **Amarillo Pincel** (amarillo): el color de la brocha de su marca. Solo en el botón principal ("Ver el menú", "Pedir este", "Agregar al pedido", "Enviar pedido por WhatsApp"), el trazo de pincel bajo "mar," en el héroe, el anillo de foco y la selección de texto. Su hover es **Amarillo Claro** (amarillo-claro).

### Secondary
- **Azul Madera** (azul): fondo de las secciones de madera, botón azul, reglas gruesas de 2px que abren listas y categorías sobre papel, enlaces de acción en papel y anillo de foco sobre papel.
- **Azul Hondo** (azul-hondo): madera en sombra. Pie de página, texto de los botones amarillos, nombres de platillos sobre papel, velo de la cabecera fija (al 86-94%) y del fondo de diálogo (al 72%).
- **Azul Veta** (azul-veta): hover del botón azul.
- **Azul Neblina** (azul-texto): texto secundario sobre madera (bajadas, notas, horario, encabezados del pie).

### Tertiary
- **Chile** (chile): solo el sello "Picante".
- **Verde Abierto** (verde-abierto): solo el estado "Abierto ahora" sobre papel, con punto y halo.

### Neutral
- **Papel Arena** (papel): fondo base del documento y de las secciones de papel; texto principal sobre madera.
- **Papel Doblado** (papel-2): pozo de imagen vacío y riel de la barra de scroll.
- **Papel de Tarjeta** (papel-tarjeta): cara de las tarjetas de platillo, un tono más claro que el papel para levantarlas.
- **Borde de Papel** (papel-borde): bordes de tarjeta, reglas punteadas y discontinuas entre renglones de carta.
- **Tinta** (tinta): texto principal sobre papel.
- **Tinta Lavada** (tinta-2): descripciones, notas, etiquetas de precio y sellos neutros (Crudo, Niños, Artesanal).

### Named Rules
**The Un Solo Pincel Rule.** El amarillo vive en cuatro lugares: botón principal, trazo bajo "mar," del héroe, anillo de foco y selección de texto. Ningún fondo de sección, insignia, ícono ni borde decorativo es amarillo. Si una pantalla tiene dos botones amarillos, uno sobra.

**The Dos Materiales Rule.** Toda sección es madera o papel, nunca un tercer fondo. El texto se asigna por material: papel y azul neblina sobre madera; tinta y tinta lavada sobre papel.

## Typography

**Display Font:** Bebas Neue (con Arial Narrow)
**Script Font:** Caveat Brush (con cursive)
**Body Font:** Archivo Variable (con Archivo, system-ui)
**Label/Mono Font:** Geist Mono Variable (con ui-monospace)

**Character:** Rótulo pintado condensado para nombres, una palabra a pincel como firma, grotesca ancha y legible para leer, y mono tabular para todo lo que es cifra: la carta de un puesto de mariscos bien rotulado.

### Hierarchy
- **Display** (Bebas Neue 400, clamp(3.25rem → 6rem), interlínea 0.86): h1 del héroe y de /menu, en dos renglones cortos.
- **Headline** (Bebas Neue 400, clamp(2rem → 3.25rem), interlínea 0.95, +0.01em): títulos de sección ("Los favoritos", "Recién salidos", "Ven a Chapultepec") y categorías del menú.
- **Title** (Bebas Neue 400, 1.6-2rem, interlínea 1, +0.02em): nombres de platillo, bebida, grupo y categoría rápida; la tarjeta principal crece hasta clamp(2.2rem → 3.6rem).
- **Lead** (Archivo 400, clamp(1.25rem → 1.5rem), interlínea 1.4): bajadas bajo el h1 y descripción en el detalle, máximo 32ch en el héroe.
- **Body** (Archivo 400, 1.0625rem, interlínea 1.55): texto corrido y descripciones, 46-62ch.
- **Label** (Archivo 650, 0.9375-1.0625rem, ancho 92): botones, nombres de renglón de carta, navegación (550).
- **Dato** (Geist Mono 400, 0.8125-1.5rem, -0.01em, cifras tabulares): precios, horario, teléfonos, conteos y la línea de estado del héroe.

### Named Rules
**The Pincel Contado Rule.** Caveat Brush como tipografía de texto aparece en tres lugares: la palabra "mar," del héroe, la palabra "menú" del h1 de /menu y el lema "antojitos del mar" del pie. Dentro del sello grande, la palabra central es parte del dibujo de la etiqueta, no texto de interfaz. La fuente se sirve recortada a esas letras (herramientas/fuente-pincel.mjs): una palabra nueva a pincel exige volver a recortarla.

**The Cifra en Mono Rule.** Todo precio, horario y teléfono va en Geist Mono con cifras tabulares, para que las columnas de precios se alineen como en la carta impresa.

**The Rótulo Rule.** Los títulos de sección y los nombres de platillo son Bebas Neue en peso 400, en caja natural; nunca Archivo en negrita como título.

## Layout

Contenedor centrado de 76rem con medianil fluido (clamp(1rem → 2.5rem)). Escala de espaciado de base 8px, de 0.25rem a 7rem; las secciones respiran con 4.5rem arriba y 7rem abajo, y los encabezados de sección usan una rejilla de dos columnas (título a la izquierda, texto de 26rem alineado al pie a la derecha).

Las rejillas son asimétricas: héroe 0.9fr / 1.25fr con el plato a la derecha que, en escritorio, baja 14rem y sangra sobre la ola hacia la sección siguiente; favoritos en bento de seis columnas para cinco platillos: el primero ocupa 4 × 2, dos a su lado y dos abajo a lo ancho; /menu con índice fijo de 12rem y carta a la derecha. Las bebidas corren en una franja horizontal con scroll-snap que arranca alineada al contenedor y sangra hasta el borde derecho.

Puntos de quiebre en 60rem (todo a una columna, índice del menú pasa a una barra pegajosa de píldoras bajo la cabecera) y 36rem (botones del héroe a ancho completo, precios bajo la descripción). En móvil el plato del héroe va arriba y el texto debajo, y una barra fija abajo (Pedir y Cómo llegar) respeta el área segura; el documento reserva su alto con padding inferior. Sin scroll horizontal a 360px.

## Elevation & Depth

Profundidad de objetos sobre una mesa: el papel se apoya en la madera con sombras suaves y difusas en azul tinta, nunca negras ni desplazadas en duro. Las piezas sueltas (foto de sucursal, grupos "en casa", marco del héroe) se giran entre -1.2° y 1° para sentirse colocadas a mano. Los recortes de platillo proyectan su propia sombra con drop-shadow; las fotos de bebidas van en marcos de 14px con sombra sobre madera. La veta de la madera y la fibra del papel son mosaicos WebP con alfa (texturas/veta.webp de 600px y texturas/fibra.webp de 128px, generados por herramientas/texturas.mjs); la veta es provisional en espera de una foto real de su tablón pintado y debe seguir siendo sutil. No volver a pintarlas con filtros SVG en CSS: retrasaban el primer pintado.

### Shadow Vocabulary
- **Papel** (`box-shadow: 0 1px 2px rgb(19 34 45 / 0.08), 0 8px 24px -10px rgb(19 34 45 / 0.25)`): tarjetas de platillo, foto de sucursal, botón cerrar.
- **Alta** (`box-shadow: 0 2px 6px rgb(10 42 64 / 0.18), 0 24px 60px -20px rgb(10 42 64 / 0.55)`): papel sobre madera (grupos "en casa"), marco del héroe, diálogo de detalle.
- **Brillo pincel** (`box-shadow: 0 1px 0 rgb(255 255 255 / 0.4) inset, 0 6px 18px -6px rgb(245 197 24 / 0.6)`): solo el botón principal.

### Named Rules
**The Hoja Sobre la Mesa Rule.** La sombra describe papel apoyado en madera: difusa, con tinte azul y desplazamiento vertical. Al pasar el puntero una tarjeta sube 3px y su sombra se alarga; en reposo no hay brillos ni contornos luminosos.

## Shapes

Formas suaves y orgánicas. Radios de 6px (avisos chicos), 14px (tarjetas de carta, grupos) y 26px (tarjetas de favorito, marco del héroe, diálogo); todo lo que se toca y no es tarjeta (botones, filtros, buscador, sellos chicos, índice móvil) es píldora. Las secciones no tienen cantos: se unen con un borde de ola irregular de dos capas (la trasera al 45% de opacidad), alto clamp(28px → 64px), volteado en espejo de forma alterna. Los renglones de carta usan reglas punteadas o discontinuas en borde de papel; las listas y categorías abren con una regla sólida azul de 2px.

## Components

### Buttons
Píldoras táctiles y decididas, que se hunden al tocarlas.
- **Shape:** píldora (999px), alto mínimo 3.25rem (2.6rem en la cabecera), borde de 2px.
- **Principal:** amarillo pincel con texto azul hondo y brillo pincel; una por pantalla o diálogo. Hover a amarillo claro con sombra más larga.
- **Azul:** azul madera con texto papel, para acciones de navegación sobre papel ("Abrir el menú completo", "Cómo llegar"). Hover a azul veta.
- **Contorno:** transparente con borde del color del texto; papel sobre madera, azul sobre papel. Hover con velo del 7-10%.
- **Estados:** `:active` escala a 0.97; foco con anillo amarillo de 3px separado 3px (azul sobre papel). Los iconos van a 1.2em antes o después del texto.

### Chips (filtros y vista)
- **Style:** píldora de 2.5rem con borde de 1.5px papel al 45% sobre madera; texto Archivo 550.
- **State:** activo (`aria-pressed`) se rellena de papel con texto azul hondo. El selector de vista "Lista rápida / Con fotos" es un riel de píldora con fondo papel al 12% y la opción activa en papel.

### Cards / Containers
- **Corner Style:** 26px en favoritos y detalle; 14px en tarjetas de carta y grupos.
- **Background:** papel de tarjeta (#fbf6ec) sobre papel; papel con fibra sobre madera.
- **Shadow Strategy:** sombra papel en reposo; sombra alta cuando el papel está sobre madera (ver Elevation & Depth).
- **Border:** 1px borde de papel.
- **Internal Padding:** 1rem a 1.5rem. Un favorito sin foto real no entra al bento: se sustituye por otro que sí la tenga. Los recortes de platillo se muestran sobre un degradado radial de papel con su propia sombra.

### Inputs / Fields
- **Style:** buscador en píldora de 3.25rem, fondo papel, icono de lupa en azul, sin borde. Campos del pedido: 2.9rem de alto, radio 14px, borde de papel de 1.5px, fondo casi blanco; error con borde chile y texto chile debajo.
- **Focus:** anillo amarillo de 3px en el buscador (`:focus-within`); anillo azul de 3px en campos y opciones sobre papel.
- **Opciones (tamaño, entrega):** píldoras de 2.75rem con borde de papel; la elegida se rellena de azul con texto papel.

### Navigation
- **Cabecera:** fija, azul hondo translúcido con desenfoque, logo redondo sobre papel + nombre en Bebas Neue 1.6rem, enlaces Archivo 550 con subrayado papel de 2px que crece de izquierda a derecha en hover y en la página activa; botón contorno "Pedido" con contador en píldora papel que abre el panel del pedido; en móvil queda el icono y el contador. En la versión publicada, una franja papel fija arriba dice que es un prototipo no oficial.
- **Índice de la carta:** en escritorio, columna pegajosa en Bebas Neue 1.45rem con punto azul que aparece en la categoría activa; en móvil, barra pegajosa de píldoras desplazable y la activa rellena de azul.

### Sello (etiqueta de frasco)
La insignia de la casa. **Grande:** círculo de papel (o azul) con dos aros finos, la leyenda "BOCA DEL CIELO · ANTOJITOS DEL MAR ·" en Bebas Neue sobre el círculo y la palabra al centro a pincel; sombra suave y girado entre -10° y 8°, montado sobre la esquina de una foto. **Chico:** píldora en Bebas Neue 0.9rem con +0.06em para listas y tarjetas. Variantes por color: Favorito (papel con azul), Nuevo (azul con papel), Picante (chile con crema), y neutros transparentes con borde de papel (Crudo, Niños, Artesanal).

### Ola
Borde de oleaje irregular entre madera y papel, de dos capas; la capa trasera se desplaza un poco con el scroll. Toma el color de la sección de abajo y se monta encima de la de arriba.

### Concha
Concha de abanico a línea de un solo trazo (1.6px), del mismo lenguaje que los iconos (trazo 1.75 en cuerpo de 24px). Ornamento junto a títulos y en el pie.

### Pedido
Tres piezas. **Hoja de agregar:** diálogo de papel (hoja desde abajo en móvil) con tamaños en píldoras, cantidad con botones redondos de contorno azul, notas y el botón principal con el subtotal en mono. **Panel del pedido:** diálogo lateral de alto completo, renglones de carta con cantidad e importe en mono, total aproximado, entrega, nombre, hora y vista previa del mensaje; aviso en papel doblado si está cerrado. **Barra fija (móvil):** azul hondo al 96% con "Pedir" en papel y "Cómo llegar" en contorno. Al agregar, un aviso azul hondo en píldora aparece abajo 3.5s y el cambio se anuncia por aria-live; el foco vuelve siempre al botón que abrió el diálogo.

### Aviso de demostración
En la versión publicada (modo demo) ningún botón abre WhatsApp ni marca: un diálogo de papel muestra el mensaje que llegaría, en mono sobre papel de tarjeta con borde discontinuo.

### Detalle de platillo
La tarjeta de favorito se expande a un diálogo a pantalla completa con View Transition de la imagen, sellos, descripción, tabla de precios en mono entre reglas discontinuas, una cita corta con su fuente cuando existe (regla de papel a la izquierda) y el botón principal "Pedir este", que abre la hoja de agregar. Las notas de investigación nunca se muestran. Fondo de diálogo azul hondo al 72%. En móvil sube como hoja desde abajo con esquinas superiores de 26px.

## Do's and Don'ts

### Do:
- **Do** alternar secciones de madera azul y papel arena, unidas por la ola.
- **Do** reservar el amarillo pincel (#f5c518) para el botón principal, el trazo bajo "mar,", el anillo de foco y la selección.
- **Do** poner precios, horarios y teléfonos en Geist Mono con cifras tabulares.
- **Do** usar el sello redondo de frasco (grande sobre fotos, píldora en listas) para Favorito, Nuevo y Picante.
- **Do** usar solo platillos y bebidas con foto real en las secciones con imagen.
- **Do** dar a las piezas de papel sobre madera sombra azul difusa y, si están sueltas, un giro de 1° como máximo.
- **Do** respetar `prefers-reduced-motion`: el oleaje y las entradas se detienen.

### Don't:
- **Don't** usar amarillo en fondos, insignias, iconos, bordes decorativos ni en un segundo botón de la misma vista.
- **Don't** escribir a pincel (Caveat Brush) fuera de "mar,", "menú" y el lema "antojitos del mar"; los títulos de sección van en Bebas Neue.
- **Don't** separar madera y papel con una línea recta; el cambio de material siempre es una ola.
- **Don't** usar sombras negras o desplazadas en duro; la profundidad es papel apoyado en madera.
- **Don't** usar fotos generadas o de banco para platillos o bebidas.
- **Don't** usar emojis ni iconos de fuente; los iconos son SVG a línea de un solo trazo.
- **Don't** introducir un tercer material de fondo ni modo oscuro.
