import React, { Fragment } from "react";
import { NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavMapLinks = (props) => {
   return (
      <Fragment>
         <li>
            {console.log(props.link.item)}
            <NavDropdown.Item className="text-right">
               {/* NavLink */}
               <NavLink
                  to={{
                     pathname: `${props.link.path}`,
                     state: { item: props.link.item },
                  }}
               >
                  <span style={{ textAlign: "center" }}>{props.link.name}</span>
               </NavLink>
            </NavDropdown.Item>
         </li>
      </Fragment>
   );
};

export default NavMapLinks;
