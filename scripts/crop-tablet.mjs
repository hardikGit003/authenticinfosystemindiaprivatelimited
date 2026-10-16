import sharp from 'sharp';
import path from 'path';

const inputPath = 'C:\\Users\\hardi\\.gemini\\antigravity-ide\\brain\\835a12b4-9e58-49a0-bb37-aea6fd7bc9a3\\lenovo_tablet_modal_1792131125871.png';
const outputPath = path.resolve('public/products/accessories/lenovo-k11-tablet.png');

async function createCrispTablet() {
  const tabletBuffer = await sharp(inputPath)
    .extract({ left: 490, top: 306, width: 535, height: 339 })
    .toBuffer();

  await sharp({
    create: {
      width: 600,
      height: 600,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  })
  .composite([
    {
      input: tabletBuffer,
      gravity: 'centre'
    }
  ])
  .png()
  .toFile(outputPath);

  console.log('Successfully generated public/products/accessories/lenovo-k11-tablet.png');
}

createCrispTablet().catch(console.error);
