import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

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

  /**
   * Prefetches the messages in a group
   * @memberof ViewGroup
   *
   * @returns {void}
   */
  componentWillMount() {
    this.groupId = this.props.match.params.groupId;
    this.props.getMessages(this.groupId);
  }

  /**
   * Ensures the Materialize modals work
   * @memberof ViewGroup
   *
   * @returns {void}
   */
  componentDidMount() {
    $('.button-collapse').sideNav();
    $('.modal').modal();
  }

  /**
   * Catches the delayed props
   * @param {any} nextProps - delayed props
   * @memberof ViewGroup
   *
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        messages: nextProps.messages
      });
    }
  }

  /**
   * ViewGroup
   * @memberof ViewGroup
   *
   * @returns {object} - ViewGroup component
   */
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
            <PostMessage groupId={this.groupId} />
          </div>
        </section>
        <Footer />
        <Members groupId={this.groupId} />
      </div>
    );
  }
}

ViewGroup.propTypes = {
  getMessages: PropTypes.func.isRequired,
  messages: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      groupId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

const mapStateToProps = state => ({ messages: state.messages });

const mapDispatchToProps = dispatch => (
  bindActionCreators({ getMessages, getMembers }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ViewGroup);
