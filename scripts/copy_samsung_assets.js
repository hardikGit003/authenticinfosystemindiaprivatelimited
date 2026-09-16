const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\hardi\\.gemini\\antigravity-ide\\brain\\28c4e2f9-66ed-4efe-8147-61e0bb337800';
const destDir = path.join(__dirname, '..', 'public', 'products', 'phones');

const files = [
  { src: 'samsung_s26_ultra_1789553372553.jpg', dest: 'samsung-s26-ultra.jpg' },
  { src: 'samsung_s26_series_1789553440587.jpg', dest: 'samsung-s26-plus.jpg' },
  { src: 'samsung_s26_series_1789553440587.jpg', dest: 'samsung-s26.jpg' },
  { src: 'samsung_s25_ultra_1789553396146.jpg', dest: 'samsung-s25-ultra.jpg' },
  { src: 'samsung_s25_plus_1789553418634.jpg', dest: 'samsung-s25-plus.jpg' },
  { src: 'samsung_s25_plus_1789553418634.jpg', dest: 'samsung-s25.jpg' },
];

files.forEach(({ src, dest }) => {
  const srcPath = path.join(srcDir, src);
  const destPath = path.join(destDir, dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${src} -> ${dest}`);
  } else {
    console.error(`Missing: ${srcPath}`);
  }
});
