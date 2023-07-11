import getPixels from "get-pixels";
import quantize from "quantize";
import { COLOR_THRESHOLD, DEFAULT_COLOR_COUNT, DEFAULT_QUALITY, IMAGES_LINK_XPATH, OPACITY_THRESHOLD } from "../constants.js";

const createPixelArray = (pixels, pixelCount, quality) => {
    const pixelArray = [];

    for (let i = 0, offset, red, green, blue, opacity; i < pixelCount; i += quality) {
        offset = i * 4;
        red = pixels[offset];
        green = pixels[offset + 1];
        blue = pixels[offset + 2];
        opacity = pixels[offset + 3];

        if ((typeof opacity === "undefined" || opacity >= OPACITY_THRESHOLD) && !(red > COLOR_THRESHOLD && green > COLOR_THRESHOLD && blue > COLOR_THRESHOLD))
            pixelArray.push([red, green, blue]);
    }

    return pixelArray;
};

const getColor = async (imageData, colorCount = DEFAULT_COLOR_COUNT, quality = DEFAULT_QUALITY) => {
    const [height, width] = imageData.shape;
    const pixelCount = height * width;
    const pixelArray = createPixelArray(imageData.data, pixelCount, quality);
    const cmap = quantize(pixelArray, colorCount);

    return cmap ? cmap.palette()[0] : null;
};

const getPixelsPromise = (img) =>
    new Promise((resolve, reject) => {
        getPixels(img, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });

const fetchImageColors = async (img) => {
    try {
        const imageData = await getPixelsPromise(img);
        return getColor(imageData);
    } catch (error) {
        console.error(error);
    }
};

const scrapeGoogleImages = async (searched, browser, page) => {
    if (!page) {
        page = await browser.newPage();
    }

    await page.goto(`https://www.google.com/search?q=${searched.split(" ").join("+")}`, { waitUntil: "networkidle2" });

    const elements = await page.$x(IMAGES_LINK_XPATH);
    await elements[0].click();
    await page.waitForNavigation({ waitUntil: "domcontentloaded" });

    const images = await page.evaluate(() =>
        Array.from(document.querySelectorAll("img.rg_i")).slice(0, 5).map((i) => i.src)
    );

    return [images.slice(0, 5), page];
};

export const getColors = async (input, browser, page) => {
    const [imageURLs, updatedPage] = await scrapeGoogleImages(input, browser, page);

    const colorPromises = imageURLs.map((url) => fetchImageColors(url));
    const colors = await Promise.all(colorPromises);

    return [colors, updatedPage];
};
