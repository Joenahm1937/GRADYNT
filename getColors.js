// const puppeteer = require("puppeteer");
const getPixels = require("get-pixels");
const quantize = require("quantize");
const { performance } = require("perf_hooks");

var getColors = async (input, browser, page) => {
  var createPixelArray = (pxBuffer, pixelCount, quality) => {
    const pixels = pxBuffer;
    const pixelArray = [];
    for (let i = 0, offset, r, g, b, a; i < pixelCount; i += quality) {
      offset = i * 4;
      r = pixels[offset];
      g = pixels[offset + 1];
      b = pixels[offset + 2];
      o = pixels[offset + 3];

      // If pixel is mostly opaque and not white
      if (
        (typeof o === "undefined" || o >= 125) &&
        !(r > 250 && g > 250 && b > 250)
      )
        pixelArray.push([r, g, b]);
    }
    return pixelArray;
  };

  //colorCount can be 2-20
  var getColor = async (img, colorCount = 5, quality = 10) => {
    try {
      const pixels = await new Promise((res, rej) => {
        getPixels(img, (err, data) => {
          err ? rej(err) : res(data);
        });
      });
      const pixelCount = pixels.shape[0] * pixels.shape[1];
      const pixelArray = createPixelArray(pixels.data, pixelCount, quality);

      const cmap = quantize(pixelArray, colorCount);
      return cmap ? cmap.palette()[0] : null;
    } catch (error) {
      console.log(error);
    }
  };

  var scrapeGoogle = async (searched) => {
    // var start = performance.now();
    // var browser = await puppeteer.launch();
    if (!page) page = await browser.newPage();
    // var page = await browser.newPage();

    //Disable all css and images (we can disable images because google embeds image onto bage in 64 bit format)
    // await page.setRequestInterception(true);
    // page.on("request", (req) => {
    //   if (
    //     req.resourceType() === "stylesheet" ||
    //     req.resourceType() === "font" ||
    //     req.resourceType() === "image"
    //   ) {
    //     req.abort();
    //   } else {
    //     req.continue();
    //   }
    // });

    await page.goto(
      `https://www.google.com/search?q=${searched.split(" ").join("+")}`,
      {
        waitUntil: "networkidle2",
      }
    );
    var elements = await page.$x("//a[contains(text(), 'Images')]");
    await elements[0].click();
    await page.waitForNavigation({ waitUntil: "domcontentloaded" }); //faster performance
    var images = await page.evaluate(() =>
      Array.from(document.querySelectorAll("img.rg_i"))
        .slice(0, 5)
        .map((i) => i.src)
    );
    var fiveImages = images.slice(0, 5);
    // await browser.close();
    // var end = performance.now();
    return [fiveImages, page];
  };

  var [fiveImages, page] = await scrapeGoogle(input);

  var colors = [];
  for (var image of fiveImages) {
    colors.push(await getColor(image));
  }
  return [colors, page];
};

module.exports = getColors;
