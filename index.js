#!/usr/bin/env node
const fs = require('fs')
const puppeteer = require("puppeteer")
const devices = require("puppeteer/DeviceDescriptors")
const path = require('path')
const program = require('commander')
const inquirer = require('inquirer')
const chalk = require('chalk')
// let pageUrl = 'http://localhost:39150/ddd.html#/airdrop'

function handleArgv(argv) {
    program
        .version('0.0.1')
        .option('-s')
        .parse(process.argv)

    inquirer.prompt([{
        type: 'input',
        name: 'printUrl',
        message: 'input url your want to print'
    }])
        .then(answers => {
            screenshot(answers.printUrl)
        })
}

async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            let scrollHeight = 0
            let distance = 100
            const timer = setInterval(() => {
                const maxHeight = document.body.scrollHeight
                window.scrollBy(0, distance)
                scrollHeight += distance
                if (scrollHeight >= maxHeight) {
                    clearInterval(timer)
                    resolve()
                }
            }, 100)
        })
    })
}

function loadAnimation() {
    return function () {
        const P = ["\\", "|", "/", "-"];
        let x = 0;
        return setInterval(() => {
            process.stdout.write("\r" + P[x++]);
            x &= 3;
        }, 100);
    }
}

async function screenshot(url, device) {
    let twirlTimer = loadAnimation()()
    try {
        fs.accessSync('./generate');
        console.log('Please wait for a moment');
    } catch (err) {
        fs.mkdirSync('./generate')
    }
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    // await page.emulate(devices['iPhone 6'])
    await page.setViewport({ width: 1920, height: 1080 })
    await page.goto(url, { waitUntil: "networkidle2" })
    await page.waitFor(5000)
    const title = await page.title()
    console.log('the website\'s title is: ', title)
    await autoScroll(page)
    await page.screenshot({
        path: `./generate/${title}_${+new Date()}.jpeg`,
        fullPage: true
    })
    clearInterval(twirlTimer)
    console.log(`${chalk.bgGreen(' Success! ')} Image is printed. you can find it in ${chalk.yellow(path.join(__dirname, 'generate'))}`)
    await browser.close()
}

handleArgv(process.argv.slice(2))