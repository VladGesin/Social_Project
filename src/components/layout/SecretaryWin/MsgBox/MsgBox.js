import React, { useEffect } from "react";
import style from "./MsgBox.module.scss";
const MsgBox = ({ msg, name, clear }) => {
   useEffect(() => {
      window.scrollTo({
         top: 0,
         left: 0,
         behavior: "smooth",
      });
      setTimeout(() => {
         clear();
      }, 5000);
   }, []);
   return (
      <div className={style.container}>
         <p>{`${msg}${name != undefined ? `${name} נמחק בהצלחה` : ""}`}</p>
         <i className="fas fa-times-circle" onClick={clear}></i>
      </div>
   );
};

export default MsgBox;
