const puppeteer = require('puppeteer')
const chalk = require('chalk')


const RENDER_CACHE = new Map();

async function ssr(url) {
    if (RENDER_CACHE.has(url)) {
        return { html: RENDER_CACHE.get(url), ttRenderMs: 0 }
    }

    const start = Date.now()

    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    // 拦截网络请求 
    await page.setRequestInterception(true)

    page.on('request', req => {
        // 忽略掉不会构建dom的请求，如图片，样式，和音视频等
        const whitelist = ['document', 'xhr', 'fetch', 'script']
        if(!whitelist.includes(req.resourceType)) {
            return req.abort()
        }

        req.continue() // 其他请求继续
    })


    try {

        await page.goto(url, { waitUntil: 'networkidle0' })
        await page.waitForSelector('#posts')
    } catch (e) {
        console.error(e)
        throw new Error(chalk.red(`go to page ${url} timeout`))
    }

    const html = await page.content()
    await browser.close()

    const ttRenderMs = Date.now() - start
    console.info('render time is ' + chalk.yellow(`${ttRenderMs}ms`))

    RENDER_CACHE.set(url, html)

    return { html, ttRenderMs }
}

module.exports = ssr