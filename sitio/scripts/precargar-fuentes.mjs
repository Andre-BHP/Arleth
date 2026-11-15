// Precarga las fuentes del título del héroe (Bebas Neue y Caveat Brush recortada) para evitar el salto al cambiar de fuente.
// Uso: node scripts/precargar-fuentes.mjs dist/sitio/browser
import fs from 'node:fs';
import path from 'node:path';

const raiz = process.argv[2] ?? 'dist/sitio/browser';
const media = fs.readdirSync(path.join(raiz, 'media'));
const buscar = (re) => media.find((f) => re.test(f));
const fuentes = [buscar(/^bebas-neue-latin-400-normal-.*\.woff2$/), buscar(/^caveat-brush-sub-.*\.woff2$/)].filter(Boolean);
const enlaces = fuentes.map((f) => `<link rel="preload" href="media/${f}" as="font" type="font/woff2" crossorigin>`).join('');
for (const f of ['index.html', 'menu/index.html', 'index.csr.html']) {
  const p = path.join(raiz, f);
  if (!fs.existsSync(p)) continue;
  const t = fs.readFileSync(p, 'utf8');
  if (t.includes('rel="preload" href="media/')) continue;
  // Después de <base href>: si van antes, en /menu/ se resuelven contra la carpeta de la página.
  fs.writeFileSync(p, t.replace(/(<base href="[^"]*">)/, `$1${enlaces}`));
}
console.log('Fuentes precargadas:', fuentes.join(', '));
