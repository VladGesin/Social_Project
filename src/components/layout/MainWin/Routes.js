import React, { Component } from 'react';
import WelcomPage from './WelcomPage/WelcomPage';
import commiteesWin from '../CommiteesWin/commiteesWin';
import { Route } from 'react-router-dom';

export class Routes extends Component {
  render() {
    return (
      <div>
        <Route path="/MainWin" component={WelcomPage} />
        <Route path="/commiteesWin" component={commiteesWin} />
      </div>
    );
  }
}

export default Routes;
