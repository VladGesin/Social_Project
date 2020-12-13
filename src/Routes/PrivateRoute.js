import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import Context from "../store/Context";

const PrivateRoute = ({ component: Component, ...rest }) => {
   const context = useContext(Context);

   return (
      <Route
         {...rest}
         render={(props) => {
            return !context.userState.loading && !context.userState.isAuth ? (
               <Redirect to="/Social_Project/" />
            ) : (
               <Component {...props} />
            );
         }}
      />
   );
};

export default PrivateRoute;
