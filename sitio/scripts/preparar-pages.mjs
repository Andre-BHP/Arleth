// Ajusta el build de la versión publicada (ng build -c pages) antes de subirlo a GitHub Pages.
// Uso: node scripts/preparar-pages.mjs dist/pages/browser
import fs from 'node:fs';
import path from 'node:path';

const raiz = process.argv[2] ?? 'dist/pages/browser';
const leer = (f) => fs.readFileSync(path.join(raiz, f), 'utf8');
const escribir = (f, t) => fs.writeFileSync(path.join(raiz, f), t);

// 1. El CSS crítico en línea sale con rutas absolutas (/media/...) que ignoran la base /Arleth/.
const paginas = ['index.html', 'menu/index.html', 'index.csr.html'];
for (const f of paginas) {
  if (!fs.existsSync(path.join(raiz, f))) continue;
  let t = leer(f).replaceAll('url("/media/', 'url("media/').replaceAll("url('/media/", "url('media/");
  // 2. Prototipo no oficial: que ningún buscador lo indexe, también en la página de respaldo.
  if (!t.includes('name="robots"')) t = t.replace('</head>', '<meta name="robots" content="noindex, nofollow"></head>');
  escribir(f, t);
}

// 3. robots.txt que bloquea todo y sin sitemap.
escribir('robots.txt', 'User-agent: *\nDisallow: /\n');
fs.rmSync(path.join(raiz, 'sitemap.xml'), { force: true });

// 4. Rutas desconocidas: GitHub Pages sirve 404.html; usamos la app sin prerender.
fs.copyFileSync(path.join(raiz, 'index.csr.html'), path.join(raiz, '404.html'));
// 5. Sin procesamiento de Jekyll.
escribir('.nojekyll', '');

// 6. Comprobaciones de seguridad: nada de contacto real en lo que se publica.
const prohibido = /wa\.me\/52\d|tel:\+52\d|3313422260|3338258899|3335794261|bocadelcielogdl@/;
const revisar = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return revisar(p);
    return /\.(html|js|css|txt|json)$/.test(e.name) && prohibido.test(fs.readFileSync(p, 'utf8')) ? [p] : [];
  });
const malos = revisar(raiz);
if (malos.length) {
  console.error('Contacto real encontrado en la versión publicada:', malos);
  process.exit(1);
}
for (const f of paginas.filter((f) => f !== 'index.csr.html')) {
  const t = leer(f);
  if (!t.includes('Prototipo no oficial') || !t.includes('noindex, nofollow')) {
    console.error(`${f}: falta el aviso o el noindex`);
    process.exit(1);
  }
}
console.log('Build de Pages listo y revisado.');
