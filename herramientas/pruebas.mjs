// Pruebas de extremo a extremo del prototipo (Edge + playwright-core).
// Uso: node pruebas.mjs <url versión local> <url versión demo, con /Arleth/>
import { chromium } from 'playwright-core';

const [local, demo] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
let fallas = 0;
const ok = (cond, texto) => { console.log(`${cond ? 'OK   ' : 'FALLA'} ${texto}`); if (!cond) fallas++; };

async function pagina(base, ancho) {
  const ctx = await b.newContext({ viewport: { width: ancho, height: 900 } });
  const p = await ctx.newPage();
  const errores = [];
  p.on('pageerror', (e) => errores.push(e.message));
  p.on('console', (m) => m.type() === 'error' && errores.push(m.text()));
  p.on('response', (r) => r.status() >= 400 && errores.push(`${r.status()} ${r.url()}`));
  // Captura lo que se abriría en WhatsApp sin abrir nada.
  await p.addInitScript(() => { window.__abiertos = []; window.open = (u) => { window.__abiertos.push(String(u)); return null; }; });
  return { ctx, p, errores };
}

// ───────── Versión local (números reales): flujo completo del pedido ─────────
{
  const { ctx, p, errores } = await pagina(local, 390);
  await p.goto(local + '/', { waitUntil: 'networkidle' });
  await p.evaluate(() => localStorage.clear());
  await p.reload({ waitUntil: 'networkidle' });

  await p.getByRole('button', { name: 'Pedir este aguachile' }).click();
  const hoja = p.locator('app-agregar dialog');
  await hoja.waitFor({ state: 'visible' });
  ok(await hoja.evaluate((d) => d.open), 'La hoja de agregar se abre desde el héroe');
  await hoja.getByText('Orden', { exact: true }).click();
  await hoja.getByRole('button', { name: 'Uno más' }).click();
  await hoja.locator('textarea').fill('sin cebolla');
  await hoja.getByRole('button', { name: /Agregar al pedido/ }).click();
  await p.waitForTimeout(300);
  ok(!(await hoja.evaluate((d) => d.open)), 'La hoja se cierra al agregar');
  ok((await p.evaluate(() => document.activeElement?.textContent?.trim())) === 'Pedir este aguachile', 'El foco vuelve al botón que abrió la hoja');
  ok((await p.locator('app-barra-movil .cuenta').innerText()).startsWith('2'), 'La barra de abajo cuenta 2 productos');
  ok(/Agregado: 2 × Aguachile negro de camarón \(Orden\)/.test(await p.locator('app-pedido [aria-live]').innerText()), 'El cambio se anuncia con aria-live');

  await p.goto(local + '/menu', { waitUntil: 'networkidle' });
  await p.getByRole('button', { name: 'Agregar Tripita de calamar al pedido' }).click();
  await hoja.waitFor({ state: 'visible' });
  await hoja.getByRole('button', { name: /Agregar al pedido/ }).click();
  await p.waitForTimeout(300);

  await p.locator('app-barra-movil button').click();
  const panel = p.locator('app-pedido dialog');
  await panel.waitFor({ state: 'visible' });
  ok((await panel.locator('.lineas li').count()) === 2, 'El pedido tiene 2 líneas');
  ok((await panel.locator('.total .dato').innerText()) === '$462', 'Total aproximado $462 (2 × $210 + $42)');

  await panel.getByRole('button', { name: 'Enviar pedido por WhatsApp' }).click();
  await p.waitForTimeout(200);
  ok((await panel.locator('.error').count()) >= 1, 'Sin nombre muestra el error');
  ok((await p.evaluate(() => document.activeElement?.getAttribute('autocomplete'))) === 'name', 'El foco va al campo con error');
  await panel.locator('input[autocomplete=name]').fill('André');
  await panel.getByText('A domicilio', { exact: true }).click();
  await panel.locator('input[autocomplete=street-address]').fill('Av. Chapultepec 100');
  await panel.locator('input[type=time]').fill('14:30');
  await panel.getByRole('button', { name: 'Enviar pedido por WhatsApp' }).click();
  await p.waitForTimeout(200);
  const abiertos = await p.evaluate(() => window.__abiertos);
  const url = abiertos[0] ?? '';
  ok(url.startsWith('https://wa.me/523313422260?text='), 'Se arma el enlace al WhatsApp de la sucursal');
  const texto = decodeURIComponent(url.split('text=')[1] ?? '');
  ok(texto.includes('2 × Aguachile negro de camarón (Orden) — $420') && texto.includes('Nota: sin cebolla'), 'El mensaje lleva cantidad, tamaño, importe y nota');
  ok(texto.includes('Total aproximado: $462') && texto.includes('A domicilio: Av. Chapultepec 100') && texto.includes('Nombre: André') && texto.includes('Hora deseada: 14:30'), 'El mensaje lleva total, entrega, nombre y hora');
  console.log('\n--- Mensaje generado ---\n' + texto + '\n------------------------\n');

  await p.keyboard.press('Escape');
  await p.waitForTimeout(300);
  ok((await p.evaluate(() => document.activeElement?.closest('app-barra-movil') !== null)), 'Al cerrar el pedido el foco vuelve a la barra');
  await p.reload({ waitUntil: 'networkidle' });
  ok((await p.locator('app-barra-movil .cuenta').innerText()).startsWith('3'), 'El pedido se conserva al recargar (localStorage)');
  ok(errores.length === 0, `Sin errores en consola ni recursos rotos (versión local)${errores.length ? ': ' + errores.join(' | ') : ''}`);
  await ctx.close();
}

