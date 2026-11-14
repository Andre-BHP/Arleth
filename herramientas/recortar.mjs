import sharp from 'sharp';
// Quita la cuña negra del fondo original en la esquina superior izquierda.
const casos = [
  ['fuentes-fotos/foto-36acbce9c2e340c89fa4131d2de648f3.jpg', 'aguachile-negro', { left: 260, top: 175, width: 2130, height: 1420 }],
  ['fuentes-fotos/foto-b2db57fdc7b14896bbb746f97e4432f6.jpg', 'atun-fresco', { left: 420, top: 300, width: 1950, height: 1300 }],
];
for (const [src, nombre, caja] of casos) {
  const base = sharp(src).extract(caja);
  await base.clone().resize(2400, 1600).jpeg({ quality: 92 }).toFile(`../video-heroe/assets/${nombre}.jpg`);
  for (const w of [480, 960, 1600]) {
    await base.clone().resize({ width: w }).avif({ quality: 50, effort: 5 }).toFile(`public/fotos/${nombre}-${w}.avif`);
    await base.clone().resize({ width: w }).webp({ quality: 78 }).toFile(`public/fotos/${nombre}-${w}.webp`);
  }
  console.log(nombre);
}
