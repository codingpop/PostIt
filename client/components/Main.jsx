import React from 'react';
import Header from './Header.jsx';
import Home from './Home.jsx';

const Main = () => (
  <main>
    <Header
      signIn="Sign In"
      signInHref="#sign-in"
      getStarted="Get Started"
      getStartedHref="#sign-up"
    />
    <Home />
  </main>
);

export default Main;
