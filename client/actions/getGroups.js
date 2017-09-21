import axios from 'axios';
import { Groups } from './../types';

const getGroupsSuccess = groups => (
  {
    type: Groups.GET_GROUPS,
    groups
  }
);

const getGroups = () => dispatch =>
    axios.get('/api/v1/groups')
    .then((response) => {
      dispatch(getGroupsSuccess(response.data.groups));
    });

export default getGroups;
