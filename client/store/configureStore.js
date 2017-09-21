import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './../reducers/rootReducer';

const reducers = rootReducer;

const configureStore = createStore(
  reducers,
  window.devToolsExtension ? window.devToolsExtension() : f => f,
  applyMiddleware(thunk)
);

export default configureStore;
