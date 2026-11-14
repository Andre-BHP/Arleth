import subsetFont from 'subset-font';
import fs from 'node:fs';
// Caveat Brush solo se usa en palabras contadas. Si se agrega otra, sumar sus letras aquí y volver a correr.
const origen = 'node_modules/@fontsource/caveat-brush/files/caveat-brush-latin-400-normal.woff2';
const usos = [
  'mar,', 'menú', 'antojitos del mar', 'marea',            // héroe, /menu, lema del pie, 404
  'Favorito', 'Nuevo', 'Picante',                           // sello grande
];
const texto = [...new Set(usos.join(''))].join('');
const sub = await subsetFont(fs.readFileSync(origen), texto, { targetFormat: 'woff2' });
fs.mkdirSync('public/fuentes', { recursive: true });
fs.writeFileSync('public/fuentes/caveat-brush-sub.woff2', sub);
console.log('caveat', fs.statSync(origen).size, '→', sub.length);
