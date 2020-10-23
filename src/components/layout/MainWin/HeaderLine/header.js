import React from 'react';
import avatar from '../../../Icons/Avatars/avatar.png';
import './header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
      <header className="container-fluid">
        <div className="row">
          <div className="col align-self-end">
            {/* ‎Here put api to personal page */}
            <Link to="/personal">
              <img className="avatar" alt="avatar" src={avatar}></img>
            </Link>
          </div>
          <div className="col text-right">
            <Link to="/MainWin">
              <h1 id="title">מועצת הורים</h1>
            </Link>
          </div>
        </div>
      </header>
  );
};

export default Header;
