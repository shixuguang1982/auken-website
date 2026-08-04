const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const assetsDir = path.join(__dirname, 'assets');
const files = [
  'QT4_25_automatic_concrete_bloc_2026-08-03T22-16-34.png',
  'Heavy_duty_wood_chipper_shredd_2026-08-03T22-16-34.png',
  'Industrial_double_shaft_metal__2026-08-03T22-16-34.png',
  'Modern_heavy_machinery_manufac_2026-08-03T22-16-34.png'
];

async function convert() {
  for (const file of files) {
    const input = path.join(assetsDir, file);
    const output = path.join(assetsDir, file.replace('.png', '.webp'));
    try {
      const info = await sharp(input)
        .resize(1400, 800, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(output);
      const origSize = (fs.statSync(input).size / 1024).toFixed(0);
      const newSize = (info.size / 1024).toFixed(0);
      console.log(`${file}: ${origSize}KB → ${newSize}KB`);
    } catch (err) {
      console.error(`Error converting ${file}:`, err.message);
    }
  }
}

convert();
