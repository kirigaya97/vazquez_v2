import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const INPUT_DIR = 'public/images/hero-image-presentation';
const OUTPUT_DIR = 'public/images/hero-presentation-webp';

async function convertImages() {
    try {
        // Create output directory
        await fs.mkdir(OUTPUT_DIR, { recursive: true });

        const files = await fs.readdir(INPUT_DIR);
        const jpegFiles = files.filter(f => f.toLowerCase().endsWith('.jpeg') || f.toLowerCase().endsWith('.jpg'));

        console.log(`Found ${jpegFiles.length} images to convert...`);

        for (let i = 0; i < jpegFiles.length; i++) {
            const inputPath = path.join(INPUT_DIR, jpegFiles[i]);
            const outputFilename = `hero-${(i + 1).toString().padStart(2, '0')}.webp`;
            const outputPath = path.join(OUTPUT_DIR, outputFilename);

            await sharp(inputPath)
                .resize(800) // Max width 800px to keep it light
                .webp({ quality: 80 })
                .toFile(outputPath);

            console.log(`Converted: ${jpegFiles[i]} -> ${outputFilename}`);
        }

        console.log('Conversion complete!');
    } catch (error) {
        console.error('Error converting images:', error);
    }
}

convertImages();
