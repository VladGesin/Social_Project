import React, { Fragment } from 'react';
import avatar from '../../../Icons/Avatars/avatar.png';
import './header.css';

const Header = () => {
  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col align-self-end">
            <img className="avatar" alt="avatar" src={avatar}></img>
          </div>
          <div className="col text-right">
            <h1 id="title">מועצת הורים</h1>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
