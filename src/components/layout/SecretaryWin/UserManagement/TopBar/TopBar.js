import React, { useState } from "react";
import SearchUsers from "./SearchUsers/SearchUsers";
import NewUserBtn from "./NewUserBtn/NewUserBtn";
import style from "./TopBar.module.scss";
const TopBar = ({ setIsNewUserOpen, users, setUsers }) => {
   return (
      <div className={style.topBar}>
         <SearchUsers users={users} setUsers={setUsers} />

         <NewUserBtn
            onClick={() => {
               setIsNewUserOpen(true);
            }}
         />
      </div>
   );
};

export default TopBar;
