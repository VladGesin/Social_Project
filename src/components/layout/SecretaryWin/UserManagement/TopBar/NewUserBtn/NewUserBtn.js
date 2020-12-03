import React from "react";
import style from "./NewUserBtn.module.scss";
const NewUserBtn = ({ onClick }) => {
   return (
      <button className={style.btn} onClick={onClick} title="יצירת משתמש חדש">
         <i className="fas fa-plus"></i>
      </button>
   );
};

export default NewUserBtn;
