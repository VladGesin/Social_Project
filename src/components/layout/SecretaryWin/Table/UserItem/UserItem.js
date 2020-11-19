import React, { useState } from "react";
import style from "./UserItem.module.scss";

const UserItem = ({
   user,
   setDeleteWindowIsOpen,
   setResetPasswordIsOpen,
   setCurrentUser,
   setEditUserIsOpen,
}) => {
   return (
      <div className={style.table}>
         <div className={style.item}>
            <div className={style.userData}>
               <div className={style.col}>
                  <p>שם פרטי</p>
                  <p>{user.first_name}</p>
               </div>
               <div className={style.col}>
                  <p>שם משפחה</p>
                  <p>{user.last_name}</p>
               </div>
               <div className={style.col}>
                  <p>תעודת זהות</p>
                  <p>{user.user_id}</p>
               </div>
               <div className={style.col}>
                  <p>כתובת אימייל</p>
                  <p>{user.email}</p>
               </div>
               <div className={style.col}>
                  <p>טלפון</p>
                  <p>{user.phone}</p>
               </div>
            </div>
            <div className={style.actions}>
               <i
                  className="fas fa-edit"
                  title={"עריכת פרטי משתמש"}
                  onClick={() => {
                     setEditUserIsOpen(true);
                     setCurrentUser({
                        user_id: user.user_id,
                     });
                  }}
               ></i>
               <i
                  title={"שינוי סיסמא"}
                  className="fas fa-lock"
                  onClick={() => {
                     setResetPasswordIsOpen(true);
                     setCurrentUser({
                        user_id: user.user_id,
                     });
                  }}
               ></i>
               <i
                  title={"מחיקת משתמש"}
                  className="far fa-trash-alt"
                  onClick={() => {
                     setDeleteWindowIsOpen(true);
                     setCurrentUser({
                        first_name: user.first_name,
                        last_name: user.last_name,
                        user_id: user.user_id,
                     });
                  }}
               ></i>
            </div>
         </div>
      </div>
   );
};

export default UserItem;
