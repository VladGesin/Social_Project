import React, { useState, useEffect } from "react";
import downArrowIcon from "../../assets/down-arrow.svg";
import UserItem from "./UserItem/UserItem";
import PaginationComp from "../../../xpertesy/MyMeetings/PaginationComp";
import style from "./Table.module.scss";
import DeleteUserModal from "../../modals/DeleteUserModal";
import RestPasswordModal from "../../modals/RestPasswordModal";
import EditUserModal from "../../modals/EditUserModal";
import CreateNewUser from "../../modals/CreateNewUser";

const Table = ({
   users,
   setUsers,
   msg,
   setMsg,
   isNewUserOpen,
   setIsNewUserOpen,
}) => {
   const [sortByIsOpen, setSortByIsOpen] = useState(false);
   const [sortBy, setSortBy] = useState("שם פרטי");
   const [orderIsOpen, setOrderIsOpen] = useState(false);
   const [order, setOrder] = useState("סדר עולה");
   const [isAscending, setIsAscending] = useState(true);
   const [numOfRowsIsOpen, setNumOfRowsIsOpen] = useState(false);
   const [numOfRows, setNumOfRows] = useState(5);
   const [activePage, setActivePage] = useState(1);
   const [deleteWindowIsOpen, setDeleteWindowIsOpen] = useState(false);
   const [resetPasswordIsOpen, setResetPasswordIsOpen] = useState(false);
   const [editUserIsOpen, setEditUserIsOpen] = useState(false);
   const [currentUser, setCurrentUser] = useState({});

   const handleSortBy = (e) => {
      setSortBy(e.currentTarget.textContent);
      if (e.currentTarget.textContent === "שם פרטי") {
         const sortedUsers = users.sort((a, b) =>
            a.first_name > b.first_name
               ? 1
               : a.first_name < b.first_name
               ? -1
               : 0
         );

         order === "סדר יורד"
            ? setUsers(sortedUsers.reverse())
            : setUsers(sortedUsers);
      }
      if (e.currentTarget.textContent === "שם משפחה") {
         const sortedUsers = users.sort((a, b) =>
            a.last_name > b.last_name ? 1 : a.last_name < b.last_name ? -1 : 0
         );
         order === "סדר יורד"
            ? setUsers(sortedUsers.reverse())
            : setUsers(sortedUsers);
      }
      if (e.currentTarget.textContent === "כתובת אימייל") {
         const sortedUsers = users.sort((a, b) =>
            a.email > b.email ? 1 : a.email < b.email ? -1 : 0
         );
         order === "סדר יורד"
            ? setUsers(sortedUsers.reverse())
            : setUsers(sortedUsers);
      }
      if (e.currentTarget.textContent === "תעודת זהות") {
         const sortedUsers = users.sort((a, b) =>
            a.user_id > b.user_id ? 1 : a.user_id < b.user_id ? -1 : 0
         );
         order === "סדר יורד"
            ? setUsers(sortedUsers.reverse())
            : setUsers(sortedUsers);
      }
   };
   const handleOrder = (e) => {
      setOrder(e.currentTarget.textContent);
      if (e.currentTarget.textContent === "סדר עולה") {
         if (!isAscending) {
            const sortedUsers = users.reverse();
            setUsers(sortedUsers);
         }
         setIsAscending(true);
      }
      if (e.currentTarget.textContent === "סדר יורד") {
         if (isAscending) {
            const sortedUsers = users.reverse();
            setUsers(sortedUsers);
         }
         setIsAscending(false);
      }
   };
   const handleNumOfRows = (e) => {
      setNumOfRows(e.currentTarget.textContent);
   };

   const indexOfLastItem = activePage * numOfRows;
   const indexOfFirstItem = indexOfLastItem - numOfRows;
   let currentPage = users.slice(indexOfFirstItem, indexOfLastItem);

   return (
      <div className={style.table}>
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
         />
         <CreateNewUser
            close={() => setIsNewUserOpen(false)}
            isOpen={isNewUserOpen}
            setUsers={setUsers}
            id={currentUser.user_id}
            users={users}
         />

         <div className={style.sort}>
            <p>מיון לפי</p>
            <p onClick={() => setSortByIsOpen((cur) => !cur)}>
               {sortBy} <img src={downArrowIcon} alt="downArrowIcon" />
               {sortByIsOpen && (
                  <div className={style.box}>
                     <p onClick={handleSortBy}>שם פרטי</p>
                     <p onClick={handleSortBy}>שם משפחה</p>
                     <p onClick={handleSortBy}>תעודת זהות</p>
                     <p onClick={handleSortBy}>כתובת אימייל</p>
                  </div>
               )}
            </p>
            <p className={style.separator}> | </p>
            <p onClick={() => setOrderIsOpen((cur) => !cur)}>
               {order} <img src={downArrowIcon} alt="downArrowIcon" />{" "}
               {orderIsOpen && (
                  <div className={style.box}>
                     <p onClick={handleOrder}>סדר עולה</p>
                     <p onClick={handleOrder}>סדר יורד</p>
                  </div>
               )}
            </p>
            <p className={style.separator}> | </p>
            <p onClick={() => setNumOfRowsIsOpen((cur) => !cur)}>
               מספר שורות בעמוד <img src={downArrowIcon} alt="downArrowIcon" />
               {numOfRowsIsOpen && (
                  <div className={style.box}>
                     <p onClick={handleNumOfRows}>5</p>
                     <p onClick={handleNumOfRows}>8</p>
                     <p onClick={handleNumOfRows}>11</p>
                     <p onClick={handleNumOfRows}>14</p>
                  </div>
               )}
            </p>
         </div>
         {currentPage.map((user, i) => {
            if (i >= numOfRows) return;
            return (
               <UserItem
                  key={user.user_id}
                  user={user}
                  setDeleteWindowIsOpen={setDeleteWindowIsOpen}
                  setResetPasswordIsOpen={setResetPasswordIsOpen}
                  setEditUserIsOpen={setEditUserIsOpen}
                  setCurrentUser={setCurrentUser}
               />
            );
         })}
         <div className={style.PaginationContainer}>
            <PaginationComp
               dataLength={users.length}
               rowsInPage={Number(numOfRows)}
               activePage={activePage}
               setActivePage={setActivePage}
            />
         </div>
      </div>
   );
};

export default Table;
