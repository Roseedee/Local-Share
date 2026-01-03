const express = require('express')
const route = express.Router();

const controller = require('../controllers/storage.controllers');

route.post('/info', controller.storageInfo);

module.exports = route;