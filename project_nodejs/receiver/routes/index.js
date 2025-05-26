const express = require('express');
const routes = express.Router();

const insertRecord = require('../controller/insertRecord');

routes.post('/receiver', insertRecord);

module.exports = routes;