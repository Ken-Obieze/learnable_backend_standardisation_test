const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const Kryptonian = require('../models/kryptonian');
const File = require('../models/file');

let mongoServer;
let apiKey;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  // Register a user and get API key
  const res = await request(app)
    .post('/api/v1/auth/register')
    .send({
      email: 'ejiofor.obieze@gmail.com',
    });
  apiKey = res.body.apiKey;

  // Simulate email confirmation step
  const user = await Kryptonian.findOne({ email: 'ejiofor.obieze@gmail.com' });
  user.otp = '123456'; // Simulate OTP generation with manual assignment
  await request(app)
    .post('/api/v1/auth/confirm-email')
    .send({
      email: 'ejiofor.obieze@gmail.com',
      otp: '123456'
    });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('File Endpoints', () => {
  it('should upload an image file', async () => {
    const res = await request(app)
      .post('/api/v1/files/upload')
      .set('x-api-key', apiKey)
      .attach('file', 'test/test.png');
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('file');
  });

  it('should retrieve the uploaded file by ID', async () => {
    const file = await File.findOne({ kryptonian: 'ejiofor.obieze@gmail.com' });
    const res = await request(app).get(`/api/v1/files/${file._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('file');
  });

  it('should retrieve all files', async () => {
    const res = await request(app).get('/api/v1/files');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('files');
    expect(res.body.files.length).toBeGreaterThan(0);
  });
});
