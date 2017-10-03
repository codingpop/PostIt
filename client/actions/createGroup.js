import axios from 'axios';
import headers from './../helpers/headers';
import getGroups from './getGroups';

const createGroups = groupDetails => dispatch =>
  axios.post('/api/v1/groups', groupDetails, headers)
    .then(() => {
      dispatch(getGroups());
      $('#create-group').modal('close');
      $('.button-collapse').sideNav('hide');
    }).then(() => {
      toastr.options = {
        preventDuplicates: true,
        timeOut: '1000'
      };
      toastr.success('Group created!');
    });

export default createGroups;
