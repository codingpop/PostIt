import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import user from './userReducer';

const rootReducer = combineReducers({
  user,
  router: routerReducer
});

export default rootReducer;
