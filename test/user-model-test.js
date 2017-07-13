import chai from 'chai';
import database from './../server/src/database';
import testData from './test-data';

const expect = chai.expect;

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
      database.User.create(testData.sampleData)
      .then((result) => {
        userId = result.userId;
        expect(result).to.have.a.property('userId');
        expect(result.firstName).to.equal(testData.sampleData.firstName);
        expect(result.lastName).to.equal(testData.sampleData.lastName);
        expect(result.email).to.equal(testData.sampleData.email);
        expect(result.phone).to.equal(testData.sampleData.phone);
        expect(result).to.have.a.property('password');
      }).then(done, done);
    });

    it('should reject registration with existing user details', () => {
      database.User.create(testData.sampleData)
      .then()
      .catch((error) => {
        expect(error.name).to.equal('SequelizeUniqueConstraintError');
        expect(error).to.have.a.property('errors');
        expect(error.errors[0].message).to.equal('email must be unique');
      });
    });

    it('should reject registration with invalid input', () => {
      database.User.create(testData.sampleData3)
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
