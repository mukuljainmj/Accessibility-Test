const { AxePuppeteer } = require("@axe-core/puppeteer");
const puppeteer = require("puppeteer");

// Initial Page Analyze
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:3000/");
  const results = await new AxePuppeteer(page).analyze();
  console.log(results, "Page Analyze Results");
  await page.close();
  await browser.close();
})();

// Page Analyze After Toggle
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:3000/");
  const moreFieldHandleBC = await page.$(".more-field-class");
  const moreFieldInnerHTMLBC = await page.evaluate((moreFieldElement) => {
    return moreFieldElement?.innerHTML;
  }, moreFieldHandleBC);
  console.log(moreFieldInnerHTMLBC, "More Field Inner HTML Before Toggle");
  const toggleHandle = await page.$('[data-testid="toggle-more-fields"]');
  await toggleHandle.click();
  const moreFieldHandleAC = await page.$(".more-field-class");
  const moreFieldInnerHTMLAC = await page.evaluate((moreFieldElement) => {
    return moreFieldElement?.innerHTML;
  }, moreFieldHandleAC);
  console.log(moreFieldInnerHTMLAC, "More Field Inner HTML After Toggle");
  const results = await new AxePuppeteer(page).analyze();
  console.log(results, "Page Analyze Results After Toggle");
  await page.close();
  await browser.close();
})();

// Page Analyze After Toggle Two Times
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("http://localhost:3000/");
    const toggleHandle = await page.$('[data-testid="toggle-more-fields"]');
    await toggleHandle.click();
    await toggleHandle.click();
    const moreFieldHandleACTwoTimes = await page.$(".more-field-class");
    const moreFieldInnerHTMLACTwoTimes = await page.evaluate((moreFieldElement) => {
      return moreFieldElement?.innerHTML;
    }, moreFieldHandleACTwoTimes);
    console.log(moreFieldInnerHTMLACTwoTimes, "More Field Inner HTML After Toggle Two Times");
    const results = await new AxePuppeteer(page).analyze();
    console.log(results, "Page Analyze Results After Toggle Two Times");
    await page.close();
    await browser.close();
  })();
