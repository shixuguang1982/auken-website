const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const assetsDir = path.join(__dirname, 'assets');
const files = [
  'Industrial_automatic_brick_mak_2026-08-03T22-16-03.png',
  'Industrial_wood_chipper_crushe_2026-08-03T22-16-03.png',
  'Industrial_metal_shredder_mach_2026-08-03T22-16-03.png'
];

async function convert() {
  for (const file of files) {
    const input = path.join(assetsDir, file);
    const output = path.join(assetsDir, file.replace('.png', '.webp'));
    try {
      const info = await sharp(input)
        .resize(1400, 800, { fit: 'cover', position: 'center' })
        .webp({ quality: 80 })
        .toFile(output);
      const origSize = (fs.statSync(input).size / 1024).toFixed(0);
      const newSize = (info.size / 1024).toFixed(0);
      console.log(`${file}: ${origSize}KB → ${newSize}KB (WebP)`);
    } catch (err) {
      console.error(`Error converting ${file}:`, err.message);
    }
  }
}

convert();
