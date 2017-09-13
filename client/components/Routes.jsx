import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Main from './Main.jsx';
import NotFound from './NotFound.jsx';
import Dashboard from './Dashboard.jsx';
import ViewGroup from './ViewGroup.jsx';
import Footer from './Footer.jsx';

const Routes = () => (
  <div>
    <Router history={createBrowserHistory()}>
      <Switch>
        <Route exact path="/" render={() => (<Main />)} />
        <Route exact path="/dashboard" render={() => (<Dashboard />)} />
        <Route exact path="/dashboard/:groupId" render={() => (<ViewGroup />)} />
        <Route render={() => (<NotFound />)} />
      </Switch>
    </Router>
    <Footer />
  </div>
);

export default Routes;
