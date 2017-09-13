import SET_MESSAGE from './../types/message';

const setMessage = message => (
  dispatchEvent({
    type: SET_MESSAGE,
    payload: {
      message
    }
  })
);

export default setMessage;
