const express = require('express')
const app = express();
const { startBrowser, stopBrowser, getURL } = require('./functions')

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use('/start', async (req, res) => {
    let result = await startBrowser(req.query.browser, req.query.url);
    res.send(result);
})

app.use('/stop', async (req, res) => {
    let result = await stopBrowser(req.query.browser);
    res.send(result);
})

app.use('/geturl', async (req, res) => {
    let result = await getURL(req.query.browser);
    res.send(result.stdout);
})

app.use('/cleanup', async (req, res) => {
    let result = await cleanUp(req.query.browser);
    res.send(result);
})



app.listen(3000, () => {
    console.log('App Running at port 3000...')
})