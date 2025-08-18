const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function createHighQualityMobile() {
  const originalPath = path.join(__dirname, 'public', 'profileND-backup.png');
  const mobilePngPath = path.join(__dirname, 'public', 'profileND-mobile.png');
  const mobileWebpPath = path.join(__dirname, 'public', 'profileND-mobile.webp');
  
  try {
    console.log('Creating high-quality mobile profile images...');
    
    // Create high-res mobile PNG (400x400 for retina displays)
    await sharp(originalPath)
      .resize(400, 400, {
        fit: 'cover',
        position: 'center',
        kernel: sharp.kernel.lanczos3, // Best quality algorithm
        withoutEnlargement: false
      })
      .png({
        quality: 100, // Maximum quality
        compressionLevel: 6, // Moderate compression
        adaptiveFiltering: false, // Better for photos
        palette: false // Full color depth
      })
      .toFile(mobilePngPath);
    
    // Create high-quality mobile WebP
    await sharp(originalPath)
      .resize(400, 400, {
        fit: 'cover',
        position: 'center',
        kernel: sharp.kernel.lanczos3,
        withoutEnlargement: false
      })
      .webp({
        quality: 95, // Very high quality for WebP
        effort: 6,
        lossless: false,
        nearLossless: true, // Near-lossless compression
        smartSubsample: false // Better for quality
      })
      .toFile(mobileWebpPath);
    
    // Check file sizes
    const mobilePngStats = await fs.stat(mobilePngPath);
    const mobileWebpStats = await fs.stat(mobileWebpPath);
    
    console.log(`✅ Mobile PNG: ${(mobilePngStats.size / 1024).toFixed(1)}KB (400x400, quality 100)`);
    console.log(`✅ Mobile WebP: ${(mobileWebpStats.size / 1024).toFixed(1)}KB (400x400, quality 95)`);
    
    console.log('\nImages created with maximum quality for retina displays.');
    
  } catch (error) {
    console.error('Error creating high-quality mobile images:', error);
  }
}

createHighQualityMobile();