// ───────── Transición del detalle (View Transitions) ─────────
{
  const { ctx, p } = await pagina(local, 1440);
  await p.goto(local + '/', { waitUntil: 'networkidle' });
  await p.locator('#favoritos').scrollIntoViewIfNeeded();
  await p.waitForTimeout(1200);
  await p.evaluate(() => {
    window.__vt = false;
    const original = document.startViewTransition?.bind(document);
    if (original) document.startViewTransition = (cb) => { window.__vt = true; return original(cb); };
  });
  await p.locator('.celda-1 .tarjeta').click();
  await p.waitForTimeout(80);
  const animando = await p.evaluate(() => document.getAnimations().some((a) => String(a.effect?.pseudoElement ?? '').includes('view-transition')));
  await p.waitForTimeout(700);
  ok(await p.evaluate(() => window.__vt), 'El detalle usa View Transitions');
  ok(animando, 'La transición compartida del plato se anima');
  ok(await p.evaluate(() => document.querySelector('dialog.detalle')?.open), 'El detalle queda abierto');
  await p.getByRole('button', { name: 'Pedir este', exact: true }).click();
  await p.waitForTimeout(400);
  ok(await p.evaluate(() => document.querySelector('app-agregar dialog')?.open), '"Pedir este" del detalle abre la hoja de agregar');
  await ctx.close();
}

// ───────── Versión publicada (demo) bajo /Arleth/ ─────────
for (const ancho of [375, 1440]) {
  const { ctx, p, errores } = await pagina(demo, ancho);
  for (const ruta of ['', 'menu']) {
    await p.goto(demo + ruta, { waitUntil: 'networkidle' });
    ok((await p.locator('.aviso-demo').innerText()).includes('Prototipo no oficial'), `${ancho}px /${ruta}: aviso fijo visible`);
    ok(await p.locator('.aviso-demo').isVisible(), `${ancho}px /${ruta}: el aviso se ve`);
    ok((await p.locator('meta[name=robots]').getAttribute('content')) === 'noindex, nofollow', `${ancho}px /${ruta}: noindex, nofollow`);
    ok((await p.locator('a[href^="tel:"], a[href*="wa.me"], a[href^="mailto:"]').count()) === 0, `${ancho}px /${ruta}: sin enlaces tel:, wa.me ni mailto:`);
    ok((await p.locator('script[type="application/ld+json"]').count()) === 0, `${ancho}px /${ruta}: sin JSON-LD`);
  }
  await p.goto(demo, { waitUntil: 'networkidle' });
  await p.getByRole('button', { name: 'Pedir este aguachile' }).click();
  await p.locator('app-agregar dialog').getByRole('button', { name: /Agregar al pedido/ }).click();
  await p.waitForTimeout(300);
  await p.locator(ancho < 960 ? 'app-barra-movil button' : 'app-cabecera button.pedir').click();
  const panel = p.locator('app-pedido dialog');
  await panel.locator('input[autocomplete=name]').fill('Prueba');
  await panel.getByRole('button', { name: 'Ver el mensaje del pedido' }).click();
  await p.waitForTimeout(400);
  const aviso = p.locator('app-aviso-demo dialog');
  ok(await aviso.evaluate((d) => d.open), `${ancho}px: el pedido muestra el aviso de demostración`);
  ok((await aviso.locator('.mensaje').innerText()).includes('Aguachile negro de camarón'), `${ancho}px: el aviso enseña el mensaje que llegaría`);
  ok((await p.evaluate(() => window.__abiertos.length)) === 0, `${ancho}px: no se abrió WhatsApp`);
  await aviso.getByRole('button', { name: 'Entendido' }).click();
  await p.keyboard.press('Escape');
  await p.locator('#sucursal').scrollIntoViewIfNeeded();
  await p.waitForTimeout(800);
  await p.getByRole('link', { name: 'Llamar' }).click();
  await p.waitForTimeout(300);
  ok(await aviso.evaluate((d) => d.open), `${ancho}px: "Llamar" muestra el aviso y no marca`);
  ok(p.url().startsWith(demo), `${ancho}px: sigue en el sitio tras "Llamar"`);
  ok(errores.length === 0, `${ancho}px: sin errores ni recursos rotos en la demo${errores.length ? ': ' + errores.join(' | ') : ''}`);
  await ctx.close();
}

await b.close();
console.log(fallas ? `\n${fallas} falla(s)` : '\nTodo en orden');
process.exit(fallas ? 1 : 0);
