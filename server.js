const { Client, LocalAuth } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')

const client = new Client({
 authStrategy: new LocalAuth(),
 puppeteer: {
  headless: true,
  executablePath: '/usr/bin/chromium-browser',
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox'
  ]
}
