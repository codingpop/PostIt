import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import SideLinks from './SideLinks.jsx';
import ChatLinks from './ChatLinks.jsx';

const DashHeader = (props) => {
  const SideNav = props.router.location.pathname === '/dashboard' ?
  SideLinks : ChatLinks;

  return (<header>
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
          <img src="/img/avatar.jpg" className="center" alt="" />
          <p>{props.user.userName}</p>
        </Link>
      </div>
      <SideNav />
    </div>
  </header>
  );
};

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
