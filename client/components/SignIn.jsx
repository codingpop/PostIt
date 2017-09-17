import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import signIn from './../actions/signIn';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      email: '',
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
    this.props.signIn(this.state)
      .then(() => {
        // this.setState(this.initialState);
      })
      .catch((error) => {
        Materialize.toast(error.response.data.message, 5000);
      });
  }

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
                  <input id="email" name="email" value={this.state.userName} onChange={this.handleChange} type="text" className="validate" required />
                  <label htmlFor="email">Username, Email or Phone</label>
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

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => (
  {
    signIn: user => dispatch(signIn(user))
  }
);

export default connect(null, mapDispatchToProps)(SignIn);
