const jimpModule = require('jimp');

async function main() {
  const Jimp = jimpModule.Jimp || jimpModule.default || jimpModule;
  const image = await Jimp.read('public/logo-raw.png');
  
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
    const r = this.bitmap.data[idx + 0];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];
    
    const whiteness = Math.min((r + g + b) / 3.0, 255);
    
    // If it's pure white, fully transparent
    if (r > 250 && g > 250 && b > 250) {
      this.bitmap.data[idx + 3] = 0;
    } 
    // If it's highly bright (chalky anti-aliasing pixels), blend it to transparent
    else if (whiteness > 180) {
      // Map whiteness 180..255 to alpha 255..0
      let alpha = 255 * (255 - whiteness) / 75.0;
      alpha = Math.max(0, Math.min(255, Math.round(alpha)));
      
      // Also, "un-premultiply" the white to recover the original edge color
      // Assume background was white (255).
      // Color = Original * (Alpha/255) + 255 * (1 - Alpha/255)
      // So Original = (Color - 255 * (1 - Alpha/255)) / (Alpha/255)
      if (alpha > 0) {
        const aRatio = alpha / 255.0;
        this.bitmap.data[idx + 0] = Math.max(0, Math.min(255, Math.round((r - 255 * (1 - aRatio)) / aRatio)));
        this.bitmap.data[idx + 1] = Math.max(0, Math.min(255, Math.round((g - 255 * (1 - aRatio)) / aRatio)));
        this.bitmap.data[idx + 2] = Math.max(0, Math.min(255, Math.round((b - 255 * (1 - aRatio)) / aRatio)));
      }
      this.bitmap.data[idx + 3] = alpha;
    }
  });
  
  await image.write('public/logo.png');
  console.log('Done smoothing edges!');
}
main().catch(console.error);
