import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Main from './Main.jsx';
import NotFound from './NotFound.jsx';
import Dashboard from './Dashboard.jsx';
import ViewGroup from './ViewGroup.jsx';

class App extends Component {
  render() {
    return (
      <Router history={createBrowserHistory()}>
        <div>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/dashboard/:groupId" component={ViewGroup} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
