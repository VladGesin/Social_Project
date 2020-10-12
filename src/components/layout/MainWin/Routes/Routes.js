import React, { Fragment } from 'react';
import WelcomPage from '../../MainWin/WelcomPage/WelcomPage';
import commiteesWin from '../../CommiteesWin/commiteesWin';
import { Route } from 'react-router-dom';
import chairmanItems from '../../ChairmanItems/ChairmanItems';
import secreturywin from '../../SecretaryWin/SecreturyWin'

const COMPONENT_MAP = {
  WelcomPage: WelcomPage,
  commiteesWin: commiteesWin,
  chairmanItems: chairmanItems,
  secreturywin:secreturywin
};

// const COMPONENT_MAP = menuItems.map((item)=>)

const Routes = () => {
  const menuItems = [
    { name: 'WelcomPage', path: '/MainWin' },
    { name: 'commiteesWin', path: '/commiteesWin/:education' },
    { name: 'commiteesWin', path: '/commiteesWin/:sport' },
    { name: 'chairmanItems', path: '/chairmanItems/:item' },
    { name: 'secreturywin', path: '/secreturywin' },
  ];
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