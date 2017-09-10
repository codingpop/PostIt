import React from 'react';
import { Link } from 'react-router-dom';

const NavLinks = props => (
  <ul id="mobile-links" className="side-nav">
    <li className="active"><Link href="/">Home</Link></li>
    <li><Link to="#sign-in" className="modal-trigger">Sign in</Link></li>
    <li><Link to="#sign-up" className="modal-trigger">Get Started</Link></li>
  </ul>
);

export default NavLinks;
