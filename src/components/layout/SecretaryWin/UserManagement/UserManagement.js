import React, { useState, useEffect } from "react";
import TopBar from "./TopBar/TopBar";
import Table from "../Table/Table";
import style from "./UserManagement.module.scss";
import DeleteUserModal from "../modals/DeleteUserModal";
import RestPasswordModal from "../modals/RestPasswordModal";
import EditUserModal from "../modals/EditUserModal";
import CreateNewUser from "../modals/CreateNewUser";
import SortRow from "./SortRow";
import api from "../../../../api";
import PaginationComp from "../../xpertesy/MyMeetings/PaginationComp";

import TableItem from "../Table/TableItem/TableItem";
const UserManagement = ({ msg, setMsg }) => {
   const [isNewUserOpen, setIsNewUserOpen] = useState(false);
   const [users, setUsers] = useState([]);
   const [deleteWindowIsOpen, setDeleteWindowIsOpen] = useState(false);
   const [resetPasswordIsOpen, setResetPasswordIsOpen] = useState(false);
   const [editUserIsOpen, setEditUserIsOpen] = useState(false);
   const [currentUser, setCurrentUser] = useState({});
   const [sortBy, setSortBy] = useState("שם פרטי");
   const [order, setOrder] = useState("סדר עולה");
   const [numOfRows, setNumOfRows] = useState(5);
   const [activePage, setActivePage] = useState(1);

   const handleNumOfRows = (e) => {
      setNumOfRows(e.currentTarget.textContent);
   };

   useEffect(() => {
      (async function () {
         const res = await api.get("users/");
         const users = res.data.sort((a, b) =>
            a.first_name > b.first_name
               ? 1
               : a.first_name < b.first_name
               ? -1
               : 0
         );
         setUsers(users);
      })();
   }, []);
   let indexOfLastItem = activePage * numOfRows;
   let indexOfFirstItem = indexOfLastItem - numOfRows;
   let currentPage = users.slice(indexOfFirstItem, indexOfLastItem);

   const PaginationOptions = {
      indexOfLastItem,
      indexOfFirstItem,
      currentPage,
   };

   const CurrentPageData = PaginationOptions.currentPage.map((row, i) => {
      if (i >= numOfRows) return;

      const rowActions = [
         <i
            className="fas fa-edit"
            title={"עריכת פרטי משתמש"}
            onClick={() => {
               setEditUserIsOpen(true);
               setCurrentUser({
                  user_id: row.user_id,
               });
            }}
         ></i>,
         <i
            title={"שינוי סיסמא"}
            className="fas fa-lock"
            onClick={() => {
               setResetPasswordIsOpen(true);
               setCurrentUser({
                  user_id: row.user_id,
               });
            }}
         ></i>,
         <i
            title={"מחיקת משתמש"}
            className="far fa-trash-alt"
            onClick={() => {
               setDeleteWindowIsOpen(true);
               setCurrentUser({
                  first_name: row.first_name,
                  last_name: row.last_name,
                  user_id: row.user_id,
               });
            }}
         ></i>,
      ];

      return (
         <TableItem
            key={row.user_id}
            row={row}
            rowAction={rowActions}
            titles={[
               { title: "שם פרטי", value: "first_name" },
               { title: "שם משפחה", value: "last_name" },
               { title: "תעודת זהות", value: "user_id" },
               { title: "כתובת אימייל", value: "email" },
               { title: "טלפון", value: "phone" },
            ]}
         />
      );
   });
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
         />
         <EditUserModal
            close={() => setEditUserIsOpen(false)}
            isOpen={editUserIsOpen}
            setUsers={setUsers}
            id={currentUser.user_id}
            users={users}
            setMsg={setMsg}
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
            <TopBar setIsNewUserOpen={setIsNewUserOpen} />
         </div>
         <div className={style.table}>
            <Table>
               <SortRow
                  data={users}
                  setData={setUsers}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  order={order}
                  setOrder={setOrder}
                  handleNumOfRows={handleNumOfRows}
                  sortByOptions={[
                     "שם פרטי",
                     "שם משפחה",
                     "תעודת זהות",
                     "כתובת אימייל",
                  ]}
               />
               {CurrentPageData}
               <div className={style.PaginationContainer}>
                  <PaginationComp
                     dataLength={users.length}
                     rowsInPage={Number(numOfRows)}
                     activePage={activePage}
                     setActivePage={setActivePage}
                  />
               </div>
            </Table>
         </div>
      </>
   );
};

export default UserManagement;
