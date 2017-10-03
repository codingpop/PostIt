import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from './Header.jsx';
import Footer from './Footer.jsx';


class ViewGroup extends Component {

  render() {
    return (
      <div className="dashboard">
        <Header />
        <section className="board">
          <div className="overlay">
            <div className="row content chat-area">
              <div className="container-fluid">
                <div className="col s12">
                  <div className="card chat-card">
                    <div className="card-content">
                      <p className="flow-text">I am a very</p>
                    </div>
                  </div>
                  <div className="card chat-card">
                    <div className="card-content">
                      <p className="flow-text">I am a very</p>
                    </div>
                  </div>
                  <div className="card chat-card">
                    <div className="card-content">
                      <p className="flow-text">I am a very</p>
                    </div>
                  </div>
                  <div className="card chat-card">
                    <div className="card-content">
                      <p className="flow-text">I am a very</p>
                    </div>
                  </div>
                  <div className="card chat-card">
                    <div className="card-content">
                      <p className="flow-text">I am a very</p>
                    </div>
                  </div>
                  <div className="card chat-card">
                    <div className="card-content">
                      <p className="flow-text">I am a very</p>
                    </div>
                  </div>
                  <div className="card chat-card">
                    <div className="card-content">
                      <p className="flow-text">I am a very</p>
                    </div>
                  </div>
                  <div className="card chat-card">
                    <div className="card-content">
                      <p className="flow-text">I am a very</p>
                    </div>
                  </div>
                  <div className="card chat-card">
                    <div className="card-content">
                      <p className="flow-text">I am a very</p>
                    </div>
                  </div>
                  <div className="card chat-card">
                    <div className="card-content">
                      <p className="flow-text">I am a very</p>
                    </div>
                  </div>
                  <div className="card chat-card">
                    <div className="card-content">
                      <p className="flow-text">I am a very</p>
                    </div>
                  </div>
                  <div className="card chat-card">
                    <div className="card-content">
                      <p className="flow-text">I am a very</p>
                    </div>
                  </div>
                  <div className="card chat-card">
                    <div className="card-content">
                      <p className="flow-text">I am a very</p>
                    </div>
                  </div>
                  <div className="card chat-card">
                    <div className="card-content">
                      <p className="flow-text">I am a very</p>
                    </div>
                  </div>
                  <div className="card chat-card">
                    <div className="card-content">
                      <p className="flow-text">I am a very</p>
                    </div>
                  </div>
                  <div className="card chat-card">
                    <div className="card-content">
                      <p className="flow-text">I am a very</p>
                    </div>
                  </div>
                  <div className="card chat-card">
                    <div className="card-content">
                      <p className="flow-text">I am a very</p>
                    </div>
                  </div>
                  <div className="card chat-card">
                    <div className="card-content">
                      <p className="flow-text">I am a very</p>
                    </div>
                  </div>
                  <div className="card chat-card">
                    <div className="card-content">
                      <p className="flow-text">I am a very</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row content">
              <div className="row chat-box zero-padding-margin">
                <form>
                  <div className="col s12">
                    <div className="col m9 l10">
                      <textarea id="textarea1" className="zero-padding-margin" />
                    </div>
                    <div className="priority m2 col l1">
                      <p className="normal">
                        <input className="with-gap" name="group1" type="radio" id="normal" defaultChecked />
                        <label htmlFor="normal">Normal</label>
                      </p>
                      <p className="urgent">
                        <input className="with-gap" name="group1" type="radio" id="urgent" />
                        <label htmlFor="urgent">Urgent</label>
                      </p>
                      <p className="critical">
                        <input className="with-gap" name="group1" type="radio" id="critical" />
                        <label htmlFor="critical">Critical</label>
                      </p>
                    </div>
                    <div className="col s1">
                      <button className="btn btn-large waves-effect waves-light" type="submit" name="action">
                        <i className="material-icons">send</i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div> { /* overlay */}
        </section>
        <Footer />
      </div>
    );
  }
}

export default ViewGroup;
