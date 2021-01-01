import React, { useState, useEffect } from "react";
import SecretaryWinSideBar from "./SideBar/SideBar";
import style from "./SecretaryWin.module.scss";
import UserManagement from "./UserManagement/UserManagement";
import ContentManagement from "./ContentManagement/ContentManagement";
import MsgBox from "./MsgBox/MsgBox";

const SecretaryWin = () => {
   const [msg, setMsg] = useState({ msg: "" });
   const [mobileBoxIsOpen, setMobileBoxIsOpen] = useState(false);
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
               type={msg.type}
            />
         )}
         <div className={style.mobileMenu}>
            <div
               className={style.users}
               onClick={() => {
                  setActivePage({
                     userManagement: true,
                     contentManagement: false,
                     photos: false,
                     goodWord: false,
                     committees: false,
                     contactPageManagement: false,
                  });
                  setMobileBoxIsOpen(false);
               }}
            >
               ניהול משתמשים
            </div>
            <div className={style.content}>
               <span
                  onClick={() => {
                     setMobileBoxIsOpen((cur) => !cur);
                     setActivePage({
                        userManagement: false,
                        contentManagement: true,
                        photos: true,
                        goodWord: false,
                        committees: false,
                        contactPageManagement: false,
                     });
                  }}
               >
                  ניהול תוכן
               </span>
               {mobileBoxIsOpen && (
                  <div className={style.mobileBox}>
                     <span
                        onClick={() => {
                           setActivePage({
                              userManagement: false,
                              contentManagement: true,
                              photos: true,
                              goodWord: false,
                              committees: false,
                              contactPageManagement: false,
                           });
                           setMobileBoxIsOpen(false);
                        }}
                     >
                        תמונות
                     </span>
                     <span
                        onClick={() => {
                           setActivePage({
                              userManagement: false,
                              contentManagement: true,
                              photos: false,
                              goodWord: true,
                              committees: false,
                              contactPageManagement: false,
                           });
                           setMobileBoxIsOpen(false);
                        }}
                     >
                        מילה טובה
                     </span>
                     <span
                        onClick={() => {
                           setActivePage({
                              userManagement: false,
                              contentManagement: true,
                              photos: false,
                              goodWord: false,
                              committees: true,
                              contactPageManagement: false,
                           });
                           setMobileBoxIsOpen(false);
                        }}
                     >
                        פניות לועדה
                     </span>
                     <span
                        onClick={() => {
                           setActivePage({
                              userManagement: false,
                              contentManagement: true,
                              photos: false,
                              goodWord: false,
                              committees: false,
                              contactPageManagement: true,
                           });
                           setMobileBoxIsOpen(false);
                        }}
                     >
                        נהיול דף קשר
                     </span>
                  </div>
               )}
            </div>
         </div>
         <div className={`${style.sideBar} ${style.hideOnMobile}`}>
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
