const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeMobileProfile() {
  const inputPath = path.join(__dirname, 'public', 'profileND-mobile.png');
  const outputPath = path.join(__dirname, 'public', 'profileND-mobile-optimized.png');
  
  try {
    // Further compress the mobile profile image
    await sharp(inputPath)
      .resize(200, 200, { // Smaller size for mobile
        fit: 'cover',
        position: 'center'
      })
      .png({
        quality: 75, // Lower quality for smaller size
        compressionLevel: 9,
        effort: 10
      })
      .toFile(outputPath);
    
    // Replace original with optimized version
    await fs.unlink(inputPath);
    await fs.rename(outputPath, inputPath);
    
    const stats = await fs.stat(inputPath);
    console.log(`✅ Mobile profile image optimized: ${(stats.size / 1024).toFixed(1)}KB`);
    
  } catch (error) {
    console.error('Error optimizing mobile profile image:', error);
  }
}

optimizeMobileProfile();