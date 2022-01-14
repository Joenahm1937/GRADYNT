const getPixels = require('get-pixels');
const quantize = require('quantize');

function createPixelArray(pxBuffer, pixelCount, quality) {
    const pixels = pxBuffer;
    const pixelArray = [];

    //r=red, g=green, b=blue, o=opacity
    for (let i = 0, offset, r, g, b, a; i < pixelCount; i += quality) {
        offset = i * 4;
        r = pixels[offset];
        g = pixels[offset + 1];
        b = pixels[offset + 2];
        o = pixels[offset + 3];

        // If pixel is mostly opaque and not white
        if ((typeof o === 'undefined' || o >= 125) && !(r > 250 && g > 250 && b > 250)) pixelArray.push([r, g, b]);
    }
    return pixelArray;
}



//colorCount can be 2-20
var getPalette = async (img, colorCount = 10, quality = 10) => {
  try {
    const pixels = await new Promise((res, rej) => {
      getPixels(img, (err, data) => {err ? rej(err) : res(data)})
    });
    const pixelCount = pixels.shape[0] * pixels.shape[1];
    const pixelArray = createPixelArray(pixels.data, pixelCount, quality);

    const cmap = quantize(pixelArray, colorCount);
    return cmap ? cmap.palette() : null;
  } catch (error) {
    console.log(error)
  }
}

getPalette("frank_ocean.jpeg").then(data => console.log(data))

