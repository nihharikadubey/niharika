const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const QUALITY = {
  high: 85,
  medium: 70,
  low: 60
};

const imagesToOptimize = [
  {
    input: 'public/images/kube.png',
    output: 'public/images/kube-optimized.png',
    width: 800,
    quality: QUALITY.medium
  },
  {
    input: 'public/images/wanderlust.png',
    output: 'public/images/wanderlust-optimized.png',
    width: 800,
    quality: QUALITY.medium
  },
  {
    input: 'public/images/TODO.png',
    output: 'public/images/TODO-optimized.png',
    width: 800,
    quality: QUALITY.medium
  },
  {
    input: 'public/profileND.png',
    output: 'public/profileND-optimized.png',
    width: 400,
    quality: QUALITY.high
  }
];

async function optimizeImage(config) {
  try {
    const { input, output, width, quality } = config;
    
    console.log(`Optimizing ${input}...`);
    
    // Get original file size
    const stats = await fs.stat(input);
    const originalSize = (stats.size / 1024 / 1024).toFixed(2);
    
    // Optimize the image
    await sharp(input)
      .resize(width, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .png({
        quality,
        compressionLevel: 9,
        palette: true
      })
      .toFile(output);
    
    // Get new file size
    const newStats = await fs.stat(output);
    const newSize = (newStats.size / 1024 / 1024).toFixed(2);
    
    console.log(`✓ ${input}: ${originalSize}MB → ${newSize}MB (${Math.round((1 - newStats.size/stats.size) * 100)}% reduction)`);
    
    // Create backup of original
    const backupPath = input.replace(/\.(png|jpg|jpeg)$/, '-backup.$1');
    await fs.copyFile(input, backupPath);
    
    // Replace original with optimized version
    await fs.copyFile(output, input);
    
    // Remove the temporary optimized file
    await fs.unlink(output);
    
  } catch (error) {
    console.error(`Error optimizing ${config.input}:`, error);
  }
}

async function main() {
  console.log('Starting image optimization...\n');
  
  for (const config of imagesToOptimize) {
    await optimizeImage(config);
  }
  
  console.log('\n✅ Image optimization complete!');
  console.log('Backup files created with -backup suffix');
}

main().catch(console.error);