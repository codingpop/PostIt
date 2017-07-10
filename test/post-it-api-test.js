import chai from 'chai';
import request from 'supertest';
import session from 'supertest-session';

import api from './../server/app';
import database from './../server/src/database';

let testSession = null;

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
    });

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
    });

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
    });

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
          expect(res.body.errors.lastName).to.equal('Invalid input');
          expect(res.body.errors.email).to.equal('Invalid input');
          expect(res.body.errors.phone).to.equal('Invalid input');
          expect(res.body.message).to.equal('Please check your submission');
          expect(res.body.status).to.equal(406);
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
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.a.property('message');
          expect(res.body).to.have.a.property('status');
          expect(res.body.status).to.equal(401);
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
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.a.property('message');
          expect(res.body).to.have.a.property('status');
          expect(res.body.status).to.equal(401);
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
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.a.property('message');
          expect(res.body).to.have.a.property('status');
          expect(res.body.status).to.equal(401);
          expect(res.body.message).to.equal('You are not logged in');
          done();
        });
    });

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
    });

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
          email: sampleData.email,
          password: sampleData.password
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
          email: sampleData.email,
          password: sampleData.password
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.a.property('message');
          expect(res.body).to.have.a.property('status');
          expect(res.body.status).to.equal(200);
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
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.a.property('message');
          expect(res.body).to.have.a.property('status');
          expect(res.body).to.have.a.property('groupId');
          expect(res.body.status).to.equal(200);
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
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.a.property('message');
          expect(res.body).to.have.a.property('status');
          expect(res.body.status).to.equal(406);
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
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.a.property('message');
          expect(res.body).to.have.a.property('status');
          expect(res.body.status).to.equal(406);
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
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.a.property('message');
          expect(res.body).to.have.a.property('status');
          expect(res.body.status).to.equal(200);
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
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.a.property('message');
          expect(res.body).to.have.a.property('status');
          expect(res.body.status).to.equal(404);
          expect(res.body.message).to.equal('Group does not exist');
          done();
        });
    });
  });
});
