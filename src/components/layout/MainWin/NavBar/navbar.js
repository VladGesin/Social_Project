import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import NavMapLinks from "./NavBarMapping/NavMapLinks";


const XpertesyItems = {
   link: [
      {
         name: "יצירת פגישה חדשה",
         path: "/Social_Project/newmeeting",
         item: "test",
      },
      { name: "הפגישות שלי", path: "/Social_Project/mymeetings", item: "test" },
   ],
};

const navbar = () => {
   return (
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light" dir="rtl">
         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
         <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="m-auto links-container">
               <NavLink to="/Social_Project/committees">וועדות</NavLink>
               <NavLink to="/Social_Project/maps">מפות</NavLink>
               <NavDropdown
                  title="Xpertesy"
                  id="collasible-nav-dropdown"
                  dir="rtl"
                  className="text-right"
               >
                  {XpertesyItems.link.map((item) => (
                     <NavMapLinks link={item} key={item.name} />
                  ))}
               </NavDropdown>

               <NavLink to="/Social_Project/SecretaryWin">מסך ניהול</NavLink>
            </Nav>
         </Navbar.Collapse>
      </Navbar>
   );
};

export default navbar;
