const sharp = require('sharp');
const fs = require('fs').promises;

const logos = [
  { input: 'public/ocbc.png', size: 100 },
  { input: 'public/infy.png', size: 100 },
  { input: 'public/seh.png', size: 100 },
  { input: 'public/hsbc.png', size: 100 }
];

async function optimizeLogo(config) {
  try {
    const { input, size } = config;
    
    console.log(`Optimizing ${input}...`);
    
    // Get original file size
    const stats = await fs.stat(input);
    const originalSize = (stats.size / 1024).toFixed(1);
    
    // Create backup
    const backupPath = input.replace('.png', '-original.png');
    await fs.copyFile(input, backupPath);
    
    // Optimize
    await sharp(input)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .png({
        quality: 85,
        compressionLevel: 9
      })
      .toFile(input + '.tmp');
    
    // Replace original
    await fs.rename(input + '.tmp', input);
    
    // Get new size
    const newStats = await fs.stat(input);
    const newSize = (newStats.size / 1024).toFixed(1);
    
    console.log(`✓ ${input}: ${originalSize}KB → ${newSize}KB`);
    
  } catch (error) {
    console.error(`Error optimizing ${config.input}:`, error);
  }
}

async function main() {
  console.log('Optimizing company logos...\n');
  
  for (const logo of logos) {
    await optimizeLogo(logo);
  }
  
  console.log('\n✅ Logo optimization complete!');
}

main().catch(console.error);