import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/layout/Login/Login";
import MainWin from "./components/layout/MainWin/mainWin";

import Context from "./store/Context";

const App = () => {
   const context = useContext(Context);
   useEffect(() => {
      context.loadUser();
   }, []);

   return <>{!context.userState.loading && <MainWin />}</>;
};

export default App;
