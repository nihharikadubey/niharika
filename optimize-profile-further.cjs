const sharp = require('sharp');
const fs = require('fs').promises;

async function optimizeProfile() {
  try {
    console.log('Creating optimized profile image for exact display size...');
    
    // Create 200x200 version for mobile display (190x190 actual)
    await sharp('public/profileND.png')
      .resize(200, 200, {
        fit: 'cover',
        position: 'center'
      })
      .png({
        quality: 80,
        compressionLevel: 9,
        palette: true
      })
      .toFile('public/profileND-mobile.png');
    
    // Keep original for desktop
    console.log('✓ Created mobile-optimized profile image');
    
    // Get file sizes
    const originalStats = await fs.stat('public/profileND.png');
    const mobileStats = await fs.stat('public/profileND-mobile.png');
    
    console.log(`Original: ${(originalStats.size / 1024).toFixed(1)}KB`);
    console.log(`Mobile: ${(mobileStats.size / 1024).toFixed(1)}KB`);
    console.log(`Savings: ${((originalStats.size - mobileStats.size) / 1024).toFixed(1)}KB`);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

optimizeProfile();