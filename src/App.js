import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/layout/Login/Login";
import MainWin from "./components/layout/MainWin/mainWin";
import Context from "./store/Context";

const App = () => {
   const context = useContext(Context);
   useEffect(() => {
      if (sessionStorage.getItem("tempUser")) {
         context.loadUser();
      }
   }, []);
   return (
      //   <ContextProvider>
      //       <Router>
      //           <Switch>
      //               <Route path="/Social_Project/" exact component={Login} />
      //               <Route path="/Social_Project/MainWin" component={MainWin} />
      //           </Switch>
      //       </Router>
      //   </ContextProvider>
      <Router>{context.userState.isAuth ? <MainWin /> : <Login />}</Router>
   );
};

export default App;
