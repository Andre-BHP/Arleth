import sharp from 'sharp';
// Agrega la medida de 720 px (celulares con pantalla densa) y aligera los recortes con transparencia.
const fuente = 'fuentes-fotos';
const fotos = {
  'aguachile-negro': ['foto-36acbce9c2e340c89fa4131d2de648f3.jpg', { left: 260, top: 175, width: 2130, height: 1420 }],
  'atun-fresco': ['foto-b2db57fdc7b14896bbb746f97e4432f6.jpg', { left: 420, top: 300, width: 1950, height: 1300 }],
  'carnitas-atun': ['foto-13706c5ce4314cce84bf9efc3486622c.jpg'],
  'tortuga-mesa': ['foto-481cf5ebdf9f446b9e596e0eebb6a14b.jpg'],
  tiradito: ['foto-8c6a1d97b87042fa80088911cb075d9a.jpg'],
  'ceviche-cielo': ['foto-8ffb21fd9a7c4b46bb732e80ea55c81a.jpg'],
  tortuga: ['foto-a6d5f8555f62429291564024c9b82ff8.jpg'],
  'taco-casa': ['foto-d3a97fc3a21b46ceab40587f15908a36.jpg'],
  'pulpo-brasas-recorte': ['pulpo-brasas.png'],
  'taco-calamar-recorte': ['taco-calamar.png'],
  'tortuga-recorte': ['tortuga.png'],
  'tostada-pulpo-recorte': ['tostada-pulpo.png'],
};
for (const [nombre, [archivo, caja]] of Object.entries(fotos)) {
  const recorte = nombre.endsWith('recorte');
  let base = sharp(`${fuente}/${archivo}`);
  base = caja ? base.extract(caja) : base.trim({ threshold: 1 });
  const anchos = recorte ? [480, 720, 960, 1600] : [720];
  for (const w of anchos) {
    const r = base.clone().resize({ width: w, withoutEnlargement: true });
    await r.clone().avif({ quality: recorte ? 42 : 48, effort: 6 }).toFile(`public/fotos/${nombre}-${w}.avif`);
    await r.clone().webp({ quality: recorte ? 72 : 76 }).toFile(`public/fotos/${nombre}-${w}.webp`);
  }
  console.log(nombre);
}
