import { push } from 'react-router-redux';

export default location => (dispatch) => {
  dispatch(push(location));
};
