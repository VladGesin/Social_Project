import React, { Fragment ,useEffect } from 'react';
import Header from './HeaderLine/header';
import NavBar from '../MainWin/NavBar/navbar';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Routes from './Routes/Routes';
import axios from 'axios';


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
