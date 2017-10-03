import axios from 'axios';
import { push } from 'react-router-redux';
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
      dispatch(signInSuccess(response.data.user));
      $('#sign-in').modal('close');
      $('.button-collapse').sideNav('hide');
      dispatch(push('/dashboard'));
    }).catch((error) => {
      if (error) {
        toastr.options = {
          positionClass: 'toast-top-center',
          preventDuplicates: true,
          timeOut: '1000'
        };
        toastr.error(error.response.data.message);
      }
    });

export default signIn;
