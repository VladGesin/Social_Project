import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './components/layout/Login/Login';
import MainWin from './components/layout/MainWin/mainWin';
import './css/commitmap.css';

const App = () => {
  return (
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/MainWin" component={MainWin} />
        </Switch>
      </Router>
  );
};

export default App;
