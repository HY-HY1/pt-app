import request from 'supertest';
import app from '../server';  // Import your Express app

describe('Authentication Endpoints', () => {
  // Test for POST /auth/login
  it('POST /auth/login - Success', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'admin@test.com',
        password: 'Hello'
      });

    expect(res.statusCode).toEqual(200);  // Expect the request to be successful
    expect(res.body).toHaveProperty('token');  // Ensure the token is returned
  });

  // Test for POST /auth/register
  it('POST /auth/register - Success', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        email: 'newuser@test.com',
        password: 'Hello123'
      });

    expect(res.statusCode).toEqual(201);  // Expect the request to create a new user
    expect(res.body).toHaveProperty('message', 'Registration successful');
  });

  // Test for GET /auth/account
  it('GET /auth/account - Accessing account information', async () => {
    // First, login to get a valid token
    const loginRes = await request(app)
      .post('/auth/login')
      .send({
        email: 'admin@test.com',
        password: 'Hello'
      });

    const token = loginRes.body.token;  // Extract token from login response

    const res = await request(app)
      .get('/auth/account')
      .set('Authorization', `Bearer ${token}`);  // Pass the token in the Authorization header

    expect(res.statusCode).toEqual(200);  // Expect successful response
    expect(res.body).toHaveProperty('message', 'Account details');
  });
});
