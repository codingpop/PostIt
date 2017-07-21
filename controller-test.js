import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import database from './../server/src/database';
import testData from './test-data';
import PostIt from './../server/src/postit';

chai.should();
chai.use(chaiAsPromised);
const PostItInstance = new PostIt();

/**
 * Controller tests
 */
describe('Tests for controllers', () => {
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
  let groupId;
  let messageId;

  before((done) => {
    database.connection.sync({ force: true })
    .then(() => {
      done();
    }).catch((err) => {
      done(err);
    });
  });

  describe('#registerUser()', () => {
    it('should create a new user', () => {
      const user = PostItInstance.registerUser(
        testData.sampleData.firstName,
        testData.sampleData.lastName,
        testData.sampleData.email,
        testData.sampleData.phone,
        testData.sampleData.password
      );

      return user.then((userDetails) => {
        userId = userDetails.userId;
        userDetails.firstName.should.equal(testData.sampleData.firstName);
      });
    });
  });

  describe('#findUser()', () => {
    it('should respond with matching records', () => {
      const user = PostItInstance.findUser(testData.sampleData.email);

      return user.then((userDetails) => {
        userDetails.firstName.should.equal(testData.sampleData.firstName);
      });
    });
  });

  describe('#createGroup()', () => {
    it('should create a group', () => {
      const group = PostItInstance.createGroup('A new group', userId);

      group.then((groupDetails) => {
        groupId = groupDetails.groupId;
        groupDetails.name.should.equal('A new group');
      });
    });
  });

  // describe('Test for createGroup', () => {
  //   it('should create one grouup', (done) => {
  //     PostItInstance.creatGroup('a new group', userId)
  //       .then((result) => {
  //         groupId = result.groupId;
  //         expect(result.name).to.equal('a new group');
  //         expect(result.userId).to.equal(userId);
  //       }).then(done, done);
  //   });
  // });

  // describe('Test for addGroupMember', () => {
  //   it('should add a member to a group', (done) => {
  //     PostItInstance.addGroupMember(userId, groupId)
  //       .then((result) => {
  //         expect(result.groupId).to.equal(groupId);
  //         expect(result.userId).to.equal(userId);
  //       }).then(done, done);
  //   });
  // });

  // describe('Test for findGroup', () => {
  //   it('should find one group', (done) => {
  //     PostItInstance.findGroup(groupId)
  //       .then((result) => {
  //         expect(result.groupId).to.equal(groupId);
  //       }).then(done, done);
  //   });
  // });

  // describe('Test for postMessage', () => {
  //   it('should post a message to a group', (done) => {
  //     PostItInstance.postMessage(groupId, userId, 'this is my two cents', 'critical')
  //       .then((result) => {
  //         messageId = result.messageId;
  //         expect(result.body).to.equal('this is my two cents');
  //         expect(result.priority).to.equal('critical');
  //       }).then(done, done);
  //   });
  // });

  // describe('Test for getMessages', () => {
  //   it('should get all the messages in a group', (done) => {
  //     PostItInstance.getMessages(groupId)
  //       .then((result) => {
  //         expect(result[0].messageId).to.equal(messageId);
  //         expect(result[0].body).to.equal('this is my two cents');
  //         expect(result[0].priority).to.equal('critical');
  //       }).then(done, done);
  //   });
  // });

  // describe('Test for checkMembership', () => {
  //   it('should check if a member is in a group', (done) => {
  //     PostItInstance.checkMembership(userId, groupId)
  //     .then((result) => {
  //       expect(result.groupId).to.equal(groupId);
  //       expect(result.userId).to.equal(userId);
  //       done();
  //     });
  //   });
  // });
});
