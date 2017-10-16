import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import ChatSideNav from './ChatSideNav.jsx';
import NavLinks from './NavLinks.jsx';

/**
 * Dashboard Header
 *
 * @param {object} props - data from Redux store
 *
 * @returns {object} - the Header component for the dashboard
 */
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

            <NavLinks />
          </div>
        </div>
      </nav>
    </div>
    <div id="mobile-links" className="side-nav fixed">
      <div className="avatar">
        <Link to="">
          <img src="/img/avatar.jpg" className="center" alt="" />
          <p>{props.user.userName}</p>
        </Link>
      </div>
      <ChatSideNav />
    </div>
  </header>
);

DashHeader.propTypes = {
  user: PropTypes.shape({
    userName: PropTypes.string
  }).isRequired
};

const mapStateToProps = state => (
  {
    user: state.user,
    router: state.router
  }
);

export default connect(mapStateToProps)(DashHeader);
