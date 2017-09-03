import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/Header.jsx';
import App from './components/App.jsx';

const Root = () => (
  <BrowserRouter>
    <div>
      <Header />
      <App />
    </div>
  </BrowserRouter>
);

render(<Root />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
