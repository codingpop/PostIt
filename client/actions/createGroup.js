import axios from 'axios';
import { Groups } from './../types';
import headers from './../helpers/headers';

const createGroupSuccess = group => (
  {
    type: Groups.CREATE_GROUP_SUCCESS,
    group
  }
);

const createGroups = groupDetails => dispatch =>
    axios.post('/api/v1/groups', groupDetails, headers)
    .then((response) => {
      dispatch(createGroupSuccess(response.data.group));
      $('#create-group').modal('close');
      $('.button-collapse').sideNav('hide');
    });

export default createGroups;
