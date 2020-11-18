import React, { useState, useEffect } from "react";
import SecretaryWinSideBar from "./SideBar/SideBar";
import TopBar from "./TopBar/TopBar";
import Table from "./Table/Table";
import style from "./SecretaryWin.module.scss";
import MsgBox from "./MsgBox/MsgBox";
import api from "../../../api";

const SecretaryWin = () => {
   const [users, setUsers] = useState([]);
   const [msg, setMsg] = useState("");
   const [isNewUserOpen, setIsNewUserOpen] = useState(false);

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
      <div className={style.rootSecretaryWindow}>
         {msg !== "" && (
            <MsgBox
               name={msg}
               clear={() => {
                  setMsg("");
               }}
            />
         )}

         <div className={style.sideBar}>
            <SecretaryWinSideBar />
         </div>
         <div className={style.main}>
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
         </div>
      </div>
   );
};
export default SecretaryWin;
