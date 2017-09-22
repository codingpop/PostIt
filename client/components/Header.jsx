import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

const DashHeader = props => (
  <header>
    <div className="navbar-fixed">
      <nav>
        <div className="container-fluid">
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo">ShoutIt</Link>
            <Link
              to=""
              data-activates="mobile-links"
              className="button-collapse"
            ><i className="material-icons">menu</i></Link>

            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li className="active"><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/" className="white-text">Sign out</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <div id="mobile-links" className="side-nav fixed">
      <div className="avatar">
        <Link to="">
          <img src="img/avatar.jpg" className="center" alt="" />
          <p>{props.user.user.userName}</p>
        </Link>
      </div>
      <ul>
        <li>
          <Link
            to="#create-group"
            className="modal-trigger"
          ><i className="material-icons prefix white-text">add</i>Create group</Link></li>
        <li>
          <Link
            to="dashboard"
            className="active"
          ><i className="material-icons prefix white-text">dashboard</i>Dashboard</Link></li>
        <li>
          <Link
            to="/"
            className="white-text"
          ><i
            className="material-icons prefix white-text"
          >power_settings_new</i>Sign out</Link></li>
      </ul>
    </div>
  </header >
);

DashHeader.propTypes = {
  user: PropTypes.shape({
    userName: PropTypes.string
  }).isRequired
};

const mapStateToProps = state => (
  {
    user: state.user
  }
);

export default connect(mapStateToProps)(DashHeader);
