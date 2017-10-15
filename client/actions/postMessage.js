import axios from 'axios';
import { Messages } from './../types';
import signOut from './signOut';

const postMessageSuccess = message => (
  {
    type: Messages.POST_MESSAGE_SUCCESS,
    message
  }
);

const postMessage = (messageData, groupId) => dispatch =>
  axios.post(`/api/v1/groups/${groupId}/messages`, messageData)
    .then((response) => {
      dispatch(postMessageSuccess(response.data.message));
    }).catch(() => {
      signOut();
    });

export default postMessage;
