import React, { Component } from 'react';

class CreateGroup extends Component {
  constructor() {
    super();
    this.createGroup = this.createGroup.bind(this);
  }

  createGroup(form) {
    form.preventDefault();
    const group = {
      name: this.name.value,
      description: this.description.value,
      banner: this.banner.value
    };
    console.log(group);
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
                  <input ref={(input) => { this.name = input; }} id="group-name" type="text" className="validate" required />
                  <label htmlFor="group-name">Group name</label>
                </div>
              </div>
              <div className="row">
                <div className="file-field input-field col s12">
                  <div className="btn-large">
                    <span>Banner</span>
                    <input type="file" />
                  </div>
                  <div className="file-path-wrapper">
                    <input ref={(input) => { this.banner = input; }} className="file-path validate" type="text" placeholder="Only JPG and PNG images allowed" required />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <textarea ref={(input) => { this.description = input; }} id="description" className="materialize-textarea" maxLength="100" required />
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
