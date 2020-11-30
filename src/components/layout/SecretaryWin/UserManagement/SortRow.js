import React, { useState } from "react";
import style from "./SortRow.module.scss";
import downArrowIcon from "../assets/down-arrow.svg";
import { handleOrder, handleSortBy } from "../UserManagement/tableFunction";

const SortRow = ({
   data,
   setData,
   sortBy,
   setSortBy,
   order,
   setOrder,
   handleNumOfRows,
   sortByOptions,
}) => {
   const [sortByIsOpen, setSortByIsOpen] = useState(false);
   const [orderIsOpen, setOrderIsOpen] = useState(false);
   const [numOfRowsIsOpen, setNumOfRowsIsOpen] = useState(false);
   const [isAscending, setIsAscending] = useState(true);

   return (
      <div className={style.sort}>
         <p>מיון לפי</p>
         <p onClick={() => setSortByIsOpen((cur) => !cur)}>
            {sortBy} <img src={downArrowIcon} alt="downArrowIcon" />
            {sortByIsOpen && (
               <div className={style.box}>
                  {sortByOptions.map((i) => (
                     <p
                        onClick={(e) =>
                           handleSortBy(e, setSortBy, data, setData, order)
                        }
                     >
                        {i}
                     </p>
                  ))}
               </div>
            )}
         </p>
         <p className={style.separator}> | </p>
         <p onClick={() => setOrderIsOpen((cur) => !cur)}>
            {order} <img src={downArrowIcon} alt="downArrowIcon" />{" "}
            {orderIsOpen && (
               <div className={style.box}>
                  {["סדר יורד", "סדר עולה"].map((i) => {
                     return (
                        <p
                           onClick={(e) =>
                              handleOrder(
                                 e,
                                 setOrder,
                                 data,
                                 setData,
                                 isAscending,
                                 setIsAscending
                              )
                           }
                        >
                           {i}
                        </p>
                     );
                  })}
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
   );
};

export default SortRow;
