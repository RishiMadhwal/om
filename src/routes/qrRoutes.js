const express = require('express');
const router = express.Router();
const { getLatestQR } = require('../../client/index'); // correct relative path

router.get('/', (req, res) => {
  const qr = getLatestQR();
  if (qr) {
    res.json({ qr });
  } else {
    res.status(404).json({ error: 'QR not ready yet' });
  }
});

module.exports = router;
