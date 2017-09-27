import axios from 'axios';
import { Authenticate } from './../types';

const signInSuccess = user => (
  {
    type: Authenticate.SIGN_IN_SUCCESS,
    user
  }
);

const signIn = credentials => dispatch =>
    axios.post('/api/v1/users/signin', credentials)
    .then((response) => {
      localStorage.setItem('token', response.data.token);
      $('#sign-in').modal('close');
      $('.button-collapse').sideNav('hide');
      dispatch(signInSuccess(response.data.user));
    });

export default signIn;
