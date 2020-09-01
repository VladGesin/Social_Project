import React, { Fragment } from 'react';
import WelcomPage from '../../MainWin/WelcomPage/WelcomPage';
import commiteesWin from '../../CommiteesWin/commiteesWin';
import { Route } from 'react-router-dom';

const menuItems = [
  { name: 'WelcomPage', path: '/MainWin' },
  { name: 'commiteesWin', path: '/commiteesWin' },
];
const COMPONENT_MAP = {
  WelcomPage: WelcomPage,
  commiteesWin: commiteesWin,
};

// const COMPONENT_MAP = menuItems.map((item)=>)

const Routes = () => {
  return (
    <Fragment>
      {menuItems.map((item) => (
        //COMPONENT_MAP[item.name] returns componentName
        <Route path={item.path} component={COMPONENT_MAP[item.name]} />
      ))}
    </Fragment>
  );
};

export default Routes;
