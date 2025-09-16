const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const imagesDir = path.join(publicDir, 'images');

// Function to recursively find all PNG/JPG files
function findAllImages(dir, relativePath = '') {
  const files = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      // Recursively search subdirectories
      const subFiles = findAllImages(fullPath, path.join(relativePath, item));
      files.push(...subFiles);
    } else if (/\.(png|jpg|jpeg)$/i.test(item)) {
      // Add image files
      files.push(path.join(relativePath, item));
    }
  }

  return files;
}

// Get all images in the images directory
const allImages = findAllImages(imagesDir);

async function optimizeImage(imagePath) {
  try {
    const fullPath = path.join(imagesDir, imagePath);
    const parsedPath = path.parse(fullPath);

    if (!fs.existsSync(fullPath)) {
      console.log(`❌ Image not found: ${imagePath}`);
      return;
    }

    const stats = fs.statSync(fullPath);
    const originalSize = (stats.size / 1024).toFixed(1);

    // Generate WebP version
    const webpPath = path.join(parsedPath.dir, parsedPath.name + '.webp');
    await sharp(fullPath)
      .webp({ quality: 80 })
      .toFile(webpPath);

    // Generate AVIF version for even better compression
    const avifPath = path.join(parsedPath.dir, parsedPath.name + '.avif');
    await sharp(fullPath)
      .avif({ quality: 70 })
      .toFile(avifPath);

    const webpStats = fs.statSync(webpPath);
    const avifStats = fs.statSync(avifPath);

    const webpSize = (webpStats.size / 1024).toFixed(1);
    const avifSize = (avifStats.size / 1024).toFixed(1);

    console.log(`✅ ${imagePath}:`);
    console.log(`   PNG: ${originalSize}KB → WebP: ${webpSize}KB → AVIF: ${avifSize}KB`);
    console.log(`   Savings: ${((1 - avifStats.size / stats.size) * 100).toFixed(1)}%`);

  } catch (error) {
    console.error(`❌ Error optimizing ${imagePath}:`, error.message);
  }
}

async function main() {
  console.log('🚀 Starting comprehensive image optimization...\n');
  console.log(`Found ${allImages.length} images to process\n`);

  let processed = 0;
  let skipped = 0;

  for (const imagePath of allImages) {
    const fullPath = path.join(imagesDir, imagePath);
    const stats = fs.statSync(fullPath);
    const sizeKB = (stats.size / 1024).toFixed(1);

    // Skip very small images (under 10KB)
    if (stats.size < 10 * 1024) {
      console.log(`⏭️  Skipping ${imagePath} (${sizeKB}KB - too small)`);
      skipped++;
      continue;
    }

    await optimizeImage(imagePath);
    processed++;
    console.log('');
  }

  console.log(`✨ Image optimization complete!`);
  console.log(`📊 Processed: ${processed} images, Skipped: ${skipped} small images`);
}

main().catch(console.error);