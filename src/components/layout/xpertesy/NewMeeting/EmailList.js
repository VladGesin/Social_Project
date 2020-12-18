import React from "react";
import style from "./EmailList.module.scss";

const EmailList = ({ emails, deleteParticipant }) => {
   const onDelete = (e) => {
      deleteParticipant(e.currentTarget.id);
   };

   return (
      <div className={style.emailListContainer}>
         {emails.map((email) => (
            <span className={style.emailItem} key={email}>
               {email}
               <span className={style.deleteBtn} onClick={onDelete} id={email}>
                  X
               </span>
            </span>
         ))}
      </div>
   );
};

export default EmailList;
