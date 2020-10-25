import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './components/layout/Login/Login';
import MainWin from './components/layout/MainWin/mainWin';
import ContextProvider from "./store/ContextProvider";

const App = () => {
  return (
      <ContextProvider>
          <Router>
              <Switch>
                  <Route path="/Social_Project/" exact component={Login} />
                  <Route path="/Social_Project/MainWin" component={MainWin} />
              </Switch>
          </Router>
      </ContextProvider>

  );
};

export default App;
