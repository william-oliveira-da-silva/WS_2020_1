const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const bodyParser = require('body-parser');

require('./db/config');

const app = express();

app.use(cors());
app.use(logger('dev'));

/**
 * Define que os dados recebidos no
 * corpo da requisição devem estar
 * no formato JSON
 */
 app.use(bodyParser.json());

 /**
  * Protege os acessos ao banco de dados
  * contra injeções de consultas maliciosas
  */
 app.use(mongoSanitize());

 /**
  * Para teste inicial
  */
 app.get('/clientes', require('./routes/clientes'));

 module.exports = app;