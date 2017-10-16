import React from 'react';
import Gravatar from 'react-gravatar';
import md5 from 'md5';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import DashSideNav from './DashSideNav.jsx';
import NavLinks from './NavLinks.jsx';

/**
 * Header
 * @param {object} props - data from redux store
 *
 * @returns {object} - Header component
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
          <Gravatar
            md5={md5(props.user.email)}
            default="monsterid"
            className="center"
            size={150}
          />
          <p>{props.user.userName}</p>
        </Link>
      </div>
      <DashSideNav user={props.user} />
    </div>
  </header>
);

DashHeader.propTypes = {
  user: PropTypes.shape({
    userName: PropTypes.string,
    email: PropTypes.string,
  }).isRequired
};

const mapStateToProps = state => (
  {
    user: state.user.user.user,
    email: state.user.user.email,
    router: state.router
  }
);

export default connect(mapStateToProps, null)(DashHeader);
