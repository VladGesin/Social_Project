import React from "react";
import SearchUsers from "./SearchUsers/SearchUsers";
import NewUserBtn from "./NewUserBtn/NewUserBtn";
import style from "./TopBar.module.scss";
const TopBar = () => {
   return (
      <div className={style.topBar}>
         <SearchUsers />
         <NewUserBtn />
      </div>
   );
};

export default TopBar;
