import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { renderRoutes } from 'react-router-config';
import { ConnectedRouter } from 'react-router-redux';


import './../template/scss/style.scss';
import configureStore from './store/configureStore';
import routes from './routes';
import history from './helpers/history';
import setToken from './helpers/setToken';

if (localStorage.user) {
  setToken(JSON.parse(localStorage.user).token);
}

const AppRouter = () => (
  <Provider store={configureStore}>
    <ConnectedRouter history={history}>
      {renderRoutes(routes)}
    </ConnectedRouter>
  </Provider>
);

render(<AppRouter />, document.getElementById('root'));


if (module.hot) {
  module.hot.accept();
}
