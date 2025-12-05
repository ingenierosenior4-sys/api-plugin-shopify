const express = require('express');
const routes = require('./routes');
const shopifyRouter = require('./routes/shopify');
const app = express();

// Para la ruta webhook de Shopify necesitamos el body crudo para validar HMAC.
// Registramos express.raw únicamente para esa ruta específica antes del parser JSON global.
app.use('/api/shopify/shipping-rates', express.raw({ type: 'application/json' }));

app.use(express.json());

// CORS middleware: permitir acceso desde cualquier origen
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  // responder a preflight
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// Montamos el router de Shopify antes de las demás rutas de API (ya usa raw para la ruta específica)
app.use('/api/shopify', shopifyRouter);

app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;