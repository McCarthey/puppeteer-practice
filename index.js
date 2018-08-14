#!/usr/bin/env node

const puppeteer = require("puppeteer")
const devices = require("puppeteer/DeviceDescriptors")
const path = process.cwd()
const program = require('commander')
const inquirer = require('inquirer')

// let pageUrl = 'http://localhost:39150/ddd.html#/airdrop'

function handleArgv(argv) {
    program
        .version('0.0.1')
        .option('-s')
        .parse(process.argv)
    console.log(program.list);

    inquirer.prompt([{
            type: 'input',
            name: 'printUrl',
            message: 'input url your want to print'
        }])
        .then(answers => {
            console.log(answers.printUrl)
            screenshot(answers.printUrl)
        })
}
async function screenshot(url, device) {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    // await page.emulate(devices['iPhone 6'])
    await page.setViewport({ width: 1920, height: 1080 })
    await page.goto(url, { waitUntil: "networkidle2" })
    await page.screenshot({
        path: `/puppeteer-practice/generate/print_${+new Date()}.jpeg`,
        quality: 60,
        fullPage: true
    })
    console.log(`image is printed you can find it in /d/puppeteer-practice/generate/`)
    await browser.close()
}

handleArgv(process.argv.slice(2))