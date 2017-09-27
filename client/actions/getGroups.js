import axios from 'axios';
import { Groups } from './../types';
import headers from './../helpers/headers';

const getGroupsSuccess = groups => (
  {
    type: Groups.GET_GROUPS_SUCCESS,
    groups
  }
);

const getGroups = (limit = 2, offset = 0) => dispatch =>
    axios.get(`/api/v1/groups?limit=${limit}&offset=${offset}`, headers)
    .then((response) => {
      dispatch(getGroupsSuccess(response.data.groups));
    });

export default getGroups;
