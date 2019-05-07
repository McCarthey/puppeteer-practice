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