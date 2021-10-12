require('dotenv').config();
require('../db/index.js')
const express = require('express');
const app = express();
const router = require('./routes/issues')

app.use(express.static(__dirname + '/../client/public'));
app.use(express.json());

app.use('/', router)


module.exports = app;