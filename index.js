const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');

(async ()=>{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.emulate(devices['iPhone 6'])
    await page.goto('https://www.baidu.com');
    await page.screenshot({path:'example.png',fullPage:true});
    await page.pdf({path: 'test.pdf', format: 'A4'});
    await browser.close()
})()