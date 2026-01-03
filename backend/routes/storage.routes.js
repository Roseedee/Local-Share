const express = require('express')
const route = express.Router();

const controller = require('../controllers/storage.controllers');

route.get('/info', controller.storageInfo);

module.exports = route;