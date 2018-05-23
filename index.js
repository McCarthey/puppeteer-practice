#!/usr/bin/env node

const puppeteer = require("puppeteer")
const devices = require("puppeteer/DeviceDescriptors")
const path = process.cwd()

const pageUrl =
    "https://www.baidu.com"

function handleArgv(argv) {
    console.log(argv)
    if (argv[0] === "-h" || argv[0] === "--help") {
        console.log("usage:\n")
        console.log("-v or --version [show version]")
        console.log("-s     or --shot [save a screenshot of given url]    ")
    } else if (argv[0] === "-v" || argv[0] === "--version") {
        console.log("v1.0.0")
    } else if (argv[0] === "-s" || argv[0] === "--shot") {
        screenshot()
    }
}
async function screenshot() {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.emulate(devices["iPhone 6"])
    // await page.setViewport({ width: 1920, height: 1080 })
    await page.goto(pageUrl, { waitUntil: "networkidle2" })
    await page.screenshot({ path: "./generate/hb.png", fullPage: true })
    await browser.close()
}

handleArgv(process.argv.slice(2))
