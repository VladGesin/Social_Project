import React, { useState } from "react";
import SearchUsers from "./SearchUsers/SearchUsers";
import NewUserBtn from "./NewUserBtn/NewUserBtn";
import style from "./TopBar.module.scss";
const TopBar = ({ setIsNewUserOpen }) => {
   return (
      <div className={style.topBar}>
         <SearchUsers />

         <NewUserBtn
            onClick={() => {
               setIsNewUserOpen(true);
            }}
         />
      </div>
   );
};

export default TopBar;
