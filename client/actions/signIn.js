import SIGN_IN from './../types/signIn';

const signIn = message => (
  dispatchEvent({
    type: SIGN_IN,
    payload: {
      message
    }
  })
);

export default signIn;
