const Kryptonian = require('../models/kryptonian');
const generateApiKey = require('../utils/generateApiKey');
const generateOTP = require('../utils/generateOTP');
const sendEmail = require('../utils/sendEmail');
const jwt = require('jsonwebtoken');
const NodeCache = require("node-cache");

const cache = new NodeCache({ stdTTL: 300 }); // Set default TTL to 5 minutes

class AuthService {
  static async register(email) {
    const apiKey = generateApiKey();
    const kryptonian = new Kryptonian({ email, apiKey });

    try {
      await kryptonian.save();
    } catch (error) {
      if (error.code === 11000) { // Duplicate key error
        throw new Error('Email already registered');
      }
      throw error; // Throw other errors
    }

    const otp = generateOTP();
    await sendEmail(email, 'Confirm your email', `Your OTP is ${otp}`);
    cache.set(email, otp);
    return apiKey;
  }

  static async confirmEmail(email, otp) {
    const storedOtp = cache.get(email);
    if (storedOtp === otp) {
      await Kryptonian.findOneAndUpdate({ email }, { confirmed: true });
      cache.del(email); // Remove OTP from cache after confirmation
      return true;
    }
    return false;
  }

  static async initiateLogin(email) {
    const kryptonian = await Kryptonian.findOne({ email });
    if (kryptonian && kryptonian.confirmed) {
      const otp = generateOTP();
      await sendEmail(email, 'Login OTP', `Your OTP is ${otp}`);
      cache.set(email, otp);
      return true;
    }
    return false;
  }

  static async verifyLogin(email, otp) {
    const storedOtp = cache.get(email);
    if (storedOtp === otp) {
      const kryptonian = await Kryptonian.findOne({ email });
      if (kryptonian) {
        const token = jwt.sign({ id: kryptonian._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        cache.del(email); // Remove OTP from cache after verification
        return token;
      }
    }
    return null;
  }
}

module.exports = AuthService;
