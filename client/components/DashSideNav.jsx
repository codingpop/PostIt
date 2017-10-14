import React from 'react';
import { Link } from 'react-router-dom';

const DashSideNav = () => (
  <ul>
    <li>
      <Link
        to="#create-group"
        className="modal-trigger"
      >
        <i className="material-icons prefix white-text">add</i>Create group
          </Link>
    </li>
    <li>
      <Link
        to="dashboard"
        className="active"
      >
        <i className="material-icons prefix white-text">dashboard</i>Dashboard
          </Link>
    </li>
    <li>
      <Link
        to="/"
        className="white-text"
      ><i
        className="material-icons prefix white-text"
      >power_settings_new</i>Sign out</Link></li>
  </ul>
);

export default DashSideNav;
