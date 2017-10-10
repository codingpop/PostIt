import axios from 'axios';
import { Messages } from './../types';

const getMessagesSuccess = messages => (
  {
    type: Messages.GET_MESSAGES_SUCCESS,
    messages
  }
);

const getMessages = groupId => dispatch =>
  axios.get(`/api/v1/groups/${groupId}/messages`)
  .then((response) => {
    dispatch(getMessagesSuccess(response.data.messages));
  });

export default getMessages;
