import axios from 'axios';
import { Groups } from './../types';
import headers from './../helpers/headers';

const getGroupsSuccess = userGroups => (
  {
    type: Groups.GET_GROUPS_SUCCESS,
    userGroups
  }
);

const getGroups = (limit = 9, offset = 0) => dispatch =>
    axios.get(`/api/v1/groups?limit=${limit}&offset=${offset}`, headers)
    .then((response) => {
      dispatch(getGroupsSuccess(response.data));
    });

export default getGroups;
