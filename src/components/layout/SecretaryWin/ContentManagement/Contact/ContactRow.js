import React, { useState } from "react";
import style from "./Contact.module.scss";
const ContactRow = (props) => {
   const { firstName, lastName, role, email, phone } = props.rowData;
   const [isClicked, setIsClicked] = useState(false);
   return (
      <div className={style.row}>
         <div className={style.col}>
            {firstName} {lastName}
         </div>
         {/* <div className={style.col}>{role}</div>
         <div className={style.col}>{email}</div> */}
         <div className={style.col}>{phone}</div>
         {/* <div className={style.col}>
            <div
               className={style.moreContainer}
               onClick={() => setIsClicked(!isClicked)}
            >
               <i
                  className={`fas fa-ellipsis-h ${
                     isClicked ? style.moveRight : style.moveLeft
                  }`}
               ></i>
               {isClicked && (
                  <div className={style.hoverBox}>
                     <i class="far fa-trash-alt"></i>
                     <i class="fas fa-pen"></i>
                  </div>
               )}
            </div>
         </div> */}
      </div>
   );
};

export default ContactRow;
