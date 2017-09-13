import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import messageReducer from './reducers/messageReducer';

const reducer = combineReducers({
  messageReducer
});

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

export default store;
