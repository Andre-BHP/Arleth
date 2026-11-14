import sharp from 'sharp';
import fs from 'node:fs';
// Rasteriza las texturas de ruido (antes filtros SVG en CSS, caros de pintar) a mosaicos WebP.
const veta = `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600'><filter id='v'><feTurbulence type='fractalNoise' baseFrequency='0.003 0.09' numOctaves='3' seed='7' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.045 0'/></filter><rect width='600' height='600' filter='url(#v)'/></svg>`;
const fibra = `<svg xmlns='http://www.w3.org/2000/svg' width='128' height='128'><filter id='p'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' seed='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.35 0 0 0 0 0.27 0 0 0 0 0.15 0 0 0 0.06 0'/></filter><rect width='128' height='128' filter='url(#p)'/></svg>`;
fs.mkdirSync('public/texturas', { recursive: true });
// Con canal alfa: se pintan sobre el color de cada superficie.
await sharp(Buffer.from(veta)).webp({ quality: 80, alphaQuality: 90 }).toFile('public/texturas/veta.webp');
await sharp(Buffer.from(fibra)).webp({ lossless: true }).toFile('public/texturas/fibra.webp');
for (const f of ['veta', 'fibra']) console.log(f, fs.statSync(`public/texturas/${f}.webp`).size);
