const express = require('express')
const ssr = require('./ssr')
const chalk = require('chalk')

const app = express()

app.get('/', async (req, res, next) => {
    const { html, ttRenderMs } = await ssr('http://localhost:8099/index.html')
    res.set('Server-Timing', `Prerender;dur=${ttRenderMs};desc="Headless render time (ms)"`)
    return res.status(200).send(html)
})

app.listen(8088, () => console.log(chalk.green('Server started, press Ctrl+C to quit')));
