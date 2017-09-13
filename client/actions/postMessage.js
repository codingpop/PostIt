import POST_MESSAGE from './../types/message';

const postMessage = message => (
  dispatchEvent({
    type: POST_MESSAGE,
    payload: {
      message
    }
  })
);

export default postMessage;
