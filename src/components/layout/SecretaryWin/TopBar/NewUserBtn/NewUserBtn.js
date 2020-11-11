import React from "react";
import style from "./NewUserBtn.module.scss";
const NewUserBtn = () => {
   return (
      <button className={style.btn}>
         יצירת משתמש חדש
         <i className="fas fa-user-plus"></i>
      </button>
   );
};

export default NewUserBtn;
