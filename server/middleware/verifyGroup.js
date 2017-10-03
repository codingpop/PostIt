import PostIt from './../src/PostIt';

const PostItInstance = new PostIt();

const verifyGroup = (request, response, next) => {
  PostItInstance.findGroup(request.params.groupId)
    .then((groupData) => {
      if (!groupData) {
        response.json({
          message: "Group doesn't exist"
        });
      } else {
        groupData.getUsers().then((members) => {
          const userIsAMember = members.find(member => (
            member.userId === request.user.userId
          ));

          if (!userIsAMember) {
            response.json({
              message: "You don't belong to this group"
            });
          } else if (userIsAMember) {
            next();
          }
        });
      }
    }).catch((error) => {
      if (error.name === 'SequelizeDatabaseError' &&
        error.parent.routine === 'string_to_uuid') {
        response.json({
          message: 'Invalid groupId'
        });
      } else {
        response.status(500).json({
          message: 'Oops! Something broke'
        });
      }
    });
};

export default verifyGroup;

