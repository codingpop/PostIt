import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DashHeader from './DashHeader.jsx';
import Footer from './Footer.jsx';
import Group from './Group.jsx';
import CreateGroup from './CreateGroup.jsx';

import getGroups from './../actions/getGroups';

/**
 * @class Dashboard
 * @extends {Component}
 */
class Dashboard extends Component {

  /**
   * Creates an instance of Dashboard.
   * @memberof Dashboard
   */
  constructor() {
    super();

    this.state = {
      groups: []
    };
  }

  /**
   * Prefetches the user's groups
   * @memberof Dashboard
   * @returns {void}
   */
  componentWillMount() {
    this.props.getGroups();
  }

  /**
   * Ensures modals and sidenav work
   * @memberof Dashboard
   * @returns {void}
   */
  componentDidMount() {
    $('.button-collapse').sideNav();
    $('.modal').modal();
    $('#description').trigger('autoresize');
  }

  /**
   * Receives delayed props
   * @param {object} nextProps - delayed props
   * @memberof Dashboard
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        groups: nextProps.groups
      });
    }
  }

  /**
   * Renders the DashBoard component
   * @memberof Dashboard
   * @returns {object} - the Dashboard JSX
   */
  render() {
    let groupList;

    if (this.state.groups.length) {
      groupList = this.state.groups.map(group => (
        <div key={group.groupId} className="col m4 s12">
          <Group
            url={group.groupId}
            name={group.name}
            description={group.description}
          />
        </div>
      ));
    } else {
      groupList = (
        <div className="col s12 center-align">
          <h1>Welcome!</h1>
          <p className="flow-text">Create your first group to begin</p>
          <img src="/img/hand.png" alt="point-left" width="400" />
        </div>
      );
    }

    return (
      <div className="dashboard">
        <DashHeader />
        <div className="row content">
          <div className="container-fluid">

            {
              groupList
            }

          </div>
        </div>

        <Footer />
        <CreateGroup />
      </div>
    );
  }
}

Dashboard.propTypes = {
  getGroups: PropTypes.func.isRequired,
  groups: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({ getGroups }, dispatch)
);

const mapStateToProps = state => (
  {
    groups: state.groups.userGroups,
    totalGroups: state.groups.totalGroups
  });

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
