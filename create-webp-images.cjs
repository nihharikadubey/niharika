const sharp = require('sharp');
const path = require('path');

async function createWebPImages() {
  const images = [
    { input: 'profileND.png', output: 'profileND.webp', size: 400 },
    { input: 'profileND-mobile.png', output: 'profileND-mobile.webp', size: 200 }
  ];
  
  for (const img of images) {
    const inputPath = path.join(__dirname, 'public', img.input);
    const outputPath = path.join(__dirname, 'public', img.output);
    
    try {
      await sharp(inputPath)
        .resize(img.size, img.size, {
          fit: 'cover',
          position: 'center'
        })
        .webp({
          quality: 80,
          effort: 6
        })
        .toFile(outputPath);
      
      console.log(`✅ Created ${img.output}`);
    } catch (error) {
      console.error(`Error creating ${img.output}:`, error);
    }
  }
}

createWebPImages();