import { chromium } from 'playwright-core';
// Revisión funcional del build: hidratación sin errores, fotos diferidas, detalle, video y menú.
const base = process.argv[2];
const b = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
for (const [w, h] of [[390, 844], [1440, 900]]) {
  const p = await (await b.newContext({ viewport: { width: w, height: h } })).newPage();
  const errores = [];
  p.on('console', (m) => m.type() === 'error' && errores.push(m.text().slice(0, 140)));
  p.on('pageerror', (e) => errores.push(e.message.slice(0, 140)));
  await p.goto(base + '/', { waitUntil: 'networkidle' });
  const antes = await p.evaluate(() => [...document.querySelectorAll('#favoritos img')].filter((i) => i.currentSrc).length);
  await p.locator('#favoritos').scrollIntoViewIfNeeded();
  await p.waitForTimeout(2500);
  const despues = await p.evaluate(() => [...document.querySelectorAll('#favoritos img')].filter((i) => i.complete && i.naturalWidth).length);
  await p.locator('.celda-1 .tarjeta').click();
  await p.waitForTimeout(800);
  const dialogo = await p.evaluate(() => document.querySelector('dialog.detalle')?.open);
  await p.keyboard.press('Escape');
  await p.waitForTimeout(800);
  const cerrado = await p.evaluate(() => !document.querySelector('dialog.detalle')?.open);
  await p.evaluate(() => scrollTo(0, 0));
  await p.waitForTimeout(3500);
  const video = await p.evaluate(() => { const v = document.querySelector('.heroe-video'); return v ? { src: v.currentSrc.split('/').pop(), corre: !v.paused } : null; });
  const lenis = await p.evaluate(() => document.documentElement.classList.contains('lenis'));
  await p.goto(base + '/menu#tacos', { waitUntil: 'networkidle' });
  await p.waitForTimeout(1200);
  const menu = await p.evaluate(() => ({ y: Math.round(scrollY), activa: document.querySelector('.indice a.activa')?.textContent?.trim(), sw: document.documentElement.scrollWidth }));
  await p.fill('input[type=search]', 'pulpo');
  await p.waitForTimeout(300);
  const conteo = await p.evaluate(() => document.querySelector('.conteo')?.textContent?.trim());
  console.log(w, JSON.stringify({ fotosAntes: antes, fotosDespues: despues, dialogo, cerrado, video, lenis, menu, conteo, errores }));
}
await b.close();
