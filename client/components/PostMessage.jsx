import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import postMessage from './../actions/postMessage';

/**
 * @class PostMessage
 * @extends {Component}
 */
class PostMessage extends Component {

  /**
   * Creates an instance of PostMessage.
   * @memberof PostMessage
   */
  constructor() {
    super();

    this.initialState = {
      body: '',
      priority: ''
    };

    this.state = this.initialState;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * Handles onChange event on input fields
   * @param {object} event - the input field onChange event
   *
   * @memberof SignUp
   * @returns {void}
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * Handles onSubit event on form submission
   * @param {object} form - the form onSubmit event
   * @memberof SignUp
   *
   * @returns {void}
   */
  handleSubmit(form) {
    form.preventDefault();
    this.props.postMessage(this.state, this.props.groupId);
    this.setState(this.initialState);
  }

  /**
   * PostMessage
   * @memberof PostMessage
   *
   * @returns {object} - PostMessage Component
   */
  render() {
    return (
      <div className="row content">
        <div className="row chat-box zero-padding-margin">
          <form onSubmit={this.handleSubmit}>
            <div className="col s12">
              <div className="col m9 l10">
                <textarea
                  id="textarea1"
                  className="zero-padding-margin"
                  name="body"
                  onChange={this.handleChange}
                  value={this.state.body}
                />
              </div>
              <div className="priority m2 col l1">
                <p className="normal">
                  <input
                    className="with-gap"
                    name="priority"
                    value="normal"
                    type="radio"
                    id="normal"
                    onBlur={this.handleChange}
                  />
                  <label htmlFor="normal">Normal</label>
                </p>
                <p className="urgent">
                  <input
                    className="with-gap"
                    name="priority"
                    value="urgent"
                    type="radio"
                    id="urgent"
                    onBlur={this.handleChange}
                  />
                  <label htmlFor="urgent">Urgent</label>
                </p>
                <p className="critical">
                  <input
                    className="with-gap"
                    name="priority"
                    value="critical"
                    type="radio"
                    id="critical"
                    onChange={this.handleChange}
                  />
                  <label htmlFor="critical">Critical</label>
                </p>
              </div>
              <div className="col s1">
                <button
                  className="btn btn-large waves-effect waves-light"
                  type="submit"
                  name="action"
                >
                  <i className="material-icons">send</i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

PostMessage.propTypes = {
  groupId: PropTypes.string.isRequired,
  postMessage: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({ postMessage }, dispatch)
);

export default connect(null, mapDispatchToProps)(PostMessage);
