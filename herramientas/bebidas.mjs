import sharp from 'sharp';
// Recorta las fotos de bebidas de las páginas del menú del restaurante (fuentes-menu/, 2126×3250).
const cortes = {
  'bebida-mojito': ['menu-06.jpg', { left: 489, top: 267, width: 361, height: 468 }],
  'bebida-limonada-moras': ['menu-03.jpg', { left: 531, top: 2290, width: 521, height: 810 }],
  'bebida-naranjada-maracuya': ['menu-03.jpg', { left: 1063, top: 2290, width: 521, height: 810 }],
  'bebida-pepino-frappe': ['menu-03.jpg', { left: 0, top: 2290, width: 521, height: 810 }],
  'bebida-michelada': ['menu-02.jpg', { left: 1303, top: 684, width: 420, height: 727 }],
  'bebida-cantarito': ['menu-02.jpg', { left: 1154, top: 1586, width: 394, height: 525 }],
  'bebida-vampiro': ['menu-02.jpg', { left: 1618, top: 1586, width: 385, height: 525 }],
};
const medidas = {};
for (const [nombre, [archivo, caja]] of Object.entries(cortes)) {
  // Todas al mismo formato vertical 3:4, recortando al centro.
  const alto = Math.round((caja.width * 4) / 3);
  const c = alto <= caja.height ? { ...caja, top: caja.top + Math.round((caja.height - alto) / 2), height: alto } : caja;
  const base = sharp(`fuentes-menu/${archivo}`).extract(c);
  for (const w of [320, 480]) {
    const r = base.clone().resize({ width: w, height: Math.round((w * 4) / 3), fit: 'cover' });
    await r.clone().avif({ quality: 50, effort: 6 }).toFile(`public/fotos/${nombre}-${w}.avif`);
    await r.clone().webp({ quality: 76 }).toFile(`public/fotos/${nombre}-${w}.webp`);
  }
  medidas[nombre] = [c.width, c.height];
}
console.log(JSON.stringify(medidas));
