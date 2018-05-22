const puppeteer = require("puppeteer")
const devices = require("puppeteer/DeviceDescriptors")
const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout))

;(async () => {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    // await page.emulate(devices['iPhone 6'])
    await page.setViewport({ width: 1920, height: 1080 })
    await page.goto("http://fintech.lhjrc.com", { waitUntil: "networkidle2" })

    await page.click("a[href='#/news']")
    await page.waitForNavigation({ waitUntil: "networkidle2" })
    await delay(2000)
    await page.click("a[href='#/policy']")
    await page.waitForNavigation({ waitUntil: "networkidle2" })
    await delay(2000)
    await page.click("a[href='#/activity']")
    await page.waitForNavigation({ waitUntil: "networkidle2" })
    await delay(2000)
    await page.click("a[href='#/log']")
    await page.waitForNavigation({ waitUntil: "networkidle2" })
    await delay(2000)
    await page.click("a[href='#/sign']")
    await page.waitForNavigation({ waitUntil: "networkidle2" })
    await delay(2000)
    console.log(page.url())

    // await page.screenshot({path:'example.png',fullPage:true});
    // await page.pdf({path: 'test.pdf', format: 'A4'});

    // await browser.close()
})()
