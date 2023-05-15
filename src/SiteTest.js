const { AxePuppeteer } = require('@axe-core/puppeteer');
const puppeteer = require('puppeteer');

// Initial Page Analyze
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("http://localhost:3000/");
    const results = await new AxePuppeteer(page).analyze();
    console.log(results, 'Page Analyze Results');
    await page.close();
    await browser.close();
})();

// Page Analyze After Click Toggle
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("http://localhost:3000/");
    const moreFieldHandleBC = await page.$('.more-field-class');
    const moreFieldInnerHTMLBC = await page.evaluate((moreFieldElement) => {
        return moreFieldElement?.innerHTML
    }, moreFieldHandleBC);
    console.log(moreFieldInnerHTMLBC, 'More Field Inner HTML Before Click');
    const toggleHandle = await page.$('[data-testid="toggle-more-fields"]');
    await toggleHandle.click();
    const moreFieldHandleAC = await page.$('.more-field-class');
    const moreFieldInnerHTMLAC = await page.evaluate((moreFieldElement) => {
        return moreFieldElement?.innerHTML
    }, moreFieldHandleAC);
    console.log(moreFieldInnerHTMLAC, 'More Field Inner HTML After Click');
    const results = await new AxePuppeteer(page).analyze();
    console.log(results, 'Page Analyze Results After Click');
    await page.close();
    await browser.close();
})();