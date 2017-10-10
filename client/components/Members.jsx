import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getMembers from './../actions/getMembers';

class Members extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  render() {
    return (
      <div id="view-members" className="modal">
        <div className="modal-content">
          <div className="row">
            <h5 className="center">Members</h5>
            
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
