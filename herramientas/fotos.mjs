import sharp from 'sharp'; import fs from 'node:fs'; import path from 'node:path';
const [src, out] = process.argv.slice(2);
const mapa = { '36acbce9c2e340c89fa4131d2de648f3':'aguachile-negro','13706c5ce4314cce84bf9efc3486622c':'carnitas-atun','481cf5ebdf9f446b9e596e0eebb6a14b':'tortuga-mesa','8c6a1d97b87042fa80088911cb075d9a':'tiradito','8ffb21fd9a7c4b46bb732e80ea55c81a':'ceviche-cielo','a6d5f8555f62429291564024c9b82ff8':'tortuga','b2db57fdc7b14896bbb746f97e4432f6':'atun-fresco','d3a97fc3a21b46ceab40587f15908a36':'taco-casa' };
fs.mkdirSync(out,{recursive:true});
for (const f of fs.readdirSync(src)) {
  let nombre = f.replace(/\.(jpg|png)$/,''); const recorte = f.endsWith('.png');
  const m = nombre.match(/^foto-(\w+)$/); if (m) nombre = mapa[m[1]];
  if (recorte) nombre += '-recorte';
  if (f==='logo.png') nombre='logo';
  const anchos = f==='logo.png' ? [256,512] : [480,960,1600];
  for (const w of anchos) {
    const base = sharp(path.join(src,f)).trim({threshold:1}).resize({width:w, withoutEnlargement:true});
    await base.clone().avif({quality: recorte?55:50, effort:5}).toFile(path.join(out,`${nombre}-${w}.avif`));
    await base.clone().webp({quality:78}).toFile(path.join(out,`${nombre}-${w}.webp`));
  }
  const meta = await sharp(path.join(src,f)).trim({threshold:1}).toBuffer({resolveWithObject:true});
  console.log(nombre, meta.info.width+'x'+meta.info.height);
}
