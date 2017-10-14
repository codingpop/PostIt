import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import signOut from './../actions/signOut';

class NavLinks extends Component {
  constructor() {
    super();
    this.signOut = this.signOut.bind(this);
  }

  signOut() {
    this.props.signOut();
  }

  render() {
    return (
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li className="active"><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/" className="white-text" onClick={this.signOut}>Sign out</Link></li>
      </ul>
    );
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({ signOut }, dispatch)
);

export default connect(null, mapDispatchToProps)(NavLinks);
