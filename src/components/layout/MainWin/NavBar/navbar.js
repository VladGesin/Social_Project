import React, { Fragment } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './navbar.css';
// import { Link } from 'react-router-dom';

const navbar = () => {
  const commiteeItems = [{ name: 'ניסוי', path: '/commiteesWin' }];
  const chairmanItems = [{ name: 'ניסוי', path: '/commiteesWin' }];
  return (
    <Fragment>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light" dir="rtl">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto ">
            <NavDropdown
              title="יושב ראש"
              id="collasible-nav-dropdown"
              dir="rtl"
              className="ml-auto text-right"
            >
              {/******* Here Links For Chairman *******/}

              <NavDropdown.Item className="text-right">
                {chairmanItems.map((item) => (
                  <NavLink to={item.path}>{item.name}</NavLink>
                ))}
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              className="ml-auto"
              title="ועדות"
              id="collasible-nav-dropdown"
              dir="rtl"
            >
              {/******* Here Links For Commitees *******/}
              <NavDropdown.Item className="text-right">
                {commiteeItems.map((item) => (
                  <NavLink to={item.path}>{item.name}</NavLink>
                ))}
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link className="ml-auto" href="#features">
              <NavLink to="/maps">מפות</NavLink>
            </Nav.Link>
            <Nav.Link className="ml-auto" href="#pricing">
              <NavLink to="/commiteesWin">אודות</NavLink>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Fragment>
  );
};

export default navbar;
