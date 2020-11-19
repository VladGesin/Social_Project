import React from "react";
import usersIcon from "../assets/multiple-users-silhouette.svg";
import contextSettingsIcon from "../assets/settings.svg";
import style from "./SideBar.module.scss";
const SecretaryWinSideBar = () => {
   return (
      <div className={style.SideBar}>
         <p className={style.line}>
            <img src={usersIcon} />
            ניהול משתמשים
         </p>

         <p className={style.line}>
            <img src={contextSettingsIcon} />
            ניהול תוכן
         </p>
      </div>
   );
};

export default SecretaryWinSideBar;
