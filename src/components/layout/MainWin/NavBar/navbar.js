import React, { Fragment } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import './navbar.css';

const navbar = () => {
  return (
    <Fragment>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light" dir="rtl">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto">
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
              <NavDropdown.Item href="#action/3.1">
                ועדה לדוגמא
              </NavDropdown.Item>
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
