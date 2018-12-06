#!/usr/bin/env node

const puppeteer = require("puppeteer")
const devices = require("puppeteer/DeviceDescriptors")

const pageUrl = 'https://github.com/'

var document;

async function main(url) {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    // await page.emulate(devices['iPhone 6'])
    // await page.setViewport({ width: 1920, height: 1080 })
    await page.goto(url)
    const cookies = await page.cookies()
    // const html = await page.evaluate(() => `<html>${document.head.innerHTML}${document.body.innerHTML}</html>`);
    await browser.close()
    return cookies
}

main(pageUrl)
