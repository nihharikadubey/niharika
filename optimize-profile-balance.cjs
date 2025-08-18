const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeProfileBalance() {
  const originalPath = path.join(__dirname, 'public', 'profileND-backup.png');
  const mobilePngPath = path.join(__dirname, 'public', 'profileND-mobile.png');
  const mobileWebpPath = path.join(__dirname, 'public', 'profileND-mobile.webp');
  
  try {
    console.log('Creating balanced quality mobile profile images...');
    
    // Create mobile PNG with better balance of quality and size (250x250)
    await sharp(originalPath)
      .resize(250, 250, {
        fit: 'cover',
        position: 'center',
        kernel: sharp.kernel.cubic // Good quality with smaller file
      })
      .png({
        quality: 85,
        compressionLevel: 8, // Higher compression
        adaptiveFiltering: true
      })
      .toFile(mobilePngPath);
    
    // Create mobile WebP with good quality
    await sharp(originalPath)
      .resize(250, 250, {
        fit: 'cover',
        position: 'center',
        kernel: sharp.kernel.cubic
      })
      .webp({
        quality: 82, // Good quality for WebP
        effort: 6,
        smartSubsample: true
      })
      .toFile(mobileWebpPath);
    
    // Check file sizes
    const mobilePngStats = await fs.stat(mobilePngPath);
    const mobileWebpStats = await fs.stat(mobileWebpPath);
    
    console.log(`✅ Mobile PNG: ${(mobilePngStats.size / 1024).toFixed(1)}KB (250x250, quality 85)`);
    console.log(`✅ Mobile WebP: ${(mobileWebpStats.size / 1024).toFixed(1)}KB (250x250, quality 82)`);
    
  } catch (error) {
    console.error('Error optimizing profile images:', error);
  }
}

optimizeProfileBalance();