// 1. Відповідь повина мати статус-код 200

// 2. У відповіді повинен повертатися токен

// 3. У відповіді повинен повертатися об'єкт user з 2 полями
// email и subscription з типом даних String

const mongoose = require('mongoose');
const request = require('supertest');
require('dotenv').config();

const app = require('../app');
const { DB_HOST } = process.env;

mongoose.set('strictQuery', true);

const validUserLoginData = {
  email: 'mariia_liova1@ukr.net',
  password: '123456',
};

describe('test login route', () => {
  beforeAll(async () => {
    try {
      await mongoose.connect(DB_HOST);
      app.listen(3000);
    } catch (error) {
      process.exit(1);
    }
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  let res;
  beforeEach(async () => {
    res = await request(app).post('/api/auth/login').send(validUserLoginData);
  });

  test('status code - 200', async () => {
    expect(res.statusCode).toBe(200);
  });

  test('token is present', async () => {
    expect(res.body.token).toBeDefined();
  });

  test('obj user - present', async () => {
    expect(res.body.user).toBeDefined();
  });

  test('user.email - present', async () => {
    expect(res.body.user.email).toBeDefined();
  });

  test('user.email - String', async () => {
    const email = res.body.user.email;
    expect(typeof email === 'string').toBe(true);
  });

  test('user.subscription - present', async () => {
    expect(res.body.user.subscription).toBeDefined();
  });

  test('user.subscription - String', async () => {
    const subscription = res.body.user.subscription;
    expect(typeof subscription === 'string').toBe(true);
  });
});
