import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const assetsDir = 'e:/React Projects/kore-360-react/kore-360-react/src/assets';

const files = [
  'main-hero-background.png',
  'cricket-ground.png',
  'desktop-cricket-image.jpg',
  'sports_marketing.jpg',
  'event_ops.jpg',
  'athlete_management.jpg',
  'team_operations.jpg',
  'brand1.jpg', 'brand2.jpg', 'brand3.jpg', 'brand4.jpg', 'brand5.jpg', 
  'brand6.jpg', 'brand7.jpg', 'brand8.jpg', 'brand9.jpg', 'brand10.jpg', 'brand11.jpg',
  'logo.png'
];

async function optimize() {
  for (const file of files) {
    const filePath = path.join(assetsDir, file);
    if (!fs.existsSync(filePath)) {
      console.log(`Skipping ${file} - not found`);
      continue;
    }
    
    const ext = path.extname(file).toLowerCase();
    
    try {
      console.log(`Optimizing ${file}...`);
      let pipeline = sharp(filePath);
      
      // Resize brand logos if they are too big
      if (file.startsWith('brand') || file === 'logo.png') {
        pipeline = pipeline.resize({ width: 300, withoutEnlargement: true });
      } else if (file === 'sports_marketing.jpg' || file === 'event_ops.jpg' || file === 'athlete_management.jpg' || file === 'team_operations.jpg') {
        pipeline = pipeline.resize({ width: 800, withoutEnlargement: true });
      } else if (file === 'main-hero-background.png') {
         // Keep high res but compress heavily
         pipeline = pipeline.resize({ width: 1920, withoutEnlargement: true });
      }
      
      const buffer = await pipeline.toBuffer();
      
      // Output as same format to preserve file extension references, but with heavy compression
      if (ext === '.png') {
        await sharp(buffer).png({ quality: 70, compressionLevel: 9 }).toFile(filePath + '.tmp');
      } else {
        await sharp(buffer).jpeg({ quality: 70 }).toFile(filePath + '.tmp');
      }
      
      fs.renameSync(filePath + '.tmp', filePath);
      console.log(`Successfully compressed ${file}`);
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }
}

optimize();
