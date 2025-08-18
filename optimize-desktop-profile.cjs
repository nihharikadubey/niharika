const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;

async function optimizeDesktopProfile() {
  const originalPath = path.join(__dirname, 'public', 'profileND-backup.png');
  const desktopPngPath = path.join(__dirname, 'public', 'profileND.png');
  const desktopWebpPath = path.join(__dirname, 'public', 'profileND.webp');
  
  try {
    console.log('Optimizing desktop profile images...');
    
    // Create optimized desktop PNG (320x320 - actual display size)
    await sharp(originalPath)
      .resize(320, 320, {
        fit: 'cover',
        position: 'center',
        kernel: sharp.kernel.lanczos3
      })
      .png({
        quality: 90,
        compressionLevel: 8,
        adaptiveFiltering: true
      })
      .toFile(desktopPngPath);
    
    // Create optimized desktop WebP
    await sharp(originalPath)
      .resize(320, 320, {
        fit: 'cover',
        position: 'center',
        kernel: sharp.kernel.lanczos3
      })
      .webp({
        quality: 85,
        effort: 6,
        smartSubsample: true
      })
      .toFile(desktopWebpPath);
    
    // Check file sizes
    const pngStats = await fs.stat(desktopPngPath);
    const webpStats = await fs.stat(desktopWebpPath);
    
    console.log(`✅ Desktop PNG: ${(pngStats.size / 1024).toFixed(1)}KB (320x320)`);
    console.log(`✅ Desktop WebP: ${(webpStats.size / 1024).toFixed(1)}KB (320x320)`);
    
  } catch (error) {
    console.error('Error optimizing desktop images:', error);
  }
}

optimizeDesktopProfile();