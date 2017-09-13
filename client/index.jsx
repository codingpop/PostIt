import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import './../template/scss/style.scss';
import Routes from './components/Routes.jsx';
import store from './store';
import './script';

render(
  <Provider store={store}>
    <Routes />
  </Provider>, document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
