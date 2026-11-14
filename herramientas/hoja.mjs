import sharp from 'sharp'; import fs from 'node:fs'; import path from 'node:path';
const dir = process.argv[2], out = process.argv[3];
const files = fs.readdirSync(dir).filter(f=>/\.(jpg|png)$/.test(f) && f!=='logo.png');
const W=480,H=320, cols=4, rows=Math.ceil(files.length/cols);
const tiles = await Promise.all(files.map(async (f,i)=>({input: await sharp(path.join(dir,f)).resize(W,H,{fit:'cover'}).composite([{input:Buffer.from(`<svg width="${W}" height="${H}"><rect y="0" width="${W}" height="28" fill="black"/><text x="6" y="20" font-size="16" fill="white">${i} ${f.slice(0,22)}</text></svg>`)}]).toBuffer(), left:(i%cols)*W, top:Math.floor(i/cols)*H})));
await sharp({create:{width:W*cols,height:H*rows,channels:3,background:'#fff'}}).composite(tiles).jpeg({quality:80}).toFile(out);
console.log(files.map((f,i)=>i+' '+f).join('\n'));
