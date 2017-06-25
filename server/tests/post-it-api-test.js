import chai from 'chai';
import request from 'supertest';

import api from './../app';

describe('Tests for API calls', () => {
  describe('Tesh user registration', () => {
    const userData = {
      firstName: 'Babatunde',
      lastName: 'Adeyemi',
      email: 'tunde@yahoo.com',
      phone: '78484920202',
      password: 'password1'
    };

    it('should register a new user', () => {
      request(api)
        .post('/api/user/signup', userData)
        .set('accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
    });

    it('should register a new user', () => {
      request(api)
        .post('/api/user/signup', userData)
        .set('accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(403);
    });
  });
});
