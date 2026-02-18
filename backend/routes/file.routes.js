const express = require('express');
const router = express.Router();
const controller = require('../controllers/file.controllers');
const upload = require('../middlewares/file.middlewares');
const db = require('../db/file.database');

router.get('/stream', controller.fileServe);
router.post('/upload', upload.array("files", 10), controller.uploadFiles);
router.get('/all', controller.allFiles);
router.get('/download', controller.downloadFiles);
router.delete('/', controller.deleteFiles);
router.patch('/rename', controller.renameFile);
router.patch('/:id/access-scope', controller.editFileAccessScope);
router.get('/:id/permission', controller.getFilePermissionList);
router.get('/test', db.getTest);

module.exports = router;