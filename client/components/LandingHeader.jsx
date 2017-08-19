import React from 'react';

class LandingHeader extends React.Component {
  render() {
    return (
      <header>
        <div className="navbar-fixed">
          <nav>
            <div className="container-fluid">
              <div className="nav-wrapper">
                <a href="" className="brand-logo">ShoutIt</a>
                <a href="" data-activates="mobile-links" className="button-collapse">
                  <i className="material-icons">menu</i></a>

                <ul id="nav-mobile" className="right hide-on-med-and-down">
                  <li className="active"><a href="">Home</a></li>
                  <li><a href="#sign-in" className="modal-trigger">Sign in</a></li>
                  <li><a href="#sign-up" className="modal-trigger">Get Started</a></li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <ul id="mobile-links" className="side-nav">
          <li className="active"><a href="">Home</a></li>
          <li><a href="#sign-in" className="modal-trigger">Sign in</a></li>
          <li><a href="#sign-up" className="modal-trigger">Get Started</a></li>
        </ul>
      </header>
    );
  }
}

export default LandingHeader;
