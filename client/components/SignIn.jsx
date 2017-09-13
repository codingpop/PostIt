import React from 'react';

const SignIn = () => (
  <div id="sign-in" className="modal">
    <div className="modal-content">
      <div className="row">
        <h5 className="center">Sign in</h5>
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">email</i>
              <input id="email" type="email" className="validate" required />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">lock</i>
              <input id="password" type="password" className="validate" required />
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
    >Not a member yet? <a href="#sign-up" className="modal-trigger modal-close">Sign up</a></div>
  </div>
);

export default SignIn;
