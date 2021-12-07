const express = require('express')
const pa11y = require('pa11y')
const puppeteer = require('puppeteer')
const cors = require('cors')

const PORT = process.env.PORT || 5000

const app = express()

const corsOption = {
    origin: '*',
    optionSuccessStatus: 200
}

app.use(cors(corsOption));

app.get('/api/pa11y', async (req, res) => {
  if (!req.query.url) {
    res.status(400).json({ error: 'url is required' })
  } else {
    const browser = await puppeteer.launch({
      ignoreHTTPSErrors: true,
      args: [
        '--disable-dev-shm-usage',
        '--no-sandbox',
        '--incognito'
      ],
    });
    const results = await pa11y(req.query.url, {
      browser: browser
    });
    browser.close();
    res.status(200).json(results)
  }
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
