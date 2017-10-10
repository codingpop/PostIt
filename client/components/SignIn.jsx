import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import signIn from './../actions/signIn';

/**
 * @class SignIn
 * @extends {Component}
 */
class SignIn extends Component {

/**
 * Creates an instance of SignIn.
 * @memberof SignIn
 */
  constructor() {
    super();

    this.initialState = {
      credential: '',
      password: ''
    };

    this.state = this.initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Ensures modals stay active
   * @memberof SignIn
   * @returns {void}
   */
  componentDidMount() {
    $('.button-collapse').sideNav();
    $('.modal').modal();
  }

  /**
   * Handles the changes in the sign in form
   * @param {any} event
   * @memberof SignIn
   * @return {void}
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * Handles sign in form submission
   * @param {any} form
   * @memberof SignIn
   * @returns {void}
   */
  handleSubmit(form) {
    form.preventDefault();
    this.props.signIn(this.state);
  }

  /**
   * Renders the SignIn component
   * @returns {object} - the jsx component
   */
  render() {
    return (
      <div id="sign-in" className="modal">
        <div className="modal-content">
          <div className="row">
            <h5 className="center">Sign in</h5>
            <form onSubmit={this.handleSubmit} className="col s12">
              <div className="row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">account_circle</i>
                  <input
                    id="credential"
                    name="credential"
                    value={this.state.userName}
                    onChange={this.handleChange}
                    type="text"
                    className="validate"
                    required
                  />
                  <label htmlFor="credential">Username or email</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">lock</i>
                  <input
                    id="password"
                    name="password"
                    onChange={this.handleChange}
                    value={this.state.password}
                    type="password"
                    className="validate"
                    required
                  />
                  <label htmlFor="password">Password</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <button
                    className="btn btn-large waves-effect waves-light"
                    type="submit"
                    name="action"
                  >Continue</button>
                  <a
                    className="forgot-password center-block modal-trigger modal-close"
                    href="#forgot-password"
                  >Forgot password?</a>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div
          className="modal-footer"
        >Not a member yet?<Link
          to="#sign-up"
          className="modal-trigger modal-close"
        > Sign up</Link></div>
      </div>
    );
  }
}

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({ signIn }, dispatch)
);

export default connect(null, mapDispatchToProps)(SignIn);
