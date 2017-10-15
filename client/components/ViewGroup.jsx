import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ChatHeader from './ChatHeader.jsx';
import Footer from './Footer.jsx';
import Members from './Members.jsx';
import PostMessage from './PostMessage.jsx';

import getMessages from './../actions/getMessages';
import getMembers from './../actions/getMembers';

/**
 * The ViewGroup Component
 * @class ViewGroup
 * @extends {Component}
 */
class ViewGroup extends Component {

  /**
   * Creates an instance of ViewGroup.
   * @memberof ViewGroup
   */
  constructor() {
    super();

    this.state = {
      messages: []
    };

    this.groupId = '';
  }

  componentWillMount() {
    this.groupId = this.props.match.params.groupId;
    this.props.getMessages(this.groupId);
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
    } else {
      messageList = (
        <div>
          <div className="card chat-card">
            <div className="card-content">
              <p className="flow-text">No messages</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="dashboard chatboard">
        <ChatHeader />
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
            <PostMessage />
          </div> { /* overlay */}
        </section>
        <Footer />
        <Members groupId={this.groupId} />
      </div>
    );
  }
}

const mapStateToProps = state => ({ messages: state.messages });

const mapDispatchToProps = dispatch => (
  bindActionCreators({ getMessages, getMembers }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ViewGroup);
