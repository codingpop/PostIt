import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Group Card
 * @param {object} props - properties from parent components
 *
 * @returns {object} - Group component
 */
const Group = props => (
  <Link to={`/groups/${props.url}`}>
    <div className="card">
      <div className="card-image">
        <img src="img/code.png" alt="" />
        <span className="card-title">{props.name}</span>
      </div>
      <div className="card-content">
        <p>{props.description}</p>
      </div>
    </div>
  </Link>
);

Group.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default Group;
