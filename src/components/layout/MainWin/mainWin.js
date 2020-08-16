import React, { Component, Fragment } from 'react';
import Header from './HeaderLine/header';
import NavBar from '../MainWin/NavBar/navbar';
import WelcomPage from './WelcomPage/WelcomPage';

export class mainWin extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <NavBar />
        <WelcomPage />
      </Fragment>
    );
  }
}

export default mainWin;
