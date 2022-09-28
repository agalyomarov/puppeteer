const puppeteer = require("puppeteer");

async function start() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://kwork.ru/");
  await page.waitForTimeout(1000);

  await page.setViewport({ width: 2000, height: 800 });

  await page.click("#app-header-select > li:nth-child(1) > a:nth-child(1)");
  await page.waitForTimeout(1000);

  await page.$eval("input.js-signin-input:nth-child(1)", (element) => {
    element.value = "a_o_x";
  });
  await page.$eval("input.js-form-input:nth-child(2)", (element) => {
    element.value = "151297YlaRamo";
  });

  await page.$eval(
    "#form-login > div.popup-form-container-step1 > div:nth-child(3) > button.js-signin-submit.js-forgotpassword-hide.w100pi.kw-button.kw-button--size-40.kw-button--green.js-inPopup",
    (target) => {
      target.removeAttribute("class");
      target.setAttribute(
        "class",
        "js-signin-submit js-forgotpassword-hide w100pi kw-button kw-button--size-40 kw-button--green js-inPopup"
      );
    }
  );

  await page.click("button.js-signin-submit");
  await page.waitForTimeout(1000);

  await page.goto("https://kwork.ru/manage_kworks?group=feated&page=3");

  await page.setViewport({ width: 2000, height: 800 });
  await page.waitForTimeout(1000);

  const urls = await page.$eval(
    "#app-manage-kworks-list > div.js-kworks-list-items > div > table",
    (target) => {
      const kworks = target.querySelectorAll(
        "tr:not(.wrap-kworks-lang-switcher)"
      );
      let urls = [];
      kworks.forEach(function (kwork, index) {
        urls[index] = kwork.querySelector(
          "td > div > div.manage-kworks-item__inner > div.manage-kworks-item__right-part > div.manage-kworks-item__top-part > div > div.manage-kworks-actions.m-hidden > div:nth-child(4) > span"
        ).dataset.href;
      });
      return urls;
    }
  );

  // for (let i = 0; i < urls.length; i++) {
  await page.goto("https://kwork.ru/edit?id=20978611");
  await page.setViewport({ width: 2000, height: 800 });
  await page.waitForTimeout(1000);
  await page.$eval(
    "div.all_page.page-flex__content.header-new-nav.page-addEditKwork > div.centerwrap.pt20.mb20.kwork-save-page.lang-ru > form > div.js-step.js-step-description.card.card_borderless.kwork-save-step.kwork-save-page__step.position-r > div.card__content.kwork-save-step__container > div.kwork-save-step__content.kwork-save-step__animation.card__content-inner.card__content-inner_separator > div.js-field-block.kwork-save-step__field-block.kwork-save-step__step1-description > div.kwork-save-step__description-fields > div.kwork-save-step__field-value.kwork-save-step__field-value_tooltip.pb0.description-block.js-description-block > div.trumbowyg-box.trumbowyg-editor-visible.trumbowyg-ru.trumbowyg > div.trumbowyg-editor.text-counter-init",
    (target) => {
      target.scrollIntoView("p:last-child");
      target.querySelector("p:last-child").innerHTML =
        "<strong>Все мои кворки: </strong>https://kwork.ru/user/a_o_x";
      // target.insertAdjacentHTML(
      //   "beforeend",
      //   "<p><strong>Все мои кворки: </strong>https://kwork.ru/user/a_o_x</p>"
      // );
    }
  );
  await page.waitForTimeout(1000);
  await page.click(
    "#body > div.all_page.page-flex__content.header-new-nav.page-addEditKwork > div.centerwrap.pt20.mb20.kwork-save-page.lang-ru > form > div.card__footer.card__footer_borderless.card__footer--with-faq.js-wrap-save-btn-kwork > div.kw-button.kw-button--size-48.kwork-save-step__kw-button-size-48.kw-button--green.js-save-kwork.js-uploader-button-disable.pull-right.kwork-save-step__save"
  );
  await page.waitForTimeout(1000);
  // }

  await browser.close();
}

start();
