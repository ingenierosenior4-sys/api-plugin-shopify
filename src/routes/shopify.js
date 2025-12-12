const { Router } = require('express');
const { shippingRates, createOrder } = require('../controllers/shopifyController');

const router = Router();

// Recibe body crudo (express.raw configurado en app.js)
router.post('/shipping-rates', shippingRates);
router.post('/create-order', createOrder);

module.exports = router;
