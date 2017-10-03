import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { autoRehydrate, persistStore } from 'redux-persist';

import rootReducer from './../reducers/rootReducer';
import history from './../helpers/history';

const reducers = rootReducer;

const configureStore = createStore(
  reducers,
  window.devToolsExtension ? window.devToolsExtension() : f => f,
  compose(applyMiddleware(thunk, routerMiddleware(history)), /* autoRehydrate() */)
);

// persistStore(configureStore);

export default configureStore;
