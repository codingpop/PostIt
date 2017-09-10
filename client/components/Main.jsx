import React from 'react';
import Header from './Header.jsx';
import Landing from './Landing.jsx';

const Main = () => (
  <main>
    <Header
      signIn="Sign In"
      signInHref="#sign-in"
      getStarted="Get Started"
      getStartedHref="#sign-up"
    />
    <Landing />
  </main>
);

export default Main;
