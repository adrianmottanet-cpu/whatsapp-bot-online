const { Client, LocalAuth } = require('whatsapp-web.js');
const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
app.use(express.json());

// Inicialização do WhatsApp
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu'
        ]
    }
});

client.on('qr', (qr) => {
    console.log('QR RECEBIDO, escaneie no WhatsApp!');
});

client.on('ready', () => {
    console.log('WhatsApp está pronto!');
});

client.initialize();

// Rota teste
app.get('/', (req, res) => {
    res.send('Servidor rodando!');
});

// Enviar mensagem
app.post('/enviar', async (req, res) => {
    const { numero, mensagem } = req.body;

    try {
        await client.sendMessage(`${numero}@c.us`, mensagem);
        res.json({ status: 'Mensagem enviada!' });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
