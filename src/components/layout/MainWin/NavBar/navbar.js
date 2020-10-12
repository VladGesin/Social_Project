import React, { Fragment } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import "./navbar.css";
// import { Link } from 'react-router-dom';
import NavMapLinks from "./NavBarMapping/NavMapLinks";

const navbar = () => {
   const CommiteeItems = {
      link: [
         { name: "ועדת ספורט", path: "/commiteesWin", item: "sport" },
         {
            name: "ועדת חינוך",
            path: "/commiteesWin",
            item: "education",
         },
      ],
   };
   const ChairmanItems = {
      link: [
         { name: "יושב ראש דניאלה", path: "/chairmanItems/", item: "test" },
      ],
   };
   const XpertesyItems = {
      link: [{ name: "יצירת פגישה חדשה", path: "/newmeeting", item: "test" }],
   };
   return (
      <Fragment>
         <Navbar
            collapseOnSelect
            expand="lg"
            bg="light"
            variant="light"
            dir="rtl"
         >
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

                     {ChairmanItems.link.map((item) => (
                        <NavMapLinks link={item} key={item.name} />
                     ))}
                  </NavDropdown>
                  <NavDropdown
                     className="ml-auto"
                     title="ועדות"
                     id="collasible-nav-dropdown"
                     dir="rtl"
                  >
                     {/******* Here Links For Commitees *******/}

                     {CommiteeItems.link.map((item) => (
                        <NavMapLinks link={item} key={item.name} />
                     ))}
                  </NavDropdown>
                  <Nav.Link className="ml-auto" href="#features">
                     <NavLink to="/maps">מפות</NavLink>
                  </Nav.Link>
                  <Nav.Link className="ml-auto" href="#pricing">
                     <NavLink to="/commiteesWin">אודות</NavLink>
                  </Nav.Link>
                  <NavDropdown
                     title="Xpertesy"
                     id="collasible-nav-dropdown"
                     dir="rtl"
                     className="ml-auto text-right"
                  >
                     {XpertesyItems.link.map((item) => (
                        <NavMapLinks link={item} key={item.name} />
                     ))}
                  </NavDropdown>
               </Nav>
               <Nav.Link className="justify-content-end" href="#pricing">
                  <NavLink to="/SecreturyWin">מסך ניהול</NavLink>
               </Nav.Link>
            </Navbar.Collapse>
         </Navbar>
      </Fragment>
   );
};

export default navbar;
