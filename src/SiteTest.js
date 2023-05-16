const { AxePuppeteer } = require("@axe-core/puppeteer");
const puppeteer = require("puppeteer");
const fs = require('fs');
const path = require('path');
const outputDir = './dist';

// Check if the directory exists
if (!fs.existsSync(outputDir)) {
// synchronously create a directory
  fs.mkdirSync(outputDir)
}


const writeResults  = async  (filePath, data) => {
  fs.writeFile(filePath, JSON.stringify(data, null, 2), err => { if (err) { console.log(err) }});
}

// Initial Page Analyze
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:3000/");
  const results = await new AxePuppeteer(page).analyze();
  console.log('Initial page analysis...');
  console.log(`Found ${results.violations.length} violations, details written in result_a.json \n`);
  writeResults('./dist/result_a.json', results);
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
  const toggleHandle = await page.$('[data-testid="toggle-more-fields"]');
  await toggleHandle.click();
  const moreFieldHandleAC = await page.$(".more-field-class");
  const moreFieldInnerHTMLAC = await page.evaluate((moreFieldElement) => {
    return moreFieldElement?.innerHTML;
  }, moreFieldHandleAC);
  const results = await new AxePuppeteer(page).analyze();
  writeResults('result_b.json', results);
  console.log('Page analysis after 1 click event...');
  console.log(`Found ${results.violations.length} violations, details written in result_b.json \n`);
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
    const results = await new AxePuppeteer(page).analyze();
    console.log('Page analysis after 2 click event...');
    console.log(`Found ${results.violations.length} violations, details written in result_c.json \n`);
    writeResults('result_c.json', results);
    await page.close();
    await browser.close();
  })();
