import React from 'react';
import { render } from 'react-dom';
import './../template/scss/style.scss';


import App from './components/App.jsx';

render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
