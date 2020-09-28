import React, { Fragment } from 'react';
import Header from './HeaderLine/header';
import NavBar from '../MainWin/NavBar/navbar';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Routes from './Routes/Routes';

const mainWin = () => {
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

export default mainWin;
