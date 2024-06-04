const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const User = require('../models/krptonian');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Auth Endpoints', () => {
  it('should register a new Kryptonian', async () => {
    const res = await request(app)
      .post('api/v1/auth/register')
      .send({
        email: 'ejiofor.obieze@gmail.com'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('apiKey');
  });

  it('should confirm email with OTP', async () => {
    const user = await User.findOne({ email: 'ejiofor.obieze@gmail.com' });
    user.otp = '158466'; // was set maually
    await user.save();

    const res = await request(app)
      .post('api/v1/auth/confirm-email')
      .send({
        email: 'ejiofor.obieze@gmail.com',
        otp: '158466'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
  });

  it('should login with OTP', async () => {
    const res = await request(app)
      .post('api/v1/auth/login')
      .send({
        email: 'ejiofor.obieze@gmail.com',
        otp: '158466'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('token');
  });
});
