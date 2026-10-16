import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

/**
 * Helper to remove white background using BFS flood-fill from edges
 */
async function makeTransparentFromWhite(inputPath, outputPath, minLum = 240) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const visited = new Uint8Array(width * height);
  const queue = new Int32Array(width * height);
  let head = 0, tail = 0;

  function isBg(idx) {
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    const a = data[idx + 3];
    if (a < 10) return true; // already transparent
    const diff = Math.max(r, g, b) - Math.min(r, g, b);
    const lum = (r + g + b) / 3;
    return diff <= 12 && lum >= minLum;
  }

  // Border seeds
  for (let x = 0; x < width; x++) {
    if (isBg(x * 4)) { visited[x] = 1; queue[tail++] = x; }
    const btm = (height - 1) * width + x;
    if (isBg(btm * 4)) { visited[btm] = 1; queue[tail++] = btm; }
  }
  for (let y = 0; y < height; y++) {
    const l = y * width;
    if (isBg(l * 4) && !visited[l]) { visited[l] = 1; queue[tail++] = l; }
    const r = y * width + (width - 1);
    if (isBg(r * 4) && !visited[r]) { visited[r] = 1; queue[tail++] = r; }
  }

  while (head < tail) {
    const pos = queue[head++];
    const x = pos % width;
    const y = Math.floor(pos / width);

    const neighbors = [
      x > 0 ? pos - 1 : -1,
      x < width - 1 ? pos + 1 : -1,
      y > 0 ? pos - width : -1,
      y < height - 1 ? pos + width : -1
    ];

    for (const n of neighbors) {
      if (n !== -1 && visited[n] === 0 && isBg(n * 4)) {
        visited[n] = 1;
        queue[tail++] = n;
      }
    }
  }

  const outData = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    const s = i * 4;
    outData[s] = data[s];
    outData[s + 1] = data[s + 1];
    outData[s + 2] = data[s + 2];
    if (visited[i] === 1) {
      outData[s + 3] = 0;
    } else {
      outData[s + 3] = data[s + 3];
    }
  }

  const trimmed = await sharp(outData, { raw: { width, height, channels: 4 } })
    .trim()
    .png()
    .toBuffer({ resolveWithObject: true });

  await sharp(trimmed.data)
    .extend({
      top: 40,
      bottom: 40,
      left: 40,
      right: 40,
      background: { r: 255, g: 255, b: 255, alpha: 0 }
    })
    .resize(1000, 1000, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(outputPath);

  console.log(`Successfully generated ${outputPath}`);
}

async function processAll() {
  const dir = 'public/products/phones';

  // 1. S26 Ultra (special handling for faint watermark movertix.com)
  console.log('Processing S26 Ultra...');
  await makeTransparentFromWhite(
    path.join(dir, 'Samsung galaxy S26 Ultra.jpg'),
    path.join(dir, 'samsung-s26-ultra.png'),
    220
  );

  // 2. S26 Plus
  console.log('Processing S26 Plus...');
  await makeTransparentFromWhite(
    path.join(dir, 'Samsung galaxy S26 Plus.jpg'),
    path.join(dir, 'samsung-s26-plus.png'),
    240
  );

  // 3. S26 Standard
  console.log('Processing S26...');
  await makeTransparentFromWhite(
    path.join(dir, 'Samsung galaxy S26.webp'),
    path.join(dir, 'samsung-s26.png'),
    240
  );

  // 4. S25 Ultra (uses the custom checkerboard removal we perfected in perfect-s25u.mjs)
  console.log('Processing S25 Ultra...');
  // It's already in public/products/phones/samsung-s25-ultra.png

  // 5. S25 Plus
  console.log('Processing S25 Plus...');
  await makeTransparentFromWhite(
    path.join(dir, 'Samsung galaxy S25 Plus.jpg'),
    path.join(dir, 'samsung-s25-plus.png'),
    240
  );

  // 6. S25 Standard
  console.log('Processing S25...');
  await makeTransparentFromWhite(
    path.join(dir, 'Samsung galaxy S25.webp'),
    path.join(dir, 'samsung-s25.png'),
    240
  );

  // 7. S24 Ultra
  console.log('Processing S24 Ultra...');
  await makeTransparentFromWhite(
    path.join(dir, 'Samsung galaxy S24 ultra.jpg'),
    path.join(dir, 'samsung-s24-ultra.png'),
    240
  );

  // Also create samsung-s24.png as fallback/standard if referenced
  fs.copyFileSync(
    path.join(dir, 'samsung-s24-ultra.png'),
    path.join(dir, 'samsung-s24.png')
  );

  console.log('ALL SAMSUNG PRODUCTS PROCESSED SUCCESSFULLY!');
}

processAll().catch(console.error);
