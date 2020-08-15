import React, { Component, Fragment } from 'react';
import Header from './HeaderLine/header';
import NavBar from '../MainWin/NavBar/navbar'

export class mainWin extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <NavBar />
      </Fragment>
    );
  }
}

export default mainWin;
