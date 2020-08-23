import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './HeaderLine/header';
import NavBar from '../MainWin/NavBar/navbar';
import WelcomPage from './WelcomPage/WelcomPage';


export class mainWin extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <NavBar />
        
        <Router>
          <Switch>
            <Route path="/" component={WelcomPage} />
          </Switch>
        </Router>
      </Fragment>
    );
  }
}

export default mainWin;
