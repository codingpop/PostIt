import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import signUp from './../actions/signUp';

/**
 * @class SignUp
 * @extends {Component}
 * @author Babatunde Adeyemi <tundewrites@gmail.com>
 */
class SignUp extends Component {

  /**
   * Creates an instance of SignUp.
   * @memberof SignUp
   */
  constructor() {
    super();

    this.initialState = {
      userName: '',
      email: '',
      phone: '',
      password: ''
    };

    this.state = this.initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Handles onChange event on input fields
   * @param {object} event - the input field onChange event
   * @memberof SignUp
   * @returns {void}
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * Handles onSubit event on form submission
   * @param {object} form - the form onSubmit event
   * @memberof SignUp
   * @returns {void}
   */
  handleSubmit(form) {
    form.preventDefault();
    this.props.signUp(this.state);
    this.setState(this.initialState);
  }

  /**
   * Renders the SignUp component
   * @memberof SignUp
   * @returns {object} - SignUp Component
   */
  render() {
    return (
      <div id="sign-up" className="modal">
        <div className="modal-content">
          <div className="row">
            <h5 className="center">Join ShoutIt</h5>
            <form className="col s12" onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">account_circle</i>
                  <input
                    id="name"
                    onChange={this.handleChange}
                    value={this.state.userName}
                    type="text"
                    name="userName"
                    className="validate"
                    required
                  />
                  <label htmlFor="name">Username</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">email</i>
                  <input
                    id="email"
                    type="email"
                    onChange={this.handleChange}
                    value={this.state.email}
                    name="email"
                    className="validate"
                    required
                  />
                  <label htmlFor="email">Email</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">phone</i>
                  <input
                    id="phone"
                    type="tel"
                    onChange={this.handleChange}
                    value={this.state.phone}
                    name="phone"
                    className="validate"
                    required
                  />
                  <label htmlFor="phone">Phone</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">lock</i>
                  <input
                    id="password"
                    type="password"
                    onChange={this.handleChange}
                    value={this.state.password}
                    name="password"
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
                </div>
              </div>
            </form>
          </div>
        </div>
        <div
          className="modal-footer"
        >Already a member?
        <Link to="#sign-in" className="modal-trigger modal-close"> Sign in</Link>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  signUp: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({ signUp }, dispatch)
);

export default connect(null, mapDispatchToProps)(SignUp);
