import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CommDescription from './commDescription/commDescription'

export class CommiteesWin extends Component {
    render() {
      return (
        <Fragment>
          <Router>
              <Switch>
              <Route path="/" component={CommDescription} />
            </Switch>
          </Router>
        </Fragment>
      );
    }
  }
  
  export default CommiteesWin;
