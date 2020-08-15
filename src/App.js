import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/layout/Login/Login';

const App = () => {
  return (
    <Fragment>
      <Router>
        <Switch>
          <Login/>
        </Switch>
      </Router>
    </Fragment>
  )
};

export default App;
