import chai from 'chai';
import database from './../server/src/database';

const expect = chai.expect;

const sampleData = {
  firstName: 'Babatunde',
  lastName: 'Adeyemi',
  email: 'tunde@yahoo.com',
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
 * User modules tests
 */
describe('Tests for models', () => {
  before((done) => {
    database.connection.sync({
      force: true
    }).then(() => {
      done();
    }).catch((err) => {
      done(err);
    });
  });

  let userId;

  describe('Test for User model', () => {
    it('should create a new user', (done) => {
      database.User.create(sampleData)
      .then((result) => {
        userId = result.userId;
        expect(result).to.have.a.property('userId');
        expect(result).to.have.a.property('firstName');
        expect(result).to.have.a.property('lastName');
        expect(result).to.have.a.property('email');
        expect(result).to.have.a.property('phone');
        expect(result).to.have.a.property('password');
      }).then(done, done);
    });

    it('should reject registration with existing user details', () => {
      database.User.create(sampleData)
      .then()
      .catch((error) => {
        expect(error).to.have.a.property('name');
        expect(error.name).to.equal('SequelizeUniqueConstraintError');
        expect(error).to.have.a.property('errors');
        expect(error.errors[0].message).to.equal('email must be unique');
      });
    });

    it('should reject registration with invalid input', () => {
      database.User.create(sampleData3)
      .then()
      .catch((error) => {
        expect(error.name).to.equal('SequelizeValidationError');
      });
    });
  });

  describe('Test for group model', () => {
    it('should create a new group', (done) => {
      database.Group.create({
        name: 'A new group',
        userId
      }).then((result) => {
        expect(result.name).to.equal('A new group');
        expect(result).to.have.a.property('groupId');
      }).then(done, done);
    });
  });
});
