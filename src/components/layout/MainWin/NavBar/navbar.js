import React, { Fragment } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './navbar.css';
// import { Link } from 'react-router-dom';

const navbar = () => {
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
              <NavDropdown.Item href="#action/3.1">
                יושב ראש לדוגמא
              </NavDropdown.Item>

              <NavDropdown.Item href="#action/3.2">
                יושב ראש שני
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                יושב ראש שלישי
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              className="ml-auto"
              title="ועדות"
              id="collasible-nav-dropdown"
              dir="rtl"
            >
              {/******* Here Example for nav link *******/}
              <NavDropdown.Item className="text-right">
                <NavLink to="/commiteesWin">ועדה לדוגמא</NavLink>
              </NavDropdown.Item>
              {/******* Here Example for nav link *******/}

              <NavDropdown.Item href="#action/3.2">ועדה שני</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">ועדה שלישי</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link className="ml-auto" href="#features">
              מפות
            </Nav.Link>
            <Nav.Link className="ml-auto" href="#pricing">
              אודות
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Fragment>
  );
};

export default navbar;
