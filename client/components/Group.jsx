import React from 'react';
import PropTypes from 'prop-types';

const Group = props => (
  <a href="/group/394739742742">
    <div className="card">
      <div className="card-image">
        <img src="img/code.png" alt="" />
        <span className="card-title">{props.title}</span>
      </div>
      <div className="card-content">
        <p>{props.description}</p>
      </div>
    </div>
  </a>
);

Group.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Group;
