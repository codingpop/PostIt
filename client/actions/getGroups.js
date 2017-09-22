import axios from 'axios';
import { Groups } from './../types';
import headers from './../helpers/headers';

const getGroupsSuccess = groups => (
  {
    type: Groups.GET_GROUPS,
    groups
  }
);

const getGroups = () => dispatch =>
    axios.get('/api/v1/groups', headers)
    .then((response) => {
      console.log(response.data.userGroups);
      dispatch(getGroupsSuccess(response.data.userGroups));
    });

export default getGroups;
