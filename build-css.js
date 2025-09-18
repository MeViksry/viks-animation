const fs = require('fs').promises;
const path = require('path');
const cssnano = require('cssnano');
const postcss = require('postcss');
const { performance } = require('perf_hooks');

class CSSMinifier {
  constructor(options = {}) {
    this.options = {
      inputFile: options.inputFile || 'src/viks.css',
      outputFile: options.outputFile || 'dist/viks.min.css',
      sourceMap: options.sourceMap !== false, // default true
      verbose: options.verbose || false,
      cssnanoOptions: options.cssnanoOptions || {
        preset: ['default', {
          discardComments: { removeAll: true },
          normalizeWhitespace: true,
          minifySelectors: true
        }]
      },
      ...options
    };
  }

  // Pastikan direktori output ada
  async ensureOutputDir() {
    const outputDir = path.dirname(this.options.outputFile);
    try {
      await fs.access(outputDir);
    } catch {
      await fs.mkdir(outputDir, { recursive: true });
      if (this.options.verbose) {
        console.log(`📁 Created directory: ${outputDir}`);
      }
    }
  }

  // Baca file CSS sumber
  async readInputFile() {
    const inputPath = path.resolve(this.options.inputFile);
    
    try {
      await fs.access(inputPath);
    } catch {
      throw new Error(`Input file not found: ${inputPath}`);
    }

    const inputCss = await fs.readFile(inputPath, 'utf8');
    
    if (this.options.verbose) {
      const sizeKB = (Buffer.byteLength(inputCss, 'utf8') / 1024).toFixed(2);
      console.log(`📖 Read input file: ${inputPath} (${sizeKB} KB)`);
    }

    return inputCss;
  }

  // Proses minifikasi CSS
  async processCSS(inputCss) {
    const startTime = performance.now();

    const processor = postcss([cssnano(this.options.cssnanoOptions)]);
    
    const processOptions = {
      from: this.options.inputFile,
      to: this.options.outputFile
    };

    if (this.options.sourceMap) {
      processOptions.map = {
        inline: false,
        annotation: true
      };
    }

    try {
      const result = await processor.process(inputCss, processOptions);
      const endTime = performance.now();
      
      if (this.options.verbose) {
        const processingTime = (endTime - startTime).toFixed(2);
        console.log(`⚡ CSS processed in ${processingTime}ms`);
      }

      return result;
    } catch (error) {
      throw new Error(`CSS processing failed: ${error.message}`);
    }
  }

  // Tulis file output
  async writeOutputFiles(result) {
    const outputPath = path.resolve(this.options.outputFile);
    
    // Tulis file CSS yang diminifikasi
    await fs.writeFile(outputPath, result.css, 'utf8');
    
    const originalSize = Buffer.byteLength(result.root.toString(), 'utf8');
    const minifiedSize = Buffer.byteLength(result.css, 'utf8');
    const compressionRatio = ((1 - minifiedSize / originalSize) * 100).toFixed(1);

    if (this.options.verbose) {
      console.log(`💾 Minified CSS saved: ${outputPath}`);
      console.log(`📊 Size reduction: ${(originalSize / 1024).toFixed(2)} KB → ${(minifiedSize / 1024).toFixed(2)} KB (${compressionRatio}% smaller)`);
    }

    // Tulis source map jika ada
    if (result.map && this.options.sourceMap) {
      const mapPath = `${outputPath}.map`;
      await fs.writeFile(mapPath, result.map.toString(), 'utf8');
      
      if (this.options.verbose) {
        console.log(`🗺️ Source map saved: ${mapPath}`);
      }
    }

    return {
      outputFile: outputPath,
      originalSize,
      minifiedSize,
      compressionRatio: parseFloat(compressionRatio)
    };
  }

  // Method utama untuk menjalankan minifikasi
  async minify() {
    try {
      if (this.options.verbose) {
        console.log('🚀 Starting CSS minification...');
        console.log(`📥 Input: ${this.options.inputFile}`);
        console.log(`📤 Output: ${this.options.outputFile}`);
      }

      // Pastikan direktori output ada
      await this.ensureOutputDir();

      // Baca file input
      const inputCss = await this.readInputFile();

      // Proses minifikasi
      const result = await this.processCSS(inputCss);

      // Tulis file output
      const stats = await this.writeOutputFiles(result);

      if (this.options.verbose) {
        console.log('✅ CSS minification completed successfully!');
      }

      return {
        success: true,
        ...stats
      };

    } catch (error) {
      console.error('❌ Error during CSS minification:', error.message);
      
      if (this.options.verbose && error.stack) {
        console.error('Stack trace:', error.stack);
      }

      return {
        success: false,
        error: error.message
      };
    }
  }

  // Method untuk batch processing multiple files
  async minifyBatch(files) {
    const results = [];
    
    for (const file of files) {
      const minifier = new CSSMinifier({
        ...this.options,
        inputFile: file.input,
        outputFile: file.output
      });
      
      const result = await minifier.minify();
      results.push({
        input: file.input,
        output: file.output,
        ...result
      });
    }

    return results;
  }
}

// Fungsi helper untuk penggunaan langsung
async function minifyCSS(inputFile, outputFile, options = {}) {
  const minifier = new CSSMinifier({
    inputFile,
    outputFile,
    ...options
  });
  
  return await minifier.minify();
}

// Penggunaan langsung (seperti kode original)
async function main() {
  const minifier = new CSSMinifier({
    inputFile: 'src/viks.css',
    outputFile: 'dist/viks.min.css',
    verbose: true,
    sourceMap: true
  });

  await minifier.minify();
}

// Export untuk penggunaan sebagai module
module.exports = {
  CSSMinifier,
  minifyCSS
};

// Jalankan jika dipanggil langsung
if (require.main === module) {
  main();
}