import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import Context from "../store/Context";

const AdminRoute = ({ component: Component, ...rest }) => {
   const context = useContext(Context);

   return (
      <Route
         {...rest}
         render={(props) => {
            {
               console.log(context.userState.userType === "admin");
            }
            return !context.userState.loading &&
               context?.userState?.userType !== "admin" ? (
               <Redirect to="/Social_Project/" />
            ) : (
               <Component {...props} />
            );
         }}
      />
   );
};

export default AdminRoute;
