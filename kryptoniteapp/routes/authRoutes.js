const express = require('express');
const AuthController = require('../controllers/authController');
const router = express.Router();

router.post('/register', AuthController.register);
router.post('/confirm-email', AuthController.confirmEmail);
router.post('/login', AuthController.initiateLogin);
router.post('/verify-login', AuthController.verifyLogin);

module.exports = router;
