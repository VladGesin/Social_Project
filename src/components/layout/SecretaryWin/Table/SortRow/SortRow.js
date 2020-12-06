import React, { useState } from "react";
import style from "./SortRow.module.scss";
import downArrowIcon from "../../assets/down-arrow.svg";
import { handleSortBy, handleOrder } from "./tableFunction";
const SortRow = ({ data, setData, handleNumOfRows, sortByOptions }) => {
   const [sortByIsOpen, setSortByIsOpen] = useState(false);
   const [orderIsOpen, setOrderIsOpen] = useState(false);
   const [numOfRowsIsOpen, setNumOfRowsIsOpen] = useState(false);
   const [isAscending, setIsAscending] = useState(true);
   const [sortBy, setSortBy] = useState(() => sortByOptions[0].title);
   const [order, setOrder] = useState("סדר עולה");

   return (
      <div className={style.sort}>
         <p>מיון לפי</p>

         <p
            onMouseEnter={() => {
               setSortByIsOpen((cur) => !cur);
               setOrderIsOpen(false);
               setNumOfRowsIsOpen(false);
            }}
            onMouseLeave={() => {
               setSortByIsOpen(false);
               setOrderIsOpen(false);
               setNumOfRowsIsOpen(false);
            }}
         >
            {sortBy} <img src={downArrowIcon} alt="downArrowIcon" />
            {sortByIsOpen && (
               <div className={style.box}>
                  {sortByOptions.map((i) => {
                     return (
                        <p
                           onClick={(e) => {
                              setSortByIsOpen(false);
                              setOrderIsOpen(false);
                              setNumOfRowsIsOpen(false);
                              setSortBy(e.currentTarget.textContent);
                              const sortedData = handleSortBy(
                                 e,
                                 data,
                                 { columns: i },
                                 order
                              );
                              setData([...sortedData]);
                           }}
                        >
                           {i.title}
                        </p>
                     );
                  })}
               </div>
            )}
         </p>
         <p className={style.separator}> | </p>
         <p
            onMouseEnter={() => {
               setSortByIsOpen(false);
               setOrderIsOpen((cur) => !cur);
               setNumOfRowsIsOpen(false);
            }}
            onMouseLeave={() => {
               setSortByIsOpen(false);
               setOrderIsOpen(false);
               setNumOfRowsIsOpen(false);
            }}
         >
            {order} <img src={downArrowIcon} alt="downArrowIcon" />{" "}
            {orderIsOpen && (
               <div className={style.box}>
                  {["סדר עולה", "סדר יורד"].map((i) => {
                     return (
                        <p
                           onClick={(e) => {
                              setSortByIsOpen(false);
                              setOrderIsOpen(false);
                              setNumOfRowsIsOpen(false);
                              handleOrder(
                                 e,
                                 setOrder,
                                 data,
                                 setData,
                                 isAscending,
                                 setIsAscending
                              );
                           }}
                        >
                           {i}
                        </p>
                     );
                  })}
               </div>
            )}
         </p>
         <p className={style.separator}> | </p>
         <p
            onMouseEnter={() => {
               setSortByIsOpen(false);
               setOrderIsOpen(false);
               setNumOfRowsIsOpen((cur) => !cur);
            }}
            onMouseLeave={() => {
               setSortByIsOpen(false);
               setOrderIsOpen(false);
               setNumOfRowsIsOpen(false);
            }}
         >
            מספר שורות בעמוד <img src={downArrowIcon} alt="downArrowIcon" />
            {numOfRowsIsOpen && (
               <div className={style.box}>
                  <p
                     onClick={(e) => {
                        setSortByIsOpen(false);
                        setOrderIsOpen(false);
                        setNumOfRowsIsOpen(false);
                        handleNumOfRows(e);
                     }}
                  >
                     5
                  </p>
                  <p
                     onClick={(e) => {
                        setSortByIsOpen(false);
                        setOrderIsOpen(false);
                        setNumOfRowsIsOpen(false);
                        handleNumOfRows(e);
                     }}
                  >
                     8
                  </p>
                  <p
                     onClick={(e) => {
                        setSortByIsOpen(false);
                        setOrderIsOpen(false);
                        setNumOfRowsIsOpen(false);
                        handleNumOfRows(e);
                     }}
                  >
                     11
                  </p>
                  <p
                     onClick={(e) => {
                        setSortByIsOpen(false);
                        setOrderIsOpen(false);
                        setNumOfRowsIsOpen(false);
                        handleNumOfRows(e);
                     }}
                  >
                     14
                  </p>
               </div>
            )}
         </p>
      </div>
   );
};

export default SortRow;
