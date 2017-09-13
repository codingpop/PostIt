import React, { Component } from 'react';
import axios from 'axios';

class SignIn extends Component {
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

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(form) {
    form.preventDefault();
    this.setState(this.initialState);
    $('#sign-in').modal('close');
  }

  render() {
    return (
      <div id="sign-in" className="modal">
        <div className="modal-content">
          <div className="row">
            <h5 className="center">Sign in</h5>
            <form onSubmit={form => this.handleSubmit(form)} className="col s12">
              <div className="row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">account_circle</i>
                  <input id="credential" name="credential" value={this.state.userName} onChange={this.handleChange} type="text" className="validate" required />
                  <label htmlFor="credential">Username, Email or Phone</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">lock</i>
                  <input id="password" name="password" onChange={this.handleChange} value={this.state.password} type="password" className="validate" required />
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
        >Not a member yet?<a
          href="#sign-up"
          className="modal-trigger modal-close"
        >Sign up</a></div>
      </div>
    );
  }
}
export default SignIn;
