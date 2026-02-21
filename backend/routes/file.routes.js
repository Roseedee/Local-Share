const express = require('express');
const router = express.Router();
const controller = require('../controllers/file.controllers');
const upload = require('../middlewares/file.middlewares');

//optimize: split into multiple routes for better maintainability
router.post('/', upload.array("files", 10), controller.uploadFiles);      //upload files
router.get('/', controller.allFiles);
router.get('/:token/preview', controller.filePreview);



//wait for optimize: split into multiple routes for better maintainability
router.get('/download', controller.downloadFiles);
router.delete('/', controller.deleteFiles);
router.patch('/rename', controller.renameFile);
router.patch('/:id/access-scope', controller.editFileAccessScope);
router.get('/:id/permission', controller.getFilePermissionList);
router.post('/:id/permission', controller.addFilePermission);
router.delete('/:id/permission', controller.deleteFilePermission);

module.exports = router;