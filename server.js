const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Bot WhatsApp Online funcionando 🚀');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', qr => {
    console.log('Escaneie o QR Code abaixo:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('WhatsApp conectado com sucesso!');
});

client.on('message', async message => {

    if (message.body.toLowerCase() === 'oi') {
        message.reply('Olá 👋 Seja bem-vindo!\n\nQuer conhecer nossos planos de internet? Digite:\n1️⃣ Planos\n2️⃣ Falar com atendente');
    }

    if (message.body === '1') {
        message.reply('🔥 Plano 400MB por R$89,90\nInstalação grátis!\n\nQuer contratar? Digite SIM');
    }

    if (message.body.toLowerCase() === 'sim') {
        message.reply('Perfeito! Me envie seu nome completo e endereço para cadastro 😊');
    }
});

client.initialize();
