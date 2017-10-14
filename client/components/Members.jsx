import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getMembers from './../actions/getMembers';

class Members extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getMembers(localStorage.currentGroup);
  }

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

const mapStateToProps = state => ({ members: state.members });

const mapDispatchToProps = dispatch => (
  bindActionCreators({ getMembers }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Members);
