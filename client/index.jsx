import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';


import './../template/scss/style.scss';
import configureStore from './store/configureStore';
import routes from './routes';

const AppRouter = () => (
  <Provider store={configureStore}>
    <BrowserRouter>
      {renderRoutes(routes)}
    </BrowserRouter>
  </Provider>
);

render(<AppRouter />, document.getElementById('root'));


if (module.hot) {
  module.hot.accept();
}
