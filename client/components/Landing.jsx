import React from 'react';
import Footer from './Footer.jsx';

const Landing = () => (
  <div>

    {/* Hero Section */}
    <section className="hero valign-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col s12">
            <div className="main-copy center">
              <h1>Shout It Loud!</h1>
              <p>Create a group. Shout your message.</p>
              <a href="#sign-up" className="btn-large modal-trigger">Get Started</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* How It Works */}
    <section className="how-it-works">
      <div className="container-fluid">
        <div className="row">
          <h3>How It Works</h3>
          <div className="col s12 m4">
            <i className="material-icons">add_box</i>
            <h5>1. Create A Group</h5>
            <p>Sign up for free, and create a group.</p>
          </div>
          <div className="col s12 m4">
            <i className="material-icons">account_box</i>
            <h5>2. Add Users</h5>
            <p>Find and add users to the group.</p>
          </div>
          <div className="col s12 m4">
            <i className="material-icons">message</i>
            <h5>3. Shout Your Message</h5>
            <p>Write your message, set priority, and shout it to the group.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Opt-in Section */}
    <section className="opt-in">
      <div className="container-fluid">
        <div className="row">
          <div className="col s12">
            <h5>Got a message to share?</h5>
            <a href="#sign-up" className="btn-large modal-trigger">Get Started</a>
          </div>
        </div>
      </div>
    </section>

    {/* Sign up modal */}
    <div id="sign-up" className="modal">
      <div className="modal-content">
        <div className="row">
          <h5 className="center">Join ShoutIt</h5>
          <form className="col s12" action="dashboard.html">
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">account_circle</i>
                <input id="full-name" type="text" className="validate" required />
                <label htmlFor="full-name">Full name</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">email</i>
                <input id="email" type="email" className="validate" required />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">phone</i>
                <input id="phone" type="tel" className="validate" required />
                <label htmlFor="phone">Phone</label>
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
                <i className="material-icons prefix">lock</i>
                <input id="confirm-password" type="password" className="validate" required />
                <label htmlFor="confirm-password">Confirm Password</label>
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
      >Already a member? <a href="#sign-in" className="modal-trigger modal-close">Sign in</a></div>
    </div>

    {/* Sign in modal */}
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

    {/* Reset Password Modal */}
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

    <Footer />
  </div>
);

export default Landing;
