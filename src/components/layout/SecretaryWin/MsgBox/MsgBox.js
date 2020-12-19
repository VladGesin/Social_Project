import React, { useEffect } from "react";
import style from "./MsgBox.module.scss";
const MsgBox = ({ msg, name, clear, type }) => {
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
      <div className={`${style.container} `}>
         <p>{`${msg} ${name != undefined ? `${name} נמחק בהצלחה` : ""}`}</p>
         <i
            className={`fas fa-times-circle ${
               type == "success" ? style.greenColor : style.redColor
            }`}
            onClick={clear}
         ></i>
         <div
            className={`${style.typeLine} ${
               type == "success" ? style.greenBackground : style.redBackground
            }`}
         ></div>
      </div>
   );
};

export default MsgBox;
