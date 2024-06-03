const Kryptonian = require('../models/kryptonian');
const generateApiKey = require('../utils/generateApiKey');
const generateOTP = require('../utils/generateOTP');
const sendEmail = require('../utils/sendEmail');
const jwt = require('jsonwebtoken');
const redis = require('redis');

const client = redis.createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
      host: process.env.REDIS_URI,
      port: process.env.REDIS_PORT
  }
});

class AuthService {
  static async register(email) {
    const apiKey = generateApiKey();
    const kryptonian = new Kryptonian({ email, apiKey });
    await kryptonian.save();
    const otp = generateOTP();
    await sendEmail(email, 'Confirm your email', `Your OTP is ${otp}`);
    client.set(email, 300, otp);
    return apiKey;
  }

  static async confirmEmail(email, otp) {
    const storedOtp = await new Promise((resolve, reject) => {
      client.get(email, (err, reply) => {
        if (err) reject(err);
        resolve(reply);
      });
    });
    
    if (storedOtp === otp) {
      await Kryptonian.findOneAndUpdate({ email }, { confirmed: true });
      return true;
    }
    return false;
  }

  static async initiateLogin(email) {
    const kryptonian = await Kryptonian.findOne({ email });
    if (kryptonian && kryptonian.confirmed) {
      const otp = generateOTP();
      await sendEmail(email, 'Login OTP', `Your OTP is ${otp}`);
      client.set(email, 300, otp);
      return true;
    }
    return false;
  }

  static async verifyLogin(email, otp) {
    const storedOtp = await new Promise((resolve, reject) => {
      client.get(email, (err, reply) => {
        if (err) reject(err);
        resolve(reply);
      });
    });

    if (storedOtp === otp) {
      const kryptonian = await Kryptonian.findOne({ email });
      if (kryptonian) {
        const token = jwt.sign({ id: kryptonian._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return token;
      }
    }
    return null;
  }
}

module.exports = AuthService;
