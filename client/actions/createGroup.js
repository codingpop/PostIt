import axios from 'axios';
import { push } from 'react-router-redux';
import getGroups from './getGroups';

const createGroup = groupDetails => dispatch =>
  axios.post('/api/v1/groups', groupDetails)
    .then((response) => {
      $('#create-group').modal('close');
      $('.button-collapse').sideNav('hide');
      dispatch(getGroups());
      dispatch(push(`/groups/${response.data.group.groupId}`));
      toastr.options = {
        preventDuplicates: true,
        timeOut: '1000'
      };
      toastr.success('Group created!');
    }).catch((error) => {
      toastr.options = {
        positionClass: 'toast-top-center',
        preventDuplicates: true,
        timeOut: '2000'
      };
      toastr.error(error.response.data.message);
    });

export default createGroup;
