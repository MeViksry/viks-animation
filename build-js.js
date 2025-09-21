const fs = require('fs');
const path = require('path');
const Terser = require('terser');

// Define input and output paths
const inputPath = path.join(__dirname, 'src/viks.js');
const outputPath = path.join(__dirname, 'dist/viks.min.js');

// Read the original code from the file
const originalCode = fs.readFileSync(inputPath, 'utf8');

// Use async function because Terser works asynchronously
async function build() {
  try {
    // Terser configuration for minification and source map creation
    const result = await Terser.minify(originalCode, {
      sourceMap: {
        filename: path.basename(outputPath), // Output file name: 'viks.min.js'
        url: path.basename(outputPath) + '.map' // Folder file name: 'viks.min.js.map'
      }
    });

    // Write minification results to dist folder
    fs.writeFileSync(outputPath, result.code);
    console.log('✅ viks.min.js successfully created!');

    // Write source map if any
    if (result.map) {
      fs.writeFileSync(outputPath + '.map', result.map);
      console.log('✅ viks.min.js.map successfully created!');
    }

  } catch (error) {
    console.error('Error while minifying JS:', error);
  }
}

// Run the build function
build();