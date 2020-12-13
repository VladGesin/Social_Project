export const handleSortBy = (title, data, { columns }, order) => {
   let sortedUsers = [...data];
   if (title === columns.title) {
      sortedUsers = data.sort((a, b) => {
         return a[columns.variableName] > b[columns.variableName]
            ? 1
            : a[columns.variableName] < b[columns.variableName]
            ? -1
            : 0;
      });
      if (order === "סדר יורד") sortedUsers = sortedUsers.reverse();
   }

   return sortedUsers;
};
export const handleOrder = (
   e,
   setOrder,
   data,
   setUsers,
   isAscending,
   setIsAscending
) => {
   setOrder(e.currentTarget.textContent);
   if (e.currentTarget.textContent === "סדר עולה") {
      if (!isAscending) {
         const sortedUsers = data.reverse();
         setUsers([...sortedUsers]);
      }
      setIsAscending(true);
   }
   if (e.currentTarget.textContent === "סדר יורד") {
      if (isAscending) {
         const sortedUsers = data.reverse();
         setUsers([...sortedUsers]);
      }
      setIsAscending(false);
   }
};
