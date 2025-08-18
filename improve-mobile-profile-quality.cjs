const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function improveProfileQuality() {
  const originalPath = path.join(__dirname, 'public', 'profileND-backup.png');
  const mobilePngPath = path.join(__dirname, 'public', 'profileND-mobile.png');
  const mobileWebpPath = path.join(__dirname, 'public', 'profileND-mobile.webp');
  const desktopWebpPath = path.join(__dirname, 'public', 'profileND.webp');
  
  try {
    console.log('Creating high-quality mobile profile images...');
    
    // Create high-quality mobile PNG (300x300 for better quality on mobile)
    await sharp(originalPath)
      .resize(300, 300, {
        fit: 'cover',
        position: 'center',
        kernel: sharp.kernel.lanczos3 // Better quality resizing
      })
      .png({
        quality: 90, // Higher quality
        compressionLevel: 6, // Balanced compression
        adaptiveFiltering: true,
        palette: false // Keep full color
      })
      .toFile(mobilePngPath);
    
    // Create high-quality mobile WebP
    await sharp(originalPath)
      .resize(300, 300, {
        fit: 'cover',
        position: 'center',
        kernel: sharp.kernel.lanczos3
      })
      .webp({
        quality: 85, // Higher quality for WebP
        effort: 6,
        lossless: false
      })
      .toFile(mobileWebpPath);
    
    // Also improve desktop WebP quality
    await sharp(originalPath)
      .resize(500, 500, {
        fit: 'cover',
        position: 'center',
        kernel: sharp.kernel.lanczos3
      })
      .webp({
        quality: 90,
        effort: 6
      })
      .toFile(desktopWebpPath);
    
    // Check file sizes
    const mobilePngStats = await fs.stat(mobilePngPath);
    const mobileWebpStats = await fs.stat(mobileWebpPath);
    const desktopWebpStats = await fs.stat(desktopWebpPath);
    
    console.log(`✅ Mobile PNG: ${(mobilePngStats.size / 1024).toFixed(1)}KB (300x300)`);
    console.log(`✅ Mobile WebP: ${(mobileWebpStats.size / 1024).toFixed(1)}KB (300x300)`);
    console.log(`✅ Desktop WebP: ${(desktopWebpStats.size / 1024).toFixed(1)}KB (500x500)`);
    
  } catch (error) {
    console.error('Error improving profile image quality:', error);
  }
}

improveProfileQuality();