require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/../client/public'));
app.use(express.json());


module.exports = app;