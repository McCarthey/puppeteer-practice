#!/usr/bin/env node

const fs = require('fs')
const puppeteer = require("puppeteer")

const pageUrl = 'http://ddos.4g518.com/static/webprofile%E6%96%B9%E6%A1%88/index.html#g=1&p=profile_____'

async function main(url) {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
	await page.goto(url)
	// await page.waitFor(2000);
	let iframe = await page.frames().find(f => f.name() === 'mainFrame');
	const eleGroup = ['u974_text', 'u976_text', 'u977_text', 'u978_text', 'u979_text', 'u980_text']
	const result = []
	eleGroup.forEach(async id => {
		await craw(iframe, id, result)
	})
	
	await page.waitFor(10000)
	
	let writerStream = fs.createWriteStream('tags_native.json');
	writerStream.write(JSON.stringify(result), 'UTF8');
	writerStream.end();
	
	browser.close()
}

async function craw(iframe, id, result) {
	let texts = await iframe.$(`#${id}`)
	const res = await iframe.evaluate(e => {
	    const res = []
	    let arr = e.childNodes
	    for (let i = 0; i < arr.length; i++) {
	        if (arr[i].innerText && arr[i].innerText !== '\n') {
	            res.push(arr[i].innerText)
	        }
	    }
	    return res
	}, texts)

	console.log(res)
	// 格式化爬取的数据
	let title = res.shift() // 第一项是标题
	// title = title.replace(/:/g, '')
	// const resObj = {
	//     title,
	//     tags: res
	// }
	result.push(res)
}

main(pageUrl)
