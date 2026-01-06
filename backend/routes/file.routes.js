const express = require('express');
const router = express.Router();
const controller = require('../controllers/file.controllers');
const upload = require('../middlewares/file.middlewares');

router.get('/stream', controller.fileServe);
router.post('/upload', upload.array("files", 10), controller.uploadFiles);
router.post('/all', controller.allFiles);
router.post('/download', controller.downloadFiles);
router.post('/delete', controller.deleteFiles);
router.post('/rename', controller.renameFile);
router.patch('/:id/access-scope', controller.editFileAccessScope);

module.exports = router;