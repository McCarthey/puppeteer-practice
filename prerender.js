#!/usr/bin/env node

const puppeteer = require("puppeteer")

const pageUrl = 'https://test.onluxy.com/static/landing_page/google_ad1.html#/'


async function prerender(device) {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    // await page.emulate(devices['iPhone 6'])
    await page.setViewport({ width: 1920, height: 1080 })
    const response = await page.goto(pageUrl, { waitUntil: "networkidle2" })
    console.log(response)
    await browser.close()
}

// handleArgv(process.argv.slice(2))
prerender()
