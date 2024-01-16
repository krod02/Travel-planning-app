import request from 'supertest';
import express from 'express';
import controller from '../../controllers/User';

jest.mock('../../controllers/User', () => ({
  ...jest.requireActual('../../controllers/User'),
  register: jest.fn(),
}));

describe('POST /register', () => {
  it('successfully registers a new user', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'password',
      firstName: 'John',
      lastName: 'Doe'
    };

    controller.register.mockResolvedValue({
      id: 1,
      email: userData.email,
      name: `${userData.firstName} ${userData.lastName}`
    });

    const response = await request(app)
      .post('/register')
      .send(userData);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('email', userData.email);
    expect(controller.register).toHaveBeenCalledWith(userData.email, userData.password, userData.firstName, userData.lastName);
  });

});

describe('POST /login', () => {
    it('successfully logs in a user', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password',
      };
  
      const mockResponse = {
        data: { /* user data */ },
        token: 'fakeToken'
      };
  
      controller.login.mockResolvedValue(mockResponse);
  
      const response = await request(app)
        .post('/login')
        .send(userData);
  
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockResponse.data);
      expect(response.headers).toHaveProperty('set-cookie');
      expect(controller.login).toHaveBeenCalledWith(userData.email, userData.password);
    });
  
  });
  

  describe('GET /data', () => {
    it('successfully retrieves user data', async () => {
      const email = 'test@example.com';
      const mockUserData = { /* structured user data */ };
  
      controller.getAllUserData.mockResolvedValue(mockUserData);
  
      const response = await request(app)
        .get(`/data?email=${email}`);
  
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockUserData);
      expect(controller.getAllUserData).toHaveBeenCalledWith(email);
    });
  
    // Add more tests for scenarios like user data not found or database errors
  });
  
