import fs from 'fs';
import sharp from 'sharp';

const files = ['brand8-optimized.webp', 'brand9.webp', 'brand10.webp', 'brand11.webp'];

async function run() {
  for (const f of files) {
    try {
      const target = f.replace('.webp', '-tiny.webp').replace('-optimized', '');
      await sharp(`src/assets/${f}`)
        .resize({ width: 100, withoutEnlargement: true })
        .webp({ quality: 60, effort: 6 })
        .toFile(`src/assets/${target}`);
      console.log('done ' + target);
    } catch(e) {
      console.log(e);
    }
  }
}
run();
