import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Paginator extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <section>
        <div className="row content">
          <div className="container-fluid">
            <ul className="pagination center">
              <li className="disabled"><a href="#!">
                <i className="material-icons">chevron_left</i></a>
              </li>
              <li className="active"><a href="#!">1</a></li>
              <li className="waves-effect"><a href="#!">2</a></li>
              <li className="waves-effect"><a href="#!">3</a></li>
              <li className="waves-effect"><a href="#!">4</a></li>
              <li className="waves-effect"><a href="#!">5</a></li>
              <li className="waves-effect">
                <a href="#!"><i className="material-icons">chevron_right</i></a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    );
  }
}

export default Paginator;
