import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import signIn from './../actions/signIn';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      credential: '',
      password: ''
    };

    this.state = this.initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    $('.button-collapse').sideNav();
    $('.modal').modal();
    $('#description').trigger('autoresize');
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(form) {
    form.preventDefault();
    this.props.signIn(this.state)
      .then(() => {
        // return <Redirect push to="/dashboard" />;
        // console.log('asdjfalsdfjlkaf');
        this.props.history.push('/dashboard');
        // returncontext.router.history.push('/my-new-location');
        // location.href = '/dashboard';
      })
      .catch((error) => {
        // if (error) {
        //   toastr.options = {
        //     positionClass: 'toast-top-center',
        //     preventDuplicates: true,
        //     timeOut: '1000'
        //   };
        //   toastr.error(error.response.data.message);
        // }
      });
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
                  <label htmlFor="credential">Username, email, or phone number</label>
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
  bindActionCreators({ signIn }, dispatch)
);

const mapStateToProps = state => ({ user: state.user });

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn));
