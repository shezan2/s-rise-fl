const jimpModule = require('jimp');
console.log('Jimp exported keys:', Object.keys(jimpModule));

async function main() {
  const Jimp = jimpModule.Jimp || jimpModule.default || jimpModule;
  const image = await Jimp.read('public/logo-raw.png');
  
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
    const red   = this.bitmap.data[idx + 0];
    const green = this.bitmap.data[idx + 1];
    const blue  = this.bitmap.data[idx + 2];
    
    if (red > 240 && green > 240 && blue > 240) {
      this.bitmap.data[idx + 3] = 0;
    }
  });
  
  await image.write('public/logo.png');
  console.log('Done!');
}
main().catch(console.error);
