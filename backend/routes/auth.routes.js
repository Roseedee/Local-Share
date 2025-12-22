const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controllers');

router.post('/login', controller.login);
router.post('/generate-uuid', controller.generateUUID);
router.post('/verify-uuid', controller.verifyUUID);

module.exports = router;