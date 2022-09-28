const puppeteer = require("puppeteer");

async function start() {
  // const browser = await puppeteer.launch({ headless: false });
  // const page = await browser.newPage();
  const urls = ["https://kwork.ru", "https://google.ru", "https://youtube.com"];

  urls.map(async function (url, index) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForTimeout(1000);
    await page.screenshot(`/images/image_${index}.jpg`);
    await page.close();
    await browser.close();
  });

  // await browser.close();
}

start();
