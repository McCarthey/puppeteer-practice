const puppeteer = require("puppeteer")
const devices = require("puppeteer/DeviceDescriptors")
const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout))
const pageUrl = "https://www.humblebundle.com/books/web-design-development-books"

;(async () => {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.emulate(devices['iPhone 6'])
    // await page.setViewport({ width: 1920, height: 1080 })
    await page.goto(pageUrl,{waitUntil: "networkidle2"})
    await page.screenshot({path:'./generate/hb.png',fullPage:true});
    await browser.close()
})()
