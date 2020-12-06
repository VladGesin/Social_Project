import React, { useState } from "react";
import style from "./Table.module.scss";
import TableItem from "./TableItem/TableItem";
import PaginationComp from "../../xpertesy/MyMeetings/PaginationComp";

const Table = ({ sortRow, data, actions = [], columns, children }) => {
   const [numOfRows, setNumOfRows] = useState(5);
   const [activePage, setActivePage] = useState(1);

   let indexOfLastItem = activePage * numOfRows;
   let indexOfFirstItem = indexOfLastItem - numOfRows;
   let currentPage = data.slice(indexOfFirstItem, indexOfLastItem);

   const PaginationOptions = {
      indexOfLastItem,
      indexOfFirstItem,
      currentPage,
   };
   const handleNumOfRows = (e) => {
      setNumOfRows(e.currentTarget.textContent);
   };
   const CurrentPageData = PaginationOptions.currentPage.map((row, i) => {
      if (i >= numOfRows) return;
      const rowActions = Object.keys(actions)
         .filter((i) => i !== "setCurrentData")
         .map((i) => {
            console.log(actions[i]);
            return (
               <i
                  key={actions[i].name}
                  className={actions[i].icon}
                  title={actions[i].name}
                  onClick={() => {
                     actions[i].onClick({ ...row });
                  }}
               ></i>
            );
         });

      return (
         <TableItem
            key={row.user_id}
            row={row}
            rowAction={rowActions}
            titles={columns}
         />
      );
   });
   const sortRowCustom = React.cloneElement(sortRow, {
      handleNumOfRows: handleNumOfRows,
   });

   return (
      <div className={style.table}>
         {children}
         {sortRowCustom}
         {CurrentPageData}
         <PaginationComp
            dataLength={data.length}
            rowsInPage={Number(numOfRows)}
            activePage={activePage}
            setActivePage={setActivePage}
         />
      </div>
   );
};

export default Table;
