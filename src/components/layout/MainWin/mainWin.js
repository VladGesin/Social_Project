import React, { Component, Fragment } from 'react';
import Header from './HeaderLine/header';
import NavBar from '../MainWin/NavBar/navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';

export class mainWin extends Component {
  render() {
    return (
      <Fragment>
        <Router>
          <Header />
          <NavBar />
          <Routes />
        </Router>
      </Fragment>
    );
  }
}

export default mainWin;
