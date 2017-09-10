import React from 'react';
import PropTypes from 'prop-types';

const Header = props => (
  <header>
    <div className="navbar-fixed">
      <nav>
        <div className="container-fluid">
          <div className="nav-wrapper">
            <a href="/" className="brand-logo">ShoutIt</a>
            <a href="" data-activates="mobile-as" className="button-collapse">
              <i className="material-icons">menu</i></a>

            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a href={props.signInHref} className="modal-trigger">{props.signIn}</a></li>
              <li><a
                href={props.getStartedHref}
                className="modal-trigger"
              >{props.getStarted}</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <ul id="mobile-links" className="side-nav">
      <li><a href={props.signInHref} className="modal-trigger">{props.signIn}</a></li>
      <li><a href={props.getStartedHref} className="modal-trigger">{props.getStarted}</a></li>
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
