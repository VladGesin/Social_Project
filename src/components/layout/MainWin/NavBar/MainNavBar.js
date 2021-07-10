import React, { useContext } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import "./MainNavBar.css";
import NavMapLinks from "./NavBarMapping/NavMapLinks";
import Context from "../../../../store/Context";

const XpertesyItems = {
   link: [
      {
         name: "יצירת פגישה חדשה",
         path: "/Social_Project/newmeeting",
      },
      { name: "הפגישות שלי", path: "/Social_Project/mymeetings" },
   ],
};

const ComitteeItems = {
   link: [
      {
         name: "ועדות ראשי",
         path: "/Social_Project/committees",
         userType: "user, committee, chairperson, admin",
      },
      {
         name: "ניהול פניות לועדה",
         path: "/Social_Project/CommInquiryManagement",
         userType: "committee, chairperson",
      },
      {
         name: "סיכומי ישיבות",
         path: "/Social_Project/MeetingSummary",
         userType: "committee, chairperson",
      },
      {
         name: "סקרים",
         path: "/Social_Project/",
         userType: "user, committee, chairperson, admin",
      },
   ],
};

const MainNavBar = () => {
   const context = useContext(Context);

   return (
      <Navbar
         collapseOnSelect
         expand="lg"
         bg="light"
         variant="light"
         dir="rtl"
         className="mb-2"
      >
         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
         <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="m-auto links-container">
               {/* <NavLink to="/Social_Project/committees">וועדות</NavLink> */}
               <NavDropdown
                  title="ועדות"
                  id="collasible-nav-dropdown"
                  dir="rtl"
                  className="text-center"
               >
                  {ComitteeItems.link.map(
                     (item) =>
                        item.userType.includes(context.userState.userType) && (
                           <NavMapLinks link={item} key={item.name} />
                        )
                  )}
               </NavDropdown>
               <NavLink to="/Social_Project/maps">מפות</NavLink>
               <NavDropdown
                  title="Xpertesy"
                  id="collasible-nav-dropdown"
                  dir="rtl"
                  className="text-center"
               >
                  {XpertesyItems.link.map((item) => (
                     <NavMapLinks link={item} key={item.name} />
                  ))}
               </NavDropdown>
               {context.userState.userType == "admin" && (
                  <NavLink to="/Social_Project/SecretaryWin">מסך ניהול</NavLink>
               )}
            </Nav>
         </Navbar.Collapse>
      </Navbar>
   );
};

export default MainNavBar;
