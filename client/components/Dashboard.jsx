import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Group from './Group.jsx';
import CreateGroup from './CreateGroup.jsx';
import Paginator from './Paginator.jsx';
import getGroups from './../actions/getGroups';
import redirect from './../actions/redirect';

/**
 * @class Dashboard
 * @extends {Component}
 */
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        groups: nextProps.groups.userGroups
      });
    }
  }
  /**
   * Ensures modals and sidenav work
   * @memberof Dashboard
   * @returns {void}
   */
  componentDidMount() {
    this.props.getGroups();
    $('.button-collapse').sideNav();
    $('.modal').modal();
    $('#description').trigger('autoresize');
  }

  /**
   * Renders the DashBoard component
   * @memberof Dashboard
   * @returns {object} - the Dashboard JSX
   */
  render() {
    let groupList;
    if (this.state.groups.length > 0) {
      groupList = this.state.groups.map(group => (
        <div key={group.groupId} className="col m4 s12">
          <Group
            url={group.groupId}
            name={group.name}
            description={group.description}
          />
        </div>
      ));
    }
    return (
      <div className="dashboard">
        <Header />
        <div className="row content">
          <div className="container-fluid">

            {
              groupList
            }

          </div>
        </div>

        <Paginator />
        <CreateGroup />
      </div>
    );
  }
}

Dashboard.propTypes = {
  getGroups: PropTypes.func.isRequired,
  user: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired
  }).isRequired,
  groups: PropTypes.shape.isRequired
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({ getGroups, redirect }, dispatch)
);

const mapStateToProps = state => ({ user: state.user, groups: state.groups });

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
