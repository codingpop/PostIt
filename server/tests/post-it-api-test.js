import chai from 'chai';
import request from 'supertest';

import api from './../app';
import database from './../src/database';

const expect = chai.expect;

const sampleData = {
  firstName: 'Babatunde',
  lastName: 'Adeyemi',
  email: 'tunde@yahoo.com',
  phone: '08127759538',
  password: 'password1'
};

const sampleData2 = {
  firstName: 'Babatunde',
  lastName: 'Adeyemi',
  email: 'tunde@yahoo.net',
  phone: '08127759538',
  password: 'password1'
};

const sampleData3 = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: ''
};

describe('Tests for API calls', () => {
  // Wipes the database clean
  before((done) => {
    database.connection.sync({
      force: true
    }).then(() => {
      done();
    }).catch((err) => {
      done(err);
    });
  });

  describe('Test for user registration', () => {
    it('should register a new user', (done) => {
      request(api)
        .post('/api/user/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send(sampleData)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.a.property('message');
          expect(res.body.message).to.equal('Registration successful');
          expect(res.body).to.have.a.property('status');
          expect(res.body.status).to.equal(200);
          done();
        });
    }).timeout(10000);

    it('should reject registration of existing email address', (done) => {
      request(api)
        .post('/api/user/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send(sampleData)
        .expect('Content-Type', /json/)
        .expect(406)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.a.property('message');
          expect(res.body.message).to.equal(`${sampleData.email} is already registered`);
          expect(res.body.status).to.equal(406);
          done();
        });
    }).timeout(10000);

    it('should reject registration of existing phone number', (done) => {
      request(api)
        .post('/api/user/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send(sampleData2)
        .expect('Content-Type', /json/)
        .expect(406)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.a.property('message');
          expect(res.body.message).to.equal(`${sampleData2.phone} is already registered`);
          expect(res.body.status).to.equal(406);
          done();
        });
    }).timeout(10000);

    it('should reject registration of empty fields', (done) => {
      request(api)
        .post('/api/user/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send(sampleData3)
        .expect('Content-Type', /json/)
        .expect(406)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.a.property('message');
          expect(res.body).to.have.a.property('status');
          expect(res.body).to.have.a.property('errors');
          expect(res.body.errors).to.have.an('object');
          expect(res.body.errors).to.have.a.property('firstName');
          expect(res.body.errors).to.have.a.property('lastName');
          expect(res.body.errors).to.have.a.property('email');
          expect(res.body.errors).to.have.a.property('phone');
          expect(res.body.errors.firstName).to.equal('Invalid input');
          expect(res.body.message).to.equal('Please check your submission');
          expect(res.body.status).to.equal(406);
          done();
        });
    }).timeout(10000);
  });

  describe('Test for user login', () => {
    it('should log user in', (done) => {
      request(api)
        .post('/api/user/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          email: sampleData.email,
          password: sampleData.password
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.a.property('message');
          expect(res.body.message).to.equal('Welcome Babatunde');
          expect(res.body.status).to.equal(200);
          done();
        });
    }).timeout(10000);

    it('should reject logging in with unregistered email', (done) => {
      request(api)
        .post('/api/user/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          email: sampleData2.email,
          password: sampleData.password
        })
        .expect('Content-Type', /json/)
        .expect(401)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.a.property('message');
          expect(res.body).to.have.a.property('status');
          expect(res.body.message).to.equal('Email is not registered');
          expect(res.body.status).to.equal(401);
          done();
        });
    }).timeout(10000);

    it('should reject logging in with a wrong password', (done) => {
      request(api)
        .post('/api/user/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          email: sampleData.email,
          password: 'aooiaudaus'
        })
        .expect('Content-Type', /json/)
        .expect(401)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.a.property('message');
          expect(res.body).to.have.a.property('status');
          expect(res.body.message).to.equal('You have entered a wrong password');
          expect(res.body.status).to.equal(401);
          done();
        });
    }).timeout(10000);
  });
});
