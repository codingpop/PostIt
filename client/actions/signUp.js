import axios from 'axios';

const signUp = credentials =>
  axios.post('/api/v1/users/signup', credentials)
    .then(() => {
      $('#sign-up').modal('close');
      $('#sign-in').modal('open');
    })
    .catch((error) => {
      toastr.options = {
        positionClass: 'toast-top-center',
        preventDuplicates: true,
        timeOut: '1000'
      };
      toastr.error(error.response.data.message);
    });

export default signUp;
