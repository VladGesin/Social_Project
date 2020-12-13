import React, { useState, useEffect } from "react";
import searchIcon from "../../../assets/search.svg";
import style from "./SearchUsers.module.scss";
const SearchUsers = ({ users, setUsers }) => {
   const [allUsers, setAllUsers] = useState([]);

   useEffect(() => {
      if (allUsers.length === 0) setAllUsers([...users]);
   }, [users]);

   const handleSearch = (e) => {
      if (e.target.value === "") {
         setUsers(allUsers);
         return;
      }
      const filteredUsers = allUsers.filter(
         (i) =>
            i.first_name.toLowerCase().includes(e.target.value.toLowerCase()) ||
            i.last_name.toLowerCase().includes(e.target.value.toLowerCase()) ||
            i.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
            i.user_id.toLowerCase().includes(e.target.value.toLowerCase()) ||
            i.phone.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setUsers(filteredUsers);
   };
   return (
      <div className={style.root}>
         <img src={searchIcon} />
         <input
            placeholder="חיפוש משתמשים"
            className={style.search}
            onChange={handleSearch}
         />
      </div>
   );
};

export default SearchUsers;
