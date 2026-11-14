import { chromium } from 'playwright-core';
const [base, salida] = process.argv.slice(2);
const navegador = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
const casos = [
  ['desktop', '/', 1440, 900], ['mobile', '/', 390, 844],
  ['menu-desktop', '/menu', 1440, 900], ['menu-mobile', '/menu', 390, 844],
];
const TRAMO = 8000; // Chromium no captura más de ~16 000 px de un solo golpe.
for (const [nombre, ruta, w, h] of casos) {
  const ctx = await navegador.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce', deviceScaleFactor: 1 });
  const p = await ctx.newPage();
  await p.goto(base + ruta, { waitUntil: 'networkidle' });
  // content-visibility deja en blanco lo que está fuera de pantalla en una captura de página completa.
  await p.addStyleTag({ content: '* { content-visibility: visible !important; }' });
  await p.evaluate(async () => {
    document.querySelectorAll('img[loading=lazy]').forEach((i) => (i.loading = 'eager'));
    for (let y = 0; y < document.documentElement.scrollHeight; y += 600) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
    await Promise.all([...document.images].map((i) => i.decode().catch(() => {})));
    scrollTo(0, 0);
  });
  await p.waitForTimeout(600);
  const datos = await p.evaluate(() => ({ alto: document.documentElement.scrollHeight, sw: document.documentElement.scrollWidth, sinCargar: [...document.images].filter((i) => !i.complete || !i.naturalWidth).length }));
  if (datos.alto <= TRAMO * 2 - 400) {
    await p.screenshot({ path: `${salida}/${nombre}.png`, fullPage: true });
  } else {
    for (let i = 0, y = 0; y < datos.alto; i++, y += TRAMO) {
      await p.screenshot({ path: `${salida}/${nombre}-${i + 1}.png`, fullPage: true, clip: { x: 0, y, width: w, height: Math.min(TRAMO, datos.alto - y) } });
    }
  }
  console.log(nombre, JSON.stringify(datos));
  await ctx.close();
}
await navegador.close();
