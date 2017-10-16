import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import getMembers from './../actions/getMembers';

/**
 * @class Members
 * @extends {Component}
 */
class Members extends Component {

  /**
   * Pre-loads the group members
   * @memberof Members
   *
   * @returns {void}
   */
  componentDidMount() {
    this.props.getMembers(this.props.groupId);
  }

  /**
   * @memberof Members
   *
   * @returns {object} - Members component
   */
  render() {
    return (
      <div id="view-members" className="modal">
        <div className="modal-content">
          <div className="row">
            <h5 className="center">Members</h5>
            {
              this.props.members.map(member => (
                <p key={member.userName} className="member">{member.userName}</p>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

Members.propTypes = {
  groupId: PropTypes.string.isRequired,
  members: PropTypes.shape(PropTypes.arrayOf(PropTypes.object)).isRequired,
  getMembers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ members: state.members });

const mapDispatchToProps = dispatch => (
  bindActionCreators({ getMembers }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Members);
