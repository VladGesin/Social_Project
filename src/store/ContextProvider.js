import React, { useState } from "react";
import Context from "./Context";
import axios from "axios";
import api from "../api";
import setAuthToken from "../utils/setAuthToken";

const initialUserState = {
   id: null,
   firstName: null,
   lastName: null,
   token: null,
   isAuth: false,
   loading: true,
};

const ContextProvider = (props) => {
   const [userState, setUserState] = useState(initialUserState);

   const loadUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
         //Set the token in the headers request
         setAuthToken(token);
         //Get all user details by the token in the header
         console.log("here");
         const res = await api.get("user");
         const user = res.data;
         console.log("here", user);
         const updatedUser = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            token: token,
            isAuth: true,
            loading: false,
         };
         setUserState(updatedUser);
      } else
         setUserState((state) => {
            return { ...state, loading: false };
         });
   };

   const login = async (userID, password) => {
      try {
         // Get token if credentials are valid
         const res = await api.post("/loginManager/login/", {
            password,
            userID,
         });
         const token = res.data.token[0].token;
         console.log(token);

         // Set the token in the localStorage
         localStorage.setItem("token", token);

         loadUser();
      } catch (e) {
         console.log(e);
      }
   };

   const logout = async () => {
      localStorage.removeItem("token");
      setUserState(initialUserState);
   };

   return (
      <Context.Provider value={{ userState, login, logout }}>
         {props.children}
      </Context.Provider>
   );
};

export default ContextProvider;
