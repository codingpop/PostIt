import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from './Header.jsx';
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
   * Prefetches user's groups
   * @memberof Dashboard
   * @returns {void}
   */
  componentWillMount() {
    if (this.props.user.isAuthenticated) {
      this.props.getGroups();
    } else {
      this.props.history.push('/');
    }
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
   * Renders the DashBoard component
   * @memberof Dashboard
   * @returns {object} - the Dashboard JSX
   */
  render() {
    return (
      <div className="dashboard">
        <Header />
        <div className="row content">
          <div className="container-fluid">

            {
              this.props.groups.map(group => (
                <div key={group.groupId} className="col m4 s12">
                  <Group
                    url={group.groupId}
                    name={group.name}
                    description={group.description}
                  />
                </div>
              ))
            }

          </div>
        </div>
        <CreateGroup />
        <Footer />
      </div>
    );
  }
}

Dashboard.propTypes = {
  getGroups: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  user: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired
  }).isRequired,
  groups: PropTypes.array.isRequired
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({ getGroups }, dispatch)
);

const mapStateToProps = state => ({ user: state.user, groups: state.groups });

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));
