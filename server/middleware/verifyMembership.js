import PostIt from './../src/PostIt';

const PostItInstance = new PostIt();

const verifyMembership = (request, response, next) => {
  PostItInstance.findGroup(request.params.groupId)
    .then((groupData) => {
      if (!groupData) {
        response.status(404).json({
          message: "Group doesn't exist"
        });
      } else {
        groupData.getUsers().then((members) => {
          const userIsAMember = members.find(member => (
            member.userId === request.user.userId
          ));

          if (!userIsAMember) {
            response.status(401).json({
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
        response.status(400).json({
          message: 'Invalid groupId'
        });
      } else {
        response.status(500).json({
          message: 'Oops! Something broke'
        });
      }
    });
};

export default verifyMembership;

