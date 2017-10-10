import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import createGroup from './../actions/createGroup';

/**
 * @class CreateGroup
 * @author Babatunde Adeyemi <tundewrites@gmail.com>
 */
class CreateGroup extends Component {

  /**
   * Initializes the initial component state
   */
  constructor() {
    super();

    this.initialState = {
      name: '',
      description: ''
    };

    this.state = this.initialState;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * Handles onChange event on input fields
   * @param {object} event
   * @returns {void}
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * Handles onSubmit event on form submission
   * @param {object} form
   * @returns {void}
   */
  handleSubmit(form) {
    form.preventDefault();
    this.props.createGroup(this.state);
    this.setState(this.initialState);
  }

  /**
   * Renders the CreateGroup component
   * @returns {object} - CreateGroup Component
   */
  render() {
    return (
      <div id="create-group" className="modal">
        <div className="modal-content">
          <div className="row">
            <h5 className="center">Create group</h5>
            <form onSubmit={form => this.handleSubmit(form)} className="col s12">
              <div className="row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">edit</i>
                  <input
                    onChange={this.handleChange}
                    id="group-name"
                    value={this.state.name}
                    name="name"
                    type="text"
                    className="validate"
                    required
                  />
                  <label htmlFor="group-name">Group name</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <textarea
                    onChange={this.handleChange}
                    value={this.state.description}
                    name="description"
                    id="description"
                    className="materialize-textarea"
                    maxLength="100"
                    required
                  />
                  <label htmlFor="description">Description</label>
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
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({ createGroup }, dispatch)
);

export default connect(null, mapDispatchToProps)(CreateGroup);
