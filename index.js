var puppeteer = require('puppeteer');
var fs = require('fs');
var { performance } = require('perf_hooks');

var input = 'frank ocean';

(async () => {
  // var start = performance.now();
  var browser = await puppeteer.launch();
  var page = await browser.newPage();

  //Disable all css and images (we can disable images because google embeds image onto bage in 64 bit format)
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    if(req.resourceType() === 'stylesheet' || req.resourceType() === 'font' || req.resourceType() === 'image'){
      req.abort();
    } else {
    req.continue();
  }});

  await page.goto(`https://www.google.com/search?q=${input.split(' ').join('+')}`, {
    waitUntil: 'networkidle2',
  });
  var elements = await page.$x("//a[contains(text(), 'Images')]");
  await elements[0].click();
  await page.waitForNavigation({waitUntil: 'domcontentloaded'}) //faster performance
  // await page.waitForNavigation({waitUntil: 'networkidle2'})
  var images = await page.evaluate(
    () => Array.from(document.querySelectorAll('img.rg_i')).slice(0,5).map(i => i.src)
  );
  var firstImage = images[1];
  console.log(firstImage);
  await browser.close();
  // var end = performance.now();
  // console.log(end - start)
})();