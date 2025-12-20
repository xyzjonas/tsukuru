// scripts/prepare-build.js
import { rm, rename } from 'fs/promises';

// const STATIC_BUILD = process.env.STATIC_BUILD === 'true';

// if (STATIC_BUILD) {
console.log('Removing preview routes for static build...');
await rm('src/routes/api', { recursive: true, force: true });
await rm('src/routes/slice-simulator', { recursive: true, force: true });
await rm('src/routes/[[preview=preview]]', { recursive: true, force: true });
await rename('src/-page.server.ts', 'src/+page.server.ts');
console.log('Preview routes removed.');
// }
