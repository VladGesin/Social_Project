import React from "react";
import Modal from "react-bootstrap/Modal";
import api from "../../../../api";
import style from "./DeleteUserModal.module.scss";
const DeleteUserModal = ({
   isOpen,
   close,
   name,
   user_id,
   setUsers,
   setMsg,
}) => {
   const deleteHandle = async () => {
      const res = await api.delete(`/users/${user_id}`);

      if (res.data) {
         const users = await api.get("users/");
         const usersSorted = users.data.sort((a, b) =>
            a.first_name > b.first_name
               ? 1
               : a.first_name < b.first_name
               ? -1
               : 0
         );
         setUsers(usersSorted);
         setMsg({ msg: "המשתמש", name });
      }

      close();
   };

   return (
      <Modal
         show={isOpen}
         onHide={close}
         contentClassName={style.deleteWindow}
         centered
         size="lg"
      >
         <h3 className={style.title}>
            האם למחוק את המשתמש <span>{name}</span> ?
         </h3>

         <p>בלחיצה על כפתור "מחיקה" המשתמש ימחק לצמיתות ולא ינתן לשחזור</p>
         <div className={style.btnContainer}>
            <button className={style.deleteBtn} onClick={deleteHandle}>
               מחיקה
            </button>
            <button className={style.cancelBtn} onClick={close}>
               ביטול
            </button>
         </div>
      </Modal>
   );
};

export default DeleteUserModal;
