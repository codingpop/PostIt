import React, { Component } from 'react';
import axios from 'axios';

class SignUp extends Component {
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
    this.registerUser = this.registerUser.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  registerUser(form) {
    form.preventDefault();

    const baseUrl = window.location.host;
    const url = `http://${baseUrl}/api/v1/users/signup`;

    axios.post(url, this.state)
      .then((response) => {
        console.log(response);
        this.setState(this.initialState);
        $('#sign-up').modal('close');
        $('#sign-in').modal('open');
      }).catch((error) => {
        console.log(error.response);
      });
  }

  render() {
    return (
      <div id="sign-up" className="modal">
        <div className="modal-content">
          <div className="row">
            <h5 className="center">Join ShoutIt</h5>
            <form className="col s12" onSubmit={this.registerUser} action="dashboard.html">
              <div className="row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">account_circle</i>
                  <input id="name" onChange={this.handleChange} value={this.state.userName} type="text" name="userName" className="validate" required />
                  <label htmlFor="name">Name</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">email</i>
                  <input id="email" type="email" onChange={this.handleChange} value={this.state.email} name="email" className="validate" required />
                  <label htmlFor="email">Email</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">phone</i>
                  <input id="phone" type="tel" onChange={this.handleChange} value={this.state.phone} name="phone" className="validate" required />
                  <label htmlFor="phone">Phone</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">lock</i>
                  <input id="password" type="password" onChange={this.handleChange} value={this.state.password} name="password" className="validate" required />
                  <label htmlFor="password">Password</label>
                </div>
              </div>
              {/*<div className="row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">lock</i>
                  <input id="confirm-password" type="password" name="comfirmPassword" className="validate" required />
                  <label htmlFor="confirm-password">Confirm Password</label>
                </div>
              </div>*/}
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
        >Already a member? <a href="#sign-in" className="modal-trigger modal-close">Sign in</a></div>
      </div>
    );
  }
}

export default SignUp;
