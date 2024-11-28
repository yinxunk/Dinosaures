const puppeteer = require('puppeteer');

async function getList(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const name = await page.$$eval('li > a > p', elements => elements.map(el => el.textContent.trim()));

    console.log(name);
    await browser.close();
    return {name};


    
}

module.exports = getList;