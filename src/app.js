const express = require('express');
const routes = require('./routes');
const app = express();

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

app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;