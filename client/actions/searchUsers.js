import axios from 'axios';
import { Groups } from './../types';

const searchUsersSuccess = search => (
  {
    type: Groups.SEARCH_USERS_SUCCESS,
    search
  }
);

const searchUsers = query => dispatch =>
    axios.get(`/api/v1/users/search?query=${query}`)
    .then((response) => {
      dispatch(searchUsersSuccess(response.data.users));
    });

export default searchUsers;
