import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import getMembers from './../actions/getMembers';
import searchUsers from './../actions/searchUsers';

/**
 * @class Members
 * @extends {Component}
 */
class Members extends Component {
  constructor() {
    super();

    this.initialState = {
      newMembers: []
    };

    this.query = '';

    this.state = this.initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Pre-loads the group members
   * @memberof Members
   *
   * @returns {void}
   */
  componentDidMount() {
    this.props.getMembers(this.props.groupId);
    $('.collapsible').collapsible();
  }

  /**
   * Handles the changes in the sign in form
   * @param {any} event
   * @memberof SignIn
   * @return {void}
   */
  handleChange(event) {
    this.query = event.target.value;
    // this.setState({ [event.target.name]: event.target.value });
    this.props.searchUsers(this.query);
  }

  /**
   * Handles sign in form submission
   * @param {any} form
   * @memberof SignIn
   * @returns {void}
   */
  handleSubmit(form) {
    form.preventDefault();
  }

  /**
   * @memberof Members
   *
   * @returns {object} - Members component
   */
  render() {
    let usersList;

    if (!this.query) {
      usersList = [];
    } else if (!this.props.search.length) {
      usersList = 'No users found';
    } else {
      usersList = this.props.search.map(user => (
        <li
          key={user.userName}
        >
          <input
            className="filled-in"
            name="user"
            type="checkbox"
            id={user.userName}
          />
          <label
            className="middle"
            htmlFor={user.userName}
          >{user.userName}</label>
        </li>
      ));
    }

    return (
      <div id="view-members" className="modal">
        <div className="modal-content">
          <div className="row">
            <h5 className="center">Members</h5>

            <form
              onSubmit={this.handleSubmit}
              className="col s12"
              autoComplete="off"
            >
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="search-user"
                    name="query"
                    onChange={this.handleChange}
                    type="text"
                    className="validate"
                  />
                  <label htmlFor="search-user">Find users</label>
                </div>
              </div>
              <ul className="search-result">
                {usersList}
              </ul>

              <button
                className="btn btn-large waves-effect waves-light"
                type="submit"
                name="action"
              >Add members</button>
              <br />
              <br />
            </form>

            <div className="col s12">
              <ul className="collapsible" data-collapsible="accordion">
                <li>
                  <div
                    className="collapsible-header"
                  ><i className="material-icons">group</i>View members</div>
                  <div className="collapsible-body"><ul>
                    {
                      this.props.members.map(member => (
                        <li
                          key={member.userName}
                          className="member"
                        >{member.userName}</li>
                      ))
                    }
                  </ul></div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Members.propTypes = {
  groupId: PropTypes.string.isRequired,
  members: PropTypes.shape(PropTypes.arrayOf(PropTypes.object)).isRequired,
  search: PropTypes.shape(PropTypes.arrayOf(PropTypes.object)).isRequired,
  getMembers: PropTypes.func.isRequired,
  searchUsers: PropTypes.func.isRequired
};

const mapStateToProps = state => (
  {
    members: state.members,
    search: state.search
  }
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({ getMembers, searchUsers }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Members);
