const { Router } = require('express');
const { shippingRates } = require('../controllers/shopifyController');

const router = Router();

// Recibe body crudo (express.raw configurado en app.js)
router.post('/shipping-rates', shippingRates);

module.exports = router;
