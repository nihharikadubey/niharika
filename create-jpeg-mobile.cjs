const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function createJpegMobile() {
  const originalPath = path.join(__dirname, 'public', 'profileND-backup.png');
  const mobileJpegPath = path.join(__dirname, 'public', 'profileND-mobile.jpg');
  const mobilePngPath = path.join(__dirname, 'public', 'profileND-mobile.png');
  const mobileWebpPath = path.join(__dirname, 'public', 'profileND-mobile.webp');
  
  try {
    console.log('Creating optimized mobile profile images...');
    
    // Create high-quality JPEG (better for photos)
    await sharp(originalPath)
      .resize(384, 384, { // 2x size for retina (192px display * 2)
        fit: 'cover',
        position: 'center',
        kernel: sharp.kernel.lanczos3
      })
      .jpeg({
        quality: 92,
        mozjpeg: true, // Use mozjpeg encoder for better quality
        chromaSubsampling: '4:4:4' // Best color quality
      })
      .toFile(mobileJpegPath);
    
    // Keep PNG as fallback with reasonable quality
    await sharp(originalPath)
      .resize(384, 384, {
        fit: 'cover',
        position: 'center',
        kernel: sharp.kernel.lanczos3
      })
      .png({
        quality: 95,
        compressionLevel: 7
      })
      .toFile(mobilePngPath);
    
    // Create high-quality WebP
    await sharp(originalPath)
      .resize(384, 384, {
        fit: 'cover',
        position: 'center',
        kernel: sharp.kernel.lanczos3
      })
      .webp({
        quality: 90,
        effort: 6,
        smartSubsample: false
      })
      .toFile(mobileWebpPath);
    
    // Check file sizes
    const mobileJpegStats = await fs.stat(mobileJpegPath);
    const mobilePngStats = await fs.stat(mobilePngPath);
    const mobileWebpStats = await fs.stat(mobileWebpPath);
    
    console.log(`✅ Mobile JPEG: ${(mobileJpegStats.size / 1024).toFixed(1)}KB (384x384, quality 92)`);
    console.log(`✅ Mobile PNG: ${(mobilePngStats.size / 1024).toFixed(1)}KB (384x384, quality 95)`);
    console.log(`✅ Mobile WebP: ${(mobileWebpStats.size / 1024).toFixed(1)}KB (384x384, quality 90)`);
    
  } catch (error) {
    console.error('Error creating mobile images:', error);
  }
}

createJpegMobile();