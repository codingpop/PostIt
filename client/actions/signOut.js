import setToken from './../helpers/setToken';
import { Authenticate } from './../types';

const signOutSuccess = () => (
  {
    type: Authenticate.SIGN_OUT_SUCCESS
  }
);

const signOut = () => (dispatch) => {
  setToken();
  dispatch(signOutSuccess());
  localStorage.clear();
};

export default signOut;
