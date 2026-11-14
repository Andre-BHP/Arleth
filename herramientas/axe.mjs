import { chromium } from 'playwright-core';
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire(process.cwd() + '/');
const axe = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const base = process.argv[2];
const b = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
for (const [ruta, w] of [['/', 1440], ['/', 390], ['/menu', 1440], ['/menu', 390]]) {
  const p = await (await b.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' })).newPage();
  await p.goto(base + ruta, { waitUntil: 'networkidle' });
  await p.addScriptTag({ content: axe });
  const r = await p.evaluate(async () => (await axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'] })).violations.map(v => `${v.impact} ${v.id} (${v.nodes.length}): ${v.nodes.slice(0, 3).map(n => n.target.join(' ')).join(' | ')}`));
  console.log(ruta, w, r.length ? '\n  ' + r.join('\n  ') : 'sin violaciones');
}
await b.close();
