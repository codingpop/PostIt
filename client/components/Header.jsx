import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Header = props => (
  <header>
    <div className="navbar-fixed">
      <nav>
        <div className="container-fluid">
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo">ShoutIt</Link>
            <Link to="" data-activates="mobile-as" className="button-collapse">
              <i className="material-icons">menu</i></Link>

            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><Link to={props.signInHref} className="modal-trigger">{props.signIn}</Link></li>
              <li><Link
                to={props.getStartedHref}
                className="modal-trigger"
              >{props.getStarted}</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <ul id="mobile-links" className="side-nav">
      <li><Link to={props.signInHref} className="modal-trigger">{props.signIn}</Link></li>
      <li><Link to={props.getStartedHref} className="modal-trigger">{props.getStarted}</Link></li>
    </ul>
  </header>
);

Header.propTypes = {
  signIn: PropTypes.string.isRequired,
  signInHref: PropTypes.string.isRequired,
  getStarted: PropTypes.string.isRequired,
  getStartedHref: PropTypes.string.isRequired
};

export default Header;
