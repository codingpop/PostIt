import React, { Component } from 'react';
import axios from 'axios';

class CreateGroup extends Component {
  constructor() {
    super();

    this.initialState = {
      groupName: '',
      description: '',
      banner: ''
    };

    this.state = this.initialState;
    this.createGroup = this.createGroup.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  createGroup(form) {
    form.preventDefault();
    console.log(this.state);
    this.setState(this.initialState);
    $('#create-group').modal('close');
  }

  render() {
    return (
      <div id="create-group" className="modal">
        <div className="modal-content">
          <div className="row">
            <h5 className="center">Create group</h5>
            <form onSubmit={form => this.createGroup(form)} className="col s12">
              <div className="row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">edit</i>
                  <input onChange={this.handleChange} id="group-name" value={this.state.groupName} name="groupName" type="text" className="validate" defaultValue={this.state.name} required />
                  <label htmlFor="group-name">Group name</label>
                </div>
              </div>
              <div className="row">
                <div className="file-field input-field col s12">
                  <div className="btn-large">
                    <span>Banner</span>
                    <input type="file" value={this.state.banner} onChange={this.handleChange} name="banner" />
                  </div>
                  {/*<div className="file-path-wrapper">
                    <input className="file-path validate" type="text" placeholder="Only JPG and PNG images allowed" required />
                  </div>*/}
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <textarea onChange={this.handleChange} value={this.state.description} name="description" id="description" className="materialize-textarea" maxLength="100" required />
                  <label htmlFor="description">Description</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <button className="btn btn-large waves-effect waves-light" type="submit" name="action">Continue</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateGroup;
