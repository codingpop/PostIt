import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import redirect from './../actions/redirect';
import setUser from './../actions/setUser';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

export default (ComposedComponent) => {
  class Authenticate extends Component {
    componentWillMount() {
      this.props.setUser();
    }

    render() {
      return (
        <div className="dashboard">
          <ComposedComponent {...this.props} />
          <Footer />
        </div>
      );
    }
  }

  const mapDispatchToProps = dispatch => (
    bindActionCreators({ redirect, setUser }, dispatch)
  );

  const mapStateToProps = state => ({
    user: state.user,
    router: state.router
  });

  return connect(mapStateToProps, mapDispatchToProps)(Authenticate);
};

