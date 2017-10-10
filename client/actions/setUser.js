import { push } from 'react-router-redux';
import { Authenticate } from './../types';
import getGroups from './getGroups';

const setUserSuccess = user => (
  {
    type: Authenticate.SET_USER_SUCCESS,
    user
  }
);

const setUser = () => (dispatch) => {
  // const user = JSON.parse(localStorage.getItem('user'));

  if (localStorage.user) {
    dispatch(setUserSuccess(JSON.parse(localStorage.user)));
  } else {
    dispatch(push('/'));
  }
};

export default setUser;
