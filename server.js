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
})

client.on('qr', (qr) => {
  console.log('Escaneie o QR abaixo:')
  qrcode.generate(qr, { small: true })
})

client.on('ready', () => {
  console.log('BOT ONLINE')
})

client.on('message', async (msg) => {
  if (msg.body === 'ping') {
    msg.reply('pong')
  }
})

client.initialize()
