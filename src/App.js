import React,{useContext} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Login from './components/layout/Login/Login';
import MainWin from './components/layout/MainWin/mainWin';
import Context from "./store/Context";

const App = () => {
   const context = useContext(Context)
   return (
    <Router>
      {context.userState.isAuth?<MainWin/> : <Login/>}
    </Router>
  );
};

export default App;
