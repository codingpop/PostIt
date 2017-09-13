// Create group
const createGroup = group => (
  {
    type: 'CREATE_GROUP',
    group
  }
);

// Post message
const postMessage = (groupId, message) => (
  {
    type: 'POST_MESSAGE',
    groupId,
    message
  }
);
