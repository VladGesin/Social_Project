import React, { useState, useEffect } from "react";
import TopBar from "./TopBar/TopBar";
import Table from "./Table/Table";
import style from "./UserManagement.module.scss";
import api from "../../../../api";
const UserManagement = ({ msg, setMsg }) => {
   const [isNewUserOpen, setIsNewUserOpen] = useState(false);
   const [users, setUsers] = useState([]);

   useEffect(() => {
      (async function () {
         const res = await api.get("users/");
         const users = res.data.sort((a, b) =>
            a.first_name > b.first_name
               ? 1
               : a.first_name < b.first_name
               ? -1
               : 0
         );
         setUsers(users);
      })();
   }, []);
   return (
      <>
         <div className={style.topBar}>
            <TopBar setIsNewUserOpen={setIsNewUserOpen} />
         </div>
         <div className={style.table}>
            <Table
               users={users}
               setUsers={setUsers}
               msg={msg}
               setMsg={setMsg}
               isNewUserOpen={isNewUserOpen}
               setIsNewUserOpen={setIsNewUserOpen}
            />
         </div>
      </>
   );
};

export default UserManagement;
