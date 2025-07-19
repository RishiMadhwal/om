const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

let latestQR = null;

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
});

client.on('qr', (qr) => {
  latestQR = qr; // save latest QR
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('✅ WhatsApp client is ready!');
});

client.on('authenticated', () => {
  console.log('🔐 Client authenticated');
});

client.on('auth_failure', (msg) => {
  console.error('❌ Authentication failed', msg);
});

client.on('disconnected', (reason) => {
  console.log('❌ Client disconnected:', reason);
});

const getLatestQR = () => latestQR;

module.exports = { client, getLatestQR };
