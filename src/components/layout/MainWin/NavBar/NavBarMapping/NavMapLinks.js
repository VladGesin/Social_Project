import React, { Fragment } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavMapLinks = (props) => {
  return (
    <Fragment>
      <li>
        <NavDropdown.Item className="text-right">
          <NavLink to={props.link.path}>{props.link.name}</NavLink>
        </NavDropdown.Item>
      </li>
    </Fragment>
  );
};

export default NavMapLinks;
