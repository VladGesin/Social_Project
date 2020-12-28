import React, { useState, useEffect } from "react";
import TopBar from "./TopBar/TopBar";
import Table from "../Table/Table";
import style from "./UserManagement.module.scss";
import DeleteUserModal from "../modals/DeleteUserModal/DeleteUserModal";
import RestPasswordModal from "../modals/RestPasswordModal/RestPasswordModal";
import EditUserModal from "../modals/EditUserModal/EditUserModal";
import CreateNewUser from "../modals/CreateNewUser/CreateNewUser";
import SortRow from "../Table/SortRow/SortRow";
import api from "../../../../api";

const columns = [
   { title: "שם פרטי", variableName: "first_name" },
   { title: "שם משפחה", variableName: "last_name" },
   { title: "תעודת זהות", variableName: "user_id" },
   { title: "כתובת אימייל", variableName: "email" },
   { title: "טלפון", variableName: "phone" },
];
const UserManagement = ({ msg, setMsg }) => {
   const [isNewUserOpen, setIsNewUserOpen] = useState(false);
   const [users, setUsers] = useState([]);
   const [deleteWindowIsOpen, setDeleteWindowIsOpen] = useState(false);
   const [resetPasswordIsOpen, setResetPasswordIsOpen] = useState(false);
   const [editUserIsOpen, setEditUserIsOpen] = useState(false);
   const [currentUser, setCurrentUser] = useState({});

   const rowAction = {
      setCurrentData: setCurrentUser,
      edit: {
         key: "user_id",
         name: "עריכת פרטי משתמש",
         icon: "fas fa-edit",
         isOpen: editUserIsOpen,
         setIsOpen: setEditUserIsOpen,
         onClick: (data) => {
            setEditUserIsOpen(true);
            setCurrentUser(data);
         },
      },
      reset: {
         name: "שינוי סיסמא",
         icon: "fas fa-lock",
         isOpen: resetPasswordIsOpen,
         setIsOpen: setResetPasswordIsOpen,
         onClick: (data) => {
            setResetPasswordIsOpen(true);
            setCurrentUser(data);
         },
      },
      delete: {
         name: "מחיקת משתמש",
         icon: "far fa-trash-alt",
         isOpen: deleteWindowIsOpen,
         setIsOpen: setDeleteWindowIsOpen,
         onClick: (data) => {
            setDeleteWindowIsOpen(true);
            setCurrentUser(data);
         },
      },
   };
   const getAndStoreUsers = async () => {
      const res = await api.get("users/");
      const users = res.data.sort((a, b) =>
         a.first_name > b.first_name ? 1 : a.first_name < b.first_name ? -1 : 0
      );
      setUsers(users);
   };
   useEffect(() => {
      getAndStoreUsers();
   }, []);
   return (
      <>
         {" "}
         <DeleteUserModal
            close={() => setDeleteWindowIsOpen(false)}
            isOpen={deleteWindowIsOpen}
            name={`${currentUser.first_name} ${currentUser.last_name}`}
            user_id={currentUser.user_id}
            setUsers={setUsers}
            setMsg={setMsg}
         />
         <RestPasswordModal
            close={() => setResetPasswordIsOpen(false)}
            isOpen={resetPasswordIsOpen}
            id={currentUser.user_id}
            setMsg={setMsg}
         />
         <EditUserModal
            close={() => setEditUserIsOpen(false)}
            isOpen={editUserIsOpen}
            setUsers={setUsers}
            id={currentUser.user_id}
            users={users}
            setMsg={setMsg}
            getAndStoreUsers={getAndStoreUsers}
         />
         <CreateNewUser
            close={() => setIsNewUserOpen(false)}
            isOpen={isNewUserOpen}
            setUsers={setUsers}
            id={currentUser.user_id}
            users={users}
            setMsg={setMsg}
         />
         <div className={style.topBar}>
            <TopBar
               setIsNewUserOpen={setIsNewUserOpen}
               users={users}
               setUsers={setUsers}
            />
         </div>
         <div className={style.table}>
            <Table
               data={users}
               columns={columns}
               actions={rowAction}
               sortRow={
                  <SortRow
                     data={users}
                     setData={setUsers}
                     sortByOptions={columns}
                  />
               }
            />
         </div>
      </>
   );
};

export default UserManagement;
