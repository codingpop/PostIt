import { push } from 'react-router-redux';
import { Authenticate } from './../types';

const setUserSuccess = user => (
  {
    type: Authenticate.SET_USER_SUCCESS,
    user
  }
);

const setUser = (isAuthenticated, pathName) => (dispatch) => {
  if (localStorage.user || isAuthenticated) {
    dispatch(setUserSuccess(JSON.parse(localStorage.user)));

    if (pathName === '/') {
      dispatch(push('/dashboard'));
    } else {
      dispatch(push(pathName));
    }
  } else {
    dispatch(push('/'));
  }
};

export default setUser;
