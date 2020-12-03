import React, { useState } from "react";
import Context from "./Context";
import api from "../api";
import setAuthToken from "../utils/setAuthToken";

const initialUserState = {
   id: null,
   firstName: null,
   lastName: null,
   token: null,
   isAuth: false,
   loading: true,
   email: null,
   birthday: null,
};

const ContextProvider = (props) => {
   const [userState, setUserState] = useState(initialUserState);

   const loadUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
         //Set the token in the headers request
         setAuthToken(token);
         //Get all user details by the token in the header
         const res = await api.get("user");
         const user = res.data;
         const updatedUser = {
            birthday: user.birthday,
            email: user.email,
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

   const login = async (userID, password, onError = false) => {
      try {
         // Get token if credentials are valid
         const res = await api.post("/loginManager/login/", {
            password,
            userID,
         });
         const token = res.data.token[0].token;

         // Set the token in the localStorage
         localStorage.setItem("token", token);
         loadUser();
      } catch (e) {
         console.log(e);
         if (onError !== false) {
            onError();
         }
      }
   };

   const logout = async () => {
      localStorage.removeItem("token");
      sessionStorage.removeItem("tempUser");
      setUserState(initialUserState);
   };

   const register = async ({
      id,
      firstName,
      lastName,
      email,
      password,
      type,
      birthday,
      contactUser,
      phone,
   }) => {
      try {
         const res = await api.post("/users", {
            id,
            firstName,
            lastName,
            email,
            password,
            type,
            birthday,
            contactUser,
            phone,
         });
         return res;
      } catch (e) {
         console.log(e);
      }
   };

   return (
      <Context.Provider
         value={{ userState, login, loadUser, logout, register }}
      >
         {props.children}
      </Context.Provider>
   );
};

export default ContextProvider;
