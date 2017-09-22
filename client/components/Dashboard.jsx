import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
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
            <div className="col m4 s12">
              <Group title="A new group" description="This is the description of a new group of groups in the name of God our Lord Almighty savior of the" />
            </div>
            <div className="col m4 s12">
              <Group title="A new group" description="This is the description of a new group of groups in the name of God our Lord Almighty savior of the" />
            </div>
            <div className="col m4 s12">
              <Group title="A new group" description="This is the description of a new group of groups in the name of God our Lord Almighty savior of the" />
            </div>
            <div className="col m4 s12">
              <Group title="A new group" description="This is the description of a new group of groups in the name of God our Lord Almighty savior of the" />
            </div>
            <div className="col m4 s12">
              <Group title="A new group" description="This is the description of a new group of groups in the name of God our Lord Almighty savior of the" />
            </div>
            <div className="col m4 s12">
              <Group title="A new group" description="This is the description of a new group of groups in the name of God our Lord Almighty savior of the" />
            </div>
          </div>
        </div>
        <CreateGroup />
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({ getGroups }, dispatch)
);

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));
