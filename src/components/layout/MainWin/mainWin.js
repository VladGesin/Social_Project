import React, { Fragment } from 'react';
import Header from './HeaderLine/header';
import NavBar from '../MainWin/NavBar/navbar';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Routes from './Routes/Routes';



function MainWin  () {
  return (
    <Fragment>
      <Router>
        <Header />
        <NavBar />
        <Switch>
          <Routes />
        </Switch>
      </Router>
    </Fragment>
  );
};

export default MainWin;
