const fs = require('fs');
const path = require('path');
const cssnano = require('cssnano');
const postcss = require('postcss');

// Define input and output paths for cleaner structure
const inputPath = path.join(__dirname, 'src/viks.css');
const outputPath = path.join(__dirname, 'dist/viks.min.css');

// FUNCTION TO READ THE SOURCE FILE
const inputCss = fs.readFileSync(inputPath, 'utf8');

// CSSNANO FOR CSS MINIFICATION PROCESS
postcss([cssnano])
  // [UPDATED] Add 'from', 'to', and 'map' options here
  .process(inputCss, {
    from: inputPath,
    to: outputPath,
    map: {
      inline: false, // Important: this generates a separate .map file
    },
  })
  .then(result => {
    // WRITE MINIFICATION RESULTS TO THE DIST FOLDER
    fs.writeFileSync(outputPath, result.css);
    console.log('✅ viks.min.css has been successfully created!');

    // This condition is now met because we requested a source map
    if (result.map) {
      fs.writeFileSync(path.join(__dirname, 'dist/viks.min.css.map'), result.map.toString());
      console.log('✅ viks.min.css.map has been successfully created!');
    }
  })
  .catch(error => {
    console.error('Error during CSS minification:', error);
  });