import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Members from './Members.jsx';
import getMessages from './../actions/getMessages';
import getMembers from './../actions/getMembers';

class ViewGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };
  }

  componentWillMount() {
    localStorage.setItem('currentGroup', this.props.match.params.groupId);
    this.props.getMessages(this.props.match.params.groupId);
    this.props.getMembers(localStorage.currentGroup);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        messages: nextProps.messages
      });
    }
  }

  componentDidMount() {
    $('.button-collapse').sideNav();
    $('.modal').modal();
  }

  render() {
    let messageList;
    if (this.state.messages.length > 0) {
      messageList = this.props.messages.map(message => (
        <div key={message.messageId} className="card chat-card">
          <div className="card-content">
            <p className="flow-text">{message.body}</p>
          </div>
        </div>
      ));
    }

    return (
      <div className="dashboard">
        <Header />
        <section className="board">
          <div className="overlay">
            <div className="row content chat-area">
              <div className="container-fluid">
                <div className="col s12">
                  {
                    messageList
                  }
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
        <Members />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({ messages: state.messages });

const mapDispatchToProps = dispatch => (
  bindActionCreators({ getMessages, getMembers }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ViewGroup);
