require('dotenv').config();
const express = require('express');
const app = express();

// WhatsApp client initializer + QR getter
const { client, getLatestQR } = require('./client');

// Middleware to parse JSON
app.use(express.json());

// ✅ User Routes
const userRoutes = require('./src/routes/userRoutes');
app.use('/api/users', userRoutes);

// ✅ QR Code Route
app.get('/api/qr', (req, res) => {
  const qr = getLatestQR();
  if (qr) {
    res.json({ qr });
  } else {
    res.status(404).json({ error: 'QR not ready yet' });
  }
});

// ✅ Health check
app.get('/', (req, res) => {
  res.send('✅ Backend running');
});

// ❌ 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ❌ Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 🚀 Start Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);

  // 🟢 Start WhatsApp client
  client.initialize();
});
