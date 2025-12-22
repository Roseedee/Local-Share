const express = require('express');
const router = express.Router();
const controller = require('../controllers/client.controllers');

router.post('/get-devices', controller.getDevices);
router.post('/edit-device-name', controller.editDeviceName);

module.exports = router;