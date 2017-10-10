import React from 'react';

const ResetPassword = () => (
  <div id="forgot-password" className="modal">
    <div className="modal-content">
      <div className="row">
        <h4>Reset password</h4>
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
    >Back to <a href="#sign-in" className="modal-trigger modal-close">Sign in</a></div>
  </div>
);

export default ResetPassword;
