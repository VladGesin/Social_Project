import React, { useState, useEffect } from "react";
import SecretaryWinSideBar from "./SideBar/SideBar";
import style from "./SecretaryWin.module.scss";
import UserManagement from "./UserManagement/UserManagement";
import ContentManagement from "./ContentManagement/ContentManagement";
import MsgBox from "./MsgBox/MsgBox";

const SecretaryWin = () => {
   const [msg, setMsg] = useState({ msg: "" });
   const [activePage, setActivePage] = useState({
      userManagement: true,
      contentManagement: false,
      photos: false,
      goodWord: false,
      committees: false,
      contactPageManagement: false,
   });
   return (
      <div className={style.rootSecretaryWindow}>
         {msg.msg !== "" && (
            <MsgBox
               name={msg.name}
               msg={msg.msg}
               clear={() => {
                  setMsg({ msg: "" });
               }}
            />
         )}

         <div className={style.sideBar}>
            <SecretaryWinSideBar
               activePage={activePage}
               setActivePage={setActivePage}
            />
         </div>
         <div className={style.main}>
            {activePage.userManagement ? (
               <UserManagement msg={msg} setMsg={setMsg} />
            ) : (
               <ContentManagement
                  msg={msg}
                  setMsg={setMsg}
                  activePage={activePage}
               />
            )}
         </div>
      </div>
   );
};
export default SecretaryWin;
