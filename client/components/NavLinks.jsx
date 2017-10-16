import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import signOut from './../actions/signOut';

/**
 * Navigation Links
 * @class NavLinks
 * @extends {Component}
 */
class NavLinks extends Component {

  /**
   * Creates an instance of NavLinks.
   * @memberof NavLinks
   */
  constructor() {
    super();
    this.signOut = this.signOut.bind(this);
  }

  /**
   * @memberof NavLinks
   * @returns {void}
   */
  handleClick() {
    this.props.signOut();
  }

  /**
   * @memberof NavLinks
   * @returns {object} - NavLinks component
   */
  render() {
    return (
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li className="active"><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/" className="white-text" onClick={this.handleClick}>Sign out</Link></li>
      </ul>
    );
  }
}

NavLinks.propTypes = {
  signOut: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({ signOut }, dispatch)
);

export default connect(null, mapDispatchToProps)(NavLinks);
