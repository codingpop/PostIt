import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import setUser from './../actions/setUser';

export default (ComposedComponent) => {
  /**
   * @class Authenticate
   * @extends {Component}
   */
  class Authenticate extends Component {

    /**
     * Pre sets the user data to the redux store
     * @memberof Authenticate
     * @returns {void}
     */
    componentWillMount() {
      this.props.setUser(this.props.isAuthenticated, this.props.pathName);
    }

    /**
     * Renders any child component passed to it
     * @memberof Authenticate
     * @returns {void}
     */
    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  Authenticate.propTypes = {
    setUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    pathName: PropTypes.string.isRequired
  };

  const mapDispatchToProps = dispatch => (
    bindActionCreators({ setUser }, dispatch)
  );

  const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated,
    pathName: state.router.location.pathname
  });

  return connect(mapStateToProps, mapDispatchToProps)(Authenticate);
};

