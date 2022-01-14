var puppeteer = require('puppeteer');
var fs = require('fs');

var input = 'frank ocean';

(async () => {
  var browser = await puppeteer.launch();
  // var browser = await puppeteer.launch({ headless: false });
  var page = await browser.newPage();
  await page.goto(`https://www.google.com/search?q=${input.split(' ').join('+')}`, {
    waitUntil: 'networkidle2',
  });
  var elements = await page.$x("//a[contains(text(), 'Images')]");
  await elements[0].click();
  await page.waitForNavigation({waitUntil: 'networkidle2'})
  var images = await page.evaluate(
    () => Array.from(document.querySelectorAll('img.rg_i')).slice(0,5).map(i => i.src)
  );
  var firstImage = images[1];
  // var buffer = Buffer.from(firstImage, "base64");
  // fs.writeFileSync("new-path.jpg", buffer);
  console.log(firstImage)

  await browser.close();
})();