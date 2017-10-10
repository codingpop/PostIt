import chai from 'chai';
import request from 'supertest';
import 'babel-polyfill';

import app from './../app';
import database from './../server/src/database';
import testData from './testData';

const expect = chai.expect;

describe('Given an API request', () => {
  before(async () => {
    await database.connection.sync({ force: true });
  });

  describe('When the request contains appropriate user registration data', () => {
    it('Then the user is registered', async () => {
      await request(app)
        .post('/api/v1/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send(testData.newUser1)
        .expect(201)
        .then((response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('Registration successful');
        });
    });

    it('Then the user is registered', async () => {
      await request(app)
        .post('/api/v1/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send(testData.newUser2)
        .expect(201)
        .then((response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('Registration successful');
        });
    });

    it('Then the user is registered', async () => {
      await request(app)
        .post('/api/v1/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send(testData.newUser3)
        .expect(201)
        .then((response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('Registration successful');
        });
    });

    it('Then the user is registered', async () => {
      await request(app)
        .post('/api/v1/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send(testData.newUser4)
        .expect(201)
        .then((response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('Registration successful');
        });
    });
  });

  describe('When the request contains existing user registration data', () => {
    it('Then the user data is rejected', async () => {
      await request(app)
        .post('/api/v1/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send(testData.newUser1)
        .expect(409)
        .then((response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.message)
            .to.equal(`${testData.newUser1.userName} already exists`);
        });
    });
  });

  describe('When the request contains malformed user registration data', () => {
    it('Then the request is rejected', async () => {
      await request(app)
        .post('/api/v1/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send(testData.malformedUser1)
        .expect(400)
        .then((response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.message)
            .to.equal('Username is required');
        });
    });

    it('Then the request is rejected', async () => {
      await request(app)
        .post('/api/v1/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send(testData.malformedUser6)
        .expect(400)
        .then((response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.message)
            .to.equal('Invalid email address');
        });
    });

    it('Then the request is rejected', async () => {
      await request(app)
        .post('/api/v1/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send(testData.malformedUser5)
        .expect(400)
        .then((response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.message)
            .to.equal('Password must be 8 characters or more');
        });
    });

    it('Then the request is rejected', async () => {
      await request(app)
        .post('/api/v1/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send(testData.malformedUser2)
        .expect(400)
        .then((response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.message)
            .to.equal('Email is required');
        });
    });

    it('Then the request is rejected', async () => {
      await request(app)
        .post('/api/v1/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send(testData.malformedUser3)
        .expect(400)
        .then((response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.message)
            .to.equal('Phone is required');
        });
    });

    it('Then the request is rejected', async () => {
      await request(app)
        .post('/api/v1/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send(testData.malformedUser4)
        .expect(400)
        .then((response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.message)
            .to.equal('Password is required');
        });
    });
  });

  let token;
  let token2;
  let userId;

  describe('When the request contains user login data', () => {
    it('Then the user data and token is generated', async () => {
      await request(app)
        .post('/api/v1/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          credential: testData.newUser1.userName,
          password: testData.newUser1.password
        })
        .expect(200)
        .then((response) => {
          token = response.body.token;
          userId = response.body.user.userId;

          expect(response.body).to.be.an('object');
          expect(response.body.user).to.be.an('object');
          expect(response.body.user.userName).to.equal(testData.newUser1.userName);
          expect(response.body.user.email).to.equal(testData.newUser1.email);
          expect(response.body.token).to.be.a('string');
          expect(response.body.token.length).to.be.greaterThan(10);
        });
    });

    it('Then the user data and token is generated', async () => {
      await request(app)
        .post('/api/v1/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          credential: testData.newUser2.userName,
          password: testData.newUser2.password
        })
        .expect(200)
        .then((response) => {
          token2 = response.body.token;

          expect(response.body).to.be.an('object');
          expect(response.body.user).to.be.an('object');
          expect(response.body.user.userName).to.equal(testData.newUser2.userName);
          expect(response.body.user.email).to.equal(testData.newUser2.email);
          expect(response.body.token).to.be.a('string');
          expect(response.body.token.length).to.be.greaterThan(10);
        });
    });
  });

  describe('When the request contains malformed login data', () => {
    it('Then the request is rejected', async () => {
      await request(app)
        .post('/api/v1/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          credential: '',
          password: ''
        })
        .expect(400)
        .then((response) => {
          expect(response.body.message).to.equal('You userName (or email) and password are required');
        });
    });

    it('Then the request is rejected', async () => {
      await request(app)
        .post('/api/v1/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          credential: testData.newUser1.userName,
          password: 'jfo9fdusoifoafjaklfja'
        })
        .expect(401)
        .then((response) => {
          expect(response.body.message).to.equal('Wrong password');
        });
    });

    it('Then the request is rejected', async () => {
      await request(app)
        .post('/api/v1/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          credential: 'opipoipo',
          password: 'jfo9fdusoifoafjaklfja'
        })
        .expect(404)
        .then((response) => {
          expect(response.body.message).to.equal('You are not registered');
        });
    });
  });

  let groupId;
  let groupId2;

  describe('When the request contains appropriate group creation data', () => {
    it('Then the group is created', async () => {
      await request(app)
        .post('/api/v1/groups')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('token', token)
        .send(testData.newGroupData1)
        .expect(201)
        .then((response) => {
          groupId = response.body.group.groupId;

          expect(response.body).to.be.an('object');
          expect(response.body.group).to.be.an('object');
          expect(response.body.group.groupId).to.be.a('string');
          expect(response.body.group.groupId.length).to.be.greaterThan(5);
          expect(response.body.group.name).to.equal(testData.newGroupData1.name);
        });
    });

    it('Then the group is created', async () => {
      await request(app)
        .post('/api/v1/groups')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('token', token2)
        .send(testData.newGroupData2)
        .expect(201)
        .then((response) => {
          groupId2 = response.body.group.groupId;
          expect(response.body).to.be.an('object');
          expect(response.body.group).to.be.an('object');
          expect(response.body.group.groupId).to.be.a('string');
          expect(response.body.group.groupId.length).to.be.greaterThan(5);
          expect(response.body.group.name).to.equal(testData.newGroupData2.name);
        });
    });
  });

  describe('When the request contains existing group creation data', () => {
    it('Then the request is rejected', async () => {
      await request(app)
        .post('/api/v1/groups')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('token', token)
        .send(testData.newGroupData1)
        .expect(406)
        .then((response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('Group already exists');
        });
    });
  });

  describe('When the request contains malformed group creation data', () => {
    it('Then the request is rejected', async () => {
      await request(app)
        .post('/api/v1/groups')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send(testData.newGroupData1)
        .expect(403)
        .then((response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('You are not logged in');
        });
    });

    it('Then the request is rejected', async () => {
      await request(app)
        .post('/api/v1/groups')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('token', 'nonsense')
        .send(testData.newGroupData1)
        .expect(400)
        .then((response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('Invalid authentication token');
        });
    });

    it('Then the request is rejected', async () => {
      await request(app)
        .post('/api/v1/groups')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send(testData.malformedGroup1)
        .set('token', token)
        .expect(400)
        .then((response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('Both name and description are required');
        });
    });
  });

  describe('When the request is a get request for groups', () => {
    it('Then the groups a user belongs to is returned', async () => {
      await request(app)
        .get('/api/v1/groups')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('token', token)
        .expect(200)
        .then((response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.totalGroups).to.equal(1);
          expect(response.body.groups).to.be.an('array');
          expect(response.body.groups[0].groupId).to.equal(groupId);
        });
    });

    it('Then the groups a user belongs to is returned', async () => {
      await request(app)
        .get('/api/v1/groups?limit=2&offset=0')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('token', token)
        .expect(200)
        .then((response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.totalGroups).to.equal(1);
          expect(response.body.groups).to.be.an('array');
          expect(response.body.groups[0].groupId).to.equal(groupId);
        });
    });
  });

  describe('When the request contains user data to be added to a group', () => {
    it("Then the group's members details is returned", async () => {
      await request(app)
        .post(`/api/v1/groups/${groupId}/users`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('token', token)
        .send(testData.addUsers)
        .expect(200)
        .then((response) => {
          expect(response.body.newMembers).to.be.an('array');
          expect(response.body.newMembers[0][0].groupGroupId).to.equal(groupId);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('1 member added');
        });
    });

    it("Then the group's members details is returned", async () => {
      await request(app)
        .post(`/api/v1/groups/${groupId}/users`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('token', token)
        .send(testData.addUsers2)
        .expect(200)
        .then((response) => {
          expect(response.body.newMembers).to.be.an('array');
          expect(response.body.newMembers[0][0].groupGroupId).to.equal(groupId);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('2 members added');
        });
    });
  });

  describe('When the request contains existing user data to be added to a group', () => {
    it('Then the request should be rejected', async () => {
      await request(app)
        .post(`/api/v1/groups/${groupId}/users`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('token', token)
        .send(testData.addUsers)
        .expect(406)
        .then((response) => {
          expect(response.body.message).to.equal('User(s) are already added');
        });
    });
  });

  describe('When the request contains a malformed user data to be added to a group', () => {
    it("Then the group's members details is returned", async () => {
      await request(app)
        .post(`/api/v1/groups/${groupId}/users`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('token', token)
        .send({ users: ['dfadjflafjalf', 'adsjfklajfiojaiod'] })
        .expect(404)
        .then((response) => {
          expect(response.body.message).to.equal("Users don't exist");
        });
    });

    it("Then the group's members details is returned", async () => {
      await request(app)
        .post(`/api/v1/groups/${groupId}/users`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('token', token)
        .send({ users: '' })
        .expect(400)
        .then((response) => {
          expect(response.body.message).to.equal('Usernames or emails are required');
        });
    });
  });

  describe('When request contains non-existent groupId', () => {
    it('Then the request is rejected', async () => {
      await request(app)
        .get('/api/v1/groups/bdda3646-025f-415a-b626-f5546ab11d44/messages')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('token', token)
        .expect(404)
        .then((response) => {
          expect(response.body.message).to.equal("Group doesn't exist");
        });
    });
  });

  describe('When request contains non-existent groupId', () => {
    it('Then the request is rejected', async () => {
      await request(app)
        .get('/api/v1/groups/bdda3646-025f-415a-b626-f5546/messages')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('token', token)
        .expect(400)
        .then((response) => {
          expect(response.body.message).to.equal('Invalid groupId');
        });
    });
  });

  describe('When request contains unauthorized groupId', () => {
    it('Then the request is rejected', async () => {
      await request(app)
        .get(`/api/v1/groups/${groupId2}/messages`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('token', token)
        .expect(401)
        .then((response) => {
          expect(response.body.message).to.equal("You don't belong to this group");
        });
    });
  });

  describe('When the request is a get request for a particular group members', () => {
    it("Then the group's members details is returned", async () => {
      await request(app)
        .get(`/api/v1/groups/${groupId}/users`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('token', token)
        .expect(200)
        .then((response) => {
          expect(response.body.users).to.be.an('array');
          expect(response.body.users[0].userId).to.equal(userId);
          expect(response.body.users[1].phone).to.equal(testData.newUser2.phone);
        });
    });
  });

  describe('When the request contains a message to a particular group', () => {
    it("Then the message's data is returned", async () => {
      await request(app)
        .post(`/api/v1/groups/${groupId}/messages`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('token', token)
        .send(testData.message1)
        .expect(200)
        .then((response) => {
          expect(response.body.message).to.be.an('object');
          expect(response.body.message.groupId).to.equal(groupId);
          expect(response.body.message.author).to.equal(userId);
          expect(response.body.message.body).to.equal(testData.message1.body);
        });
    });

    it("Then the message's data is returned", async () => {
      await request(app)
        .post(`/api/v1/groups/${groupId}/messages`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('token', token)
        .send(testData.message2)
        .expect(200)
        .then((response) => {
          expect(response.body.message).to.be.an('object');
          expect(response.body.message.groupId).to.equal(groupId);
          expect(response.body.message.author).to.equal(userId);
          expect(response.body.message.body).to.equal(testData.message2.body);
        });
    });
  });

  describe('When the request contains a malformed message to a particular group', () => {
    it('Then the request is rejected', async () => {
      await request(app)
        .post(`/api/v1/groups/${groupId}/messages`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('token', token)
        .send({ body: '' })
        .expect(400)
        .then((response) => {
          expect(response.body.message).to.equal('Message body is required');
        });
    });
  });

  describe("When the request is a get request for a group's messages", () => {
    it("Then the group's messages are returned", async () => {
      await request(app)
        .get(`/api/v1/groups/${groupId}/messages`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('token', token)
        .expect(200)
        .then((response) => {
          expect(response.body.messages).to.be.an('array');
          expect(response.body.messages.length).to.equal(2);
          expect(response.body.messages[1].body).to.equal(testData.message2.body);
        });
    });
  });
});
