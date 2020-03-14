const express = require('express');

const clienteCtrl = require('../controller/ClienteController');

const router = express.Router();

router.get('/', clienteCtrl.recuperTodos);

router.post('/', clienteCtrl.salvar);

module.exports = router;