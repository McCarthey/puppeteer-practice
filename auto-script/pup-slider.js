const puppeteer = require("puppeteer")

const url = 'https://login.taobao.com/member/login.jhtml?redirectURL=https%3A%2F%2Fwww.tmall.com%2F';

(async () => {
    const browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'] }) // 窗口最大化
    const page = await browser.newPage()
    await page.evaluateOnNewDocument(() => {
        Object.defineProperty(navigator, 'webdriver', {
            get: () => false,
        });
    });
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36")
    await page.setViewport({ width: 1920, height: 1080 })
    await page.goto(url, { waitUntil: "networkidle2" })
    await page.waitFor(1000)
    // await page.click('.forget-pwd.J_Quick2Static', { delay: 300 })

    await page.type('#TPL_username_1', 'adm1n@qq.com', { delay: 100 })
    await page.type('#TPL_password_1', '123123123', { delay: 100 })
    // await page.click('#J_SubmitStatic', { delay: 500 })
    page.mouse.click(1190, 430, { delay: 2000 })
    await page.mouse.down()
    await page.mouse.move(1201, 430)
    await page.waitFor(130)
    await page.mouse.move(1260, 430, { steps: 15 })
    await page.waitFor(200)
    await page.mouse.move(1390, 430, { steps: 2 })
    await page.waitFor(120)
    await page.mouse.move(1310, 430, { steps: 6 })
    await page.mouse.move(1400, 431, { steps: 10 })
    await page.waitFor(210)
    await page.mouse.move(1448, 430)
    await page.mouse.up()

    await page.waitFor(3000)

    // await browser.close()
})()