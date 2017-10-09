import axios from 'axios';
import { Groups } from './../types';

const getMembersSuccess = members => (
  {
    type: Groups.GET_MEMBERS_SUCCESS,
    members
  }
);

const getMembers = groupId => dispatch =>
  axios.get(`/api/v1/groups/${groupId}/users`)
  .then((response) => {
    dispatch(getMembersSuccess(response.data.users));
  });

export default getMembers;
