import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import messageReducer from './reducers/messageReducer';
import userReducer from './reducers/userReducer';

const reducer = combineReducers({
  messageReducer,
  userReducer
});

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

export default store;
