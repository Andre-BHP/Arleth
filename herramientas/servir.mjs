import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const sitio = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'sitio');
process.chdir(sitio);
const ng = spawn(process.execPath, [path.join(sitio, 'node_modules/@angular/cli/bin/ng.js'), 'serve', '--port', '4200'], { stdio: 'inherit' });
ng.on('exit', (c) => process.exit(c ?? 0));
