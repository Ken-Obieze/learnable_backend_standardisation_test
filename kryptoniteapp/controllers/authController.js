const AuthService = require('../services/authService');

class AuthController {
  static async register(req, res) {
    const { email } = req.body;
    try {
      const apiKey = await AuthService.register(email);
      res.status(201).json({ message: 'Kryptonian registered, check your email for OTP', apiKey });
    } catch (error) {
      if (error.message === 'Email already registered') {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  static async confirmEmail(req, res) {
    const { email, otp } = req.body;
    const confirmed = await AuthService.confirmEmail(email, otp);
    if (confirmed) {
      res.status(200).json({ message: 'Email confirmed, you can log in now' });
    } else {
      res.status(400).json({ message: 'Invalid OTP' });
    }
  }

  static async initiateLogin(req, res) {
    const { email } = req.body;
    const initiated = await AuthService.initiateLogin(email);
    if (initiated) {
      res.status(200).json({ message: 'OTP sent to your email' });
    } else {
      res.status(400).json({ message: 'Invalid email or unconfirmed account' });
    }
  }

  static async verifyLogin(req, res) {
    const { email, otp } = req.body;
    const token = await AuthService.verifyLogin(email, otp);
    if (token) {
      res.status(200).json({ message: 'Logged in successfully', token });
    } else {
      res.status(400).json({ message: 'Invalid OTP' });
    }
  }
}

module.exports = AuthController;
