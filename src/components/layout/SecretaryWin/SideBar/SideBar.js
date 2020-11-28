import React from "react";
import usersIcon from "../assets/multiple-users-silhouette.svg";
import contextSettingsIcon from "../assets/settings.svg";
import style from "./SideBar.module.scss";
const SecretaryWinSideBar = ({ activePage, setActivePage }) => {
   return (
      <div className={style.SideBar}>
         <h3>תפריט ניהול</h3>
         <p
            onClick={() =>
               setActivePage({
                  userManagement: true,
                  contentManagement: false,
                  photos: false,
                  goodWord: false,
                  committees: false,
                  contactPageManagement: false,
               })
            }
            className={`${style.line} ${
               activePage.userManagement && `${style.active}`
            }`}
         >
            <img src={usersIcon} />
            ניהול משתמשים
         </p>

         <p
            onClick={() =>
               setActivePage({
                  userManagement: false,
                  contentManagement: true,
                  photos: true,
                  goodWord: false,
                  committees: false,
                  contactPageManagement: false,
               })
            }
            className={`${style.line} ${
               activePage.contentManagement && `${style.active}`
            }`}
         >
            <img src={contextSettingsIcon} />
            ניהול תוכן
         </p>
         {activePage.contentManagement && (
            <div className={style.subMenu}>
               <p
                  className={`${activePage.photos && `${style.active}`}`}
                  onClick={() =>
                     setActivePage({
                        userManagement: false,
                        contentManagement: true,
                        photos: true,
                        goodWord: false,
                        committees: false,
                        contactPageManagement: false,
                     })
                  }
               >
                  תמונות
               </p>
               <p
                  className={`${activePage.goodWord && `${style.active}`}`}
                  onClick={() =>
                     setActivePage({
                        userManagement: false,
                        contentManagement: true,
                        photos: false,
                        goodWord: true,
                        committees: false,
                        contactPageManagement: false,
                     })
                  }
               >
                  מילה טובה
               </p>
               <p
                  className={`${activePage.committees && `${style.active}`}`}
                  onClick={() =>
                     setActivePage({
                        userManagement: false,
                        contentManagement: true,
                        photos: false,
                        goodWord: false,
                        committees: true,
                        contactPageManagement: false,
                     })
                  }
               >
                  פניות לוועדות
               </p>
               <p
                  className={`${
                     activePage.contactPageManagement && `${style.active}`
                  }`}
                  onClick={() =>
                     setActivePage({
                        userManagement: false,
                        contentManagement: true,
                        photos: false,
                        goodWord: false,
                        committees: false,
                        contactPageManagement: true,
                     })
                  }
               >
                  ניהול דף קשר
               </p>
            </div>
         )}
      </div>
   );
};

export default SecretaryWinSideBar;
