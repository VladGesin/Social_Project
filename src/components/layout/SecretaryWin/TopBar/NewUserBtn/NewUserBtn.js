import React from "react";
import style from "./NewUserBtn.module.scss";
const NewUserBtn = ({ onClick }) => {
   return (
      <button className={style.btn} onClick={onClick}>
         יצירת משתמש חדש
         <i className="fas fa-user-plus"></i>
      </button>
   );
};

export default NewUserBtn;
