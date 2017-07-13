import chai from 'chai';
import request from 'supertest';
import session from 'supertest-session';

import api from './../server/app';
import database from './../server/src/database';
import testData from './test-data';

let testSession;

const expect = chai.expect;

/**
 * Routes test
 */
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
        .send(testData.sampleData)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body.message).to.equal('Registration successful');
          done();
        });
    });

    it('should reject registration of existing email address', (done) => {
      request(api)
        .post('/api/user/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send(testData.sampleData)
        .expect('Content-Type', /json/)
        .expect(406)
        .end((err, res) => {
          expect(res.body.message).to.equal(`${testData.sampleData.email} is already registered`);
          done();
        });
    });

    it('should reject registration of existing phone number', (done) => {
      request(api)
        .post('/api/user/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send(testData.sampleData2)
        .expect('Content-Type', /json/)
        .expect(406)
        .end((err, res) => {
          expect(res.body.message).to.equal(`${testData.sampleData2.phone} is already registered`);
          done();
        });
    });

    it('should reject registration of empty fields', (done) => {
      request(api)
        .post('/api/user/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send(testData.sampleData3)
        .expect('Content-Type', /json/)
        .expect(406)
        .end((err, res) => {
          expect(res.body.errors.firstName).to.equal('Invalid input');
          expect(res.body.errors.lastName).to.equal('Invalid input');
          expect(res.body.errors.email).to.equal('Invalid input');
          expect(res.body.errors.phone).to.equal('Invalid input');
          expect(res.body.message).to.equal('Please check your submission');
          done();
        });
    });

    it('should reject password less than 8 characters', (done) => {
      request(api)
      .post('/api/user/signup')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send(testData.sampleData4)
      .expect(406)
      .end((err, res) => {
        expect(res.body.message).to.equal('Please enter a password of 8 characters or more');
        done();
      });
    });
  });

  describe('Test for user login', () => {
    it('should prevent creating a group without logging in first', (done) => {
      request(api)
        .post('/api/group')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          name: 'A new group'
        })
        .expect('Content-Type', /json/)
        .expect(401)
        .end((err, res) => {
          expect(res.body.message).to.equal('You are not logged in');
          done();
        });
    });

    it('should prevent posting a message without logging in first', (done) => {
      request(api)
        .post('/api/group')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          message: 'A new group',
          priority: 'urgent'
        })
        .expect('Content-Type', /json/)
        .expect(401)
        .end((err, res) => {
          expect(res.body.message).to.equal('You are not logged in');
          done();
        });
    });

    it('should prevent retrieving messages without logging in first', (done) => {
      request(api)
        .get('/api/group/988ac047/messages')
        .set('Accept', 'application/x-www-form-urlencoded')
        .expect('Content-Type', /json/)
        .expect(401)
        .end((err, res) => {
          expect(res.body.message).to.equal('You are not logged in');
          done();
        });
    });

    it('should reject logging in with unregistered email', (done) => {
      request(api)
        .post('/api/user/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          email: testData.sampleData2.email,
          password: testData.sampleData.password
        })
        .expect('Content-Type', /json/)
        .expect(401)
        .end((err, res) => {
          expect(res.body.message).to.equal('Email is not registered');
          done();
        });
    });

    it('should reject logging in with a wrong password', (done) => {
      request(api)
        .post('/api/user/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          email: testData.sampleData.email,
          password: 'aooiaudaus'
        })
        .expect('Content-Type', /json/)
        .expect(401)
        .end((err, res) => {
          expect(res.body.message).to.equal('You have entered a wrong password');
          done();
        });
    });
  });

  describe('Test for group endpoints', () => {
    let authSession;
    let groupId;

    // Helps persist session for each test
    beforeEach((done) => {
      testSession = session(api);
      testSession.post('/api/user/signin')
        .send({
          email: testData.sampleData.email,
          password: testData.sampleData.password
        })
        .expect(200)
        .end(() => {
          authSession = testSession;
          done();
        });
    });

    const group = {
      name: 'A new group'
    };

    it('should log a user in', (done) => {
      authSession.post('/api/user/signin')
        .send({
          email: testData.sampleData.email,
          password: testData.sampleData.password
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body.message).to.equal('Welcome Babatunde');
          authSession = testSession;
          done();
        });
    });

    it('should create a new group', (done) => {
      authSession.post('/api/group/')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send(group)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          groupId = res.body.groupId;
          expect(res.body.message).to.equal(`${group.name} created`);
          done();
        });
    });

    it('should reject the name of already existing group', (done) => {
      authSession.post('/api/group/')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send(group)
        .expect('Content-Type', /json/)
        .expect(406)
        .end((err, res) => {
          expect(res.body.message).to.equal(`${group.name} already exists`);
          done();
        });
    });

    it('should reject invalid group name', (done) => {
      authSession.post('/api/group/')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({ name: '' })
        .expect('Content-Type', /json/)
        .expect(406)
        .end((err, res) => {
          expect(res.body.message).to.equal('Please enter a valid group name');
          done();
        });
    });

    it('should post message to any group a user creates', (done) => {
      authSession.post(`/api/group/${groupId}/message`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          message: 'Are we all coding today?',
          priority: 'critical'
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body.message).to.equal('Message posted');
          done();
        });
    });

    it('should reject posting to non-existent groups', (done) => {
      authSession.post(`/api/group/${groupId}788/message`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          message: 'Are we all coding today?',
          priority: 'critical'
        })
        .expect('Content-Type', /json/)
        .expect(404)
        .end((err, res) => {
          expect(res.body.message).to.equal('Group does not exist');
          done();
        });
    });
  });
});
