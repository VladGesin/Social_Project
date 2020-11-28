import React from "react";
import searchIcon from "../../../assets/search.svg";
import style from "./SearchUsers.module.scss";
const SearchUsers = () => {
   return (
      <div className={style.root}>
         <img src={searchIcon} />
         <input placeholder="חיפוש משתמשים" className={style.search} />
      </div>
   );
};

export default SearchUsers;
