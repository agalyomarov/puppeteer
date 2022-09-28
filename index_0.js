const puppeteer = require("puppeteer");
const fs = require("fs");
const https = require("https");

(async function () {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    "https://yandex.ru/images/search?from=tabbar&text=%D0%B1%D0%B0%D0%B9%D0%BA%D0%B0%D0%BB"
  );
  await page.waitForSelector(".serp-item__link");
  await page.click(".serp-item__link");
  await page.setViewport({ width: 2000, height: 800 });

  await autoScroll(page);

  // await page.waitForSelector(".image_history_cache");
  await page.waitUntil(["domcontentcloaded"]);
  await page.screenshot({ path: "screenshot.png" });

  let images = await page.evaluate(() => {
    let imgElements = document.querySelectorAll(
      ".serp-item__thumb.justifier__thumb"
    );
    let URLs = Object.values(imgElements).map((imgElement) => ({
      src: imgElement.src,
      alt: imgElement.alt,
    }));
    return URLs;
  });

  fs.writeFile("imagesURL.json", JSON.stringify(images, null, " "), (err) => {
    if (err) return err;
  });

  images.forEach((image, index) => {
    const file = fs.createWriteStream(`images/${index}.webp`);
    const request = https.get(image.src, (response) => {
      response.pipe(file);
    });
  });

  await browser.close();
})();

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      let totalHeight = 0;
      let distance = 100;
      let timer = setInterval(() => {
        let scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        console.log(totalHeight, scrollHeight);
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}
