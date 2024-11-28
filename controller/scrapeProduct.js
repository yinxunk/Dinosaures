const puppeteer = require('puppeteer');



async function scrapeProduct(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    

    /**
    const [el] = await page.$x('//*[@id="content"]/div[2]/section[1]/div/img');
    const src = await el.getProperty('src');
    const srcTxt = await src.jsonValue();
    

    console.log({srcTxt});
    */
    await page.goto(url);
    const link = await page.$eval('img', img => img.getAttribute('src')).catch(err => null);
    //const paths = await page.$$eval('path', elements => elements.map(path => path.getAttribute('d')));
    //const humanAttribute = await page.$eval('div > svg > path[fill="#AAAAAA"]', path => path.getAttribute('d'));
    //const dinoAttribute = await page.$eval('div > svg > g > g[fill="#D5D5D5"] > g > path', path => path.getAttribute('d'));
    // const firstdescription = await page.$eval('section > div > p:nth-of-type(1)', p => p.textContent);
    // const seconddescription = await page.$eval('section > div > p:nth-of-type(2)', p => p.textContent);
    const descriptions = await page.$$eval('section > div > p', para => para.map((p) => p.textContent.trim()));
    const firstdescription = descriptions[0] || null;
    const seconddescription = descriptions[1] || null;
    const title = await page.$eval('div > div > div > h1' , h1 => h1.textContent);
    const realtitle = title || null;
    const taxnomic = await page.$eval('section > h2', h2 => h2.textContent);
    const detailname = await page.$$eval('dl > dt', detail => detail.map((dt) => dt.textContent.trim()));
    const detailcontent = await page.$$eval('dl > dd', content => content.map((dd) => dd.textContent.trim()));
    console.log(taxnomic);
    console.log(detailname);
    console.log(detailcontent);
    //console.log(firstdescription);
    //console.log(seconddescription);
    //console.log(link);

    /** 
    for(const path of paths){
        console.log(path);
    }
        */
    /** 
    const content = await page.content();
    
    console.log(content)
    */
    //console.log(humanAttribute);
    //console.log(dinoAttribute);

    await browser.close();
    return {realtitle, link, taxnomic,detailname,detailcontent, /* dinoAttribute*/ firstdescription, seconddescription};
    

}

module.exports = scrapeProduct;

