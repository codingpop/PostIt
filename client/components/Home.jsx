import React from 'react';
import { Link } from 'react-router-dom';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';
import ResetPassword from './ResetPassword.jsx';

const Home = () => (
  <div>

    {/* Hero Section */}
    <section className="hero valign-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col s12">
            <div className="main-copy center">
              <h1>Shout It Loud!</h1>
              <p>Create a group. Shout your message.</p>
              <Link to="#sign-up" className="btn-large modal-trigger">Get Started</Link>
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
            <Link to="#sign-up" className="btn-large modal-trigger">Get Started</Link>
          </div>
        </div>
      </div>
    </section>

    {/* Modals */}
    <SignIn />
    <SignUp />
    <ResetPassword />
  </div>
);

export default Home;
