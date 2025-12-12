const crypto = require('crypto');

const shippingRates = (req, res) => {
  // req.body será Buffer cuando usemos express.raw
  console.log('Received raw body:', req.body);
  const rawBuffer = req.body;
  const rawBody = rawBuffer && Buffer.isBuffer(rawBuffer)
    ? rawBuffer.toString('utf8')
    : (typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {}));

  const hmacHeader = req.headers['x-shopify-hmac-sha256'];
  const secret = process.env.SHOPIFY_API_SECRET || '';

  // Aquí podrías parsear rawBody si necesitas usar los datos de entrada
  // const body = JSON.parse(rawBody);

  return res.json({
    rates: [
      {
        service_name: "Express CG",
        service_code: "EXP",
        total_price: "1500",
        currency: "USD",
        description: "Entrega en 1-2 días"
      },
      {
        service_name: "Económico CGl",
        service_code: "ECO",
        total_price: "800",
        currency: "USD",
        description: "Entrega en 5-7 días"
      }
    ]
  });
};

const createOrder = (req, res) => {
  // Lógica para crear una orden en Shopify
  console.log("Oreder creation endpoint hit");
  console.log('Creating order with data:', req.body);
  res.status(201).json({ message: 'Order Created Successfully' });
}

module.exports = { shippingRates, createOrder };
