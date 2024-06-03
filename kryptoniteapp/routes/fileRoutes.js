const express = require('express');
const multer = require('multer');
const FileController = require('../controllers/fileController');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), FileController.uploadFile);
router.get('/:id', FileController.getFile);
router.get('/', FileController.getAllFiles);

module.exports = router;
