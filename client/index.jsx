import React from 'react';
import ReactDOM from 'react-dom';
import { Rounter, browserHistory } from 'react-router';

ReactDOM.render(<Router history={browserHistory} />, document.querySelector('#root'));
