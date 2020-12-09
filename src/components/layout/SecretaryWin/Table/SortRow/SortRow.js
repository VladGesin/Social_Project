import React, { useState, useEffect } from "react";
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
   const [flag, setFlag] = useState(false);

   return (
      <div className={style.sort}>
         <span>מיון לפי</span>

         <span
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
                        <span
                           key={i.title}
                           onClick={(e) => {
                              setSortByIsOpen(false);
                              setOrderIsOpen(false);
                              setNumOfRowsIsOpen(false);
                              setSortBy(e.currentTarget.textContent);
                              const sortedData = handleSortBy(
                                 e.currentTarget.textContent,
                                 data,
                                 { columns: i },
                                 order
                              );
                              setData([...sortedData]);
                           }}
                        >
                           {i.title}
                        </span>
                     );
                  })}
               </div>
            )}
         </span>
         <p className={style.separator}> | </p>
         <span
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
                        <span
                           key={i}
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
                        </span>
                     );
                  })}
               </div>
            )}
         </span>
         <p className={style.separator}> | </p>
         <span
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
                  <span
                     onClick={(e) => {
                        setSortByIsOpen(false);
                        setOrderIsOpen(false);
                        setNumOfRowsIsOpen(false);
                        handleNumOfRows(e);
                     }}
                  >
                     5
                  </span>
                  <span
                     onClick={(e) => {
                        setSortByIsOpen(false);
                        setOrderIsOpen(false);
                        setNumOfRowsIsOpen(false);
                        handleNumOfRows(e);
                     }}
                  >
                     8
                  </span>
                  <span
                     onClick={(e) => {
                        setSortByIsOpen(false);
                        setOrderIsOpen(false);
                        setNumOfRowsIsOpen(false);
                        handleNumOfRows(e);
                     }}
                  >
                     11
                  </span>
                  <span
                     onClick={(e) => {
                        setSortByIsOpen(false);
                        setOrderIsOpen(false);
                        setNumOfRowsIsOpen(false);
                        handleNumOfRows(e);
                     }}
                  >
                     14
                  </span>
               </div>
            )}
         </span>
      </div>
   );
};

export default SortRow;
