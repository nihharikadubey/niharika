const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeProjectImages() {
  const imagesDir = path.join(__dirname, 'public', 'images');
  
  // List of images to optimize with their display sizes from PageSpeed
  const images = [
    { name: 'kube.png', displayWidth: 326, displayHeight: 186 },
    { name: 'wanderlust.png', displayWidth: 326, displayHeight: 227 },
    { name: 'TODO.png', displayWidth: 326, displayHeight: 326 },
    { name: 'aicontentgenerator.png', displayWidth: 326, displayHeight: 200 },
    { name: 'scrumpoker.png', displayWidth: 326, displayHeight: 200 },
    { name: 'socialmediaresizer.png', displayWidth: 326, displayHeight: 200 },
  ];
  
  for (const img of images) {
    const inputPath = path.join(imagesDir, img.name);
    const outputWebpPath = path.join(imagesDir, img.name.replace('.png', '.webp'));
    const outputJpegPath = path.join(imagesDir, img.name.replace('.png', '.jpg'));
    
    try {
      // Check if file exists
      await fs.access(inputPath);
      
      // Create WebP version (best compression)
      await sharp(inputPath)
        .resize(img.displayWidth * 2, img.displayHeight * 2, { // 2x for retina
          fit: 'cover',
          position: 'center',
          kernel: sharp.kernel.lanczos3
        })
        .webp({
          quality: 85,
          effort: 6
        })
        .toFile(outputWebpPath);
      
      // Create optimized JPEG version
      await sharp(inputPath)
        .resize(img.displayWidth * 2, img.displayHeight * 2, { // 2x for retina
          fit: 'cover',
          position: 'center',
          kernel: sharp.kernel.lanczos3
        })
        .jpeg({
          quality: 85,
          mozjpeg: true,
          progressive: true
        })
        .toFile(outputJpegPath);
      
      // Optimize the PNG version too
      await sharp(inputPath)
        .resize(img.displayWidth * 2, img.displayHeight * 2, { // 2x for retina
          fit: 'cover',
          position: 'center',
          kernel: sharp.kernel.lanczos3
        })
        .png({
          quality: 90,
          compressionLevel: 9,
          effort: 10
        })
        .toFile(inputPath + '.tmp');
      
      // Replace original with optimized
      await fs.rename(inputPath + '.tmp', inputPath);
      
      // Get file sizes
      const pngStats = await fs.stat(inputPath);
      const webpStats = await fs.stat(outputWebpPath);
      const jpegStats = await fs.stat(outputJpegPath);
      
      console.log(`✅ ${img.name}:`);
      console.log(`   PNG: ${(pngStats.size / 1024).toFixed(1)}KB`);
      console.log(`   JPEG: ${(jpegStats.size / 1024).toFixed(1)}KB`);
      console.log(`   WebP: ${(webpStats.size / 1024).toFixed(1)}KB`);
      
    } catch (error) {
      console.log(`⚠️  Skipping ${img.name}: ${error.message}`);
    }
  }
}

optimizeProjectImages();