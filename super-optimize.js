import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const assetsDir = 'e:/React Projects/kore-360-react/kore-360-react/src/assets';

const files = [
  'brand8.webp'
];

async function superOptimize() {
  for (const file of files) {
    const filePath = path.join(assetsDir, file);
    if (!fs.existsSync(filePath)) {
      console.log(`Skipping ${file} - not found`);
      continue;
    }
    
    const ext = path.extname(file);
    const basename = path.basename(file, ext);
    const targetFile = path.join(assetsDir, `${basename}.webp`);
    
    try {
      console.log(`Super Optimizing ${file}...`);
      let pipeline = sharp(filePath);
      
      if (file.startsWith('brand')) {
        pipeline = pipeline.resize({ width: 150, withoutEnlargement: true });
      } else if (file === 'main-hero-background.png') {
        pipeline = pipeline.resize({ width: 1440, withoutEnlargement: true });
      } else if (file === 'cricket-ground.png') {
        pipeline = pipeline.resize({ width: 800, withoutEnlargement: true });
      } else if (file === 'desktop-cricket-image.jpg') {
        pipeline = pipeline.resize({ width: 1024, withoutEnlargement: true });
      }
      
      const tempTargetFile = targetFile + '.tmp';
      
      await pipeline.webp({ quality: 60, effort: 6 }).toFile(tempTargetFile);
      fs.renameSync(tempTargetFile, targetFile);
      
      console.log(`Created ${targetFile}`);
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }
}

superOptimize();
