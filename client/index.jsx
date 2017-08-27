import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<h1>I just changed from I am here</h1>, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
