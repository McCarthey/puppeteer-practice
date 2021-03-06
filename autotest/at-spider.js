const puppeteer = require("puppeteer")

const url = 'http://spider.nk8s.cn/';

(async () => {
    const browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'] }) // 窗口最大化
    const page = await browser.newPage()
    await page.setViewport({ width: 1920, height: 1080 })
    await page.goto(url, { waitUntil: "networkidle2" })

    await page.type('#username', 'admin', { delay: 100 })
    await page.type('#password', 'admin', { delay: 100 })
    await page.click('.login-form-button', { delay: 500 })

    await page.waitFor(3000)
    const html = await page.content() // ssr
    console.log(html)
    await browser.close()
})()