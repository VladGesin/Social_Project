import React, { Component, Fragment } from 'react';
import Header from './HeaderLine/header';
import NavBar from '../MainWin/NavBar/navbar';
import welcomPage from './WelcomPage/welcomPage';
import commiteesWin from '../CommiteesWin/commiteesWin';
import { BrowserRouter as Router, Route } from 'react-router-dom';

export class mainWin extends Component {
  render() {
    return (
      <Fragment>
        <Router>
          <Header />
          <NavBar />
          <Route path="/MainWin" component={welcomPage} />
          <Route path="/commiteesWin" component={commiteesWin} />
        </Router>
      </Fragment>
    );
  }
}

export default mainWin;
