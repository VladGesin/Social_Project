export const handleSortBy = (e, setSortBy, users, setUsers, order) => {
   setSortBy(e.currentTarget.textContent);
   if (e.currentTarget.textContent === "שם פרטי") {
      const sortedUsers = users.sort((a, b) =>
         a.first_name > b.first_name ? 1 : a.first_name < b.first_name ? -1 : 0
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
export const handleOrder = (
   e,
   setOrder,
   users,
   setUsers,
   isAscending,
   setIsAscending
) => {
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
