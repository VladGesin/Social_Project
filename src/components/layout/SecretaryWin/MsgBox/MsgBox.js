import React from "react";
import style from "./MsgBox.module.scss";
const MsgBox = ({ name, clear }) => {
   return (
      <div className={style.container}>
         <p>המשתמש {name} נמחק בהצלחה</p>
         <i class="fas fa-times-circle" onClick={clear}></i>
      </div>
   );
};

export default MsgBox;
