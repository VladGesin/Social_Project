import React from "react";
import style from "./TableItem.module.scss";

const TableItem = ({ row, rowAction, titles }) => {
   return (
      <div className={style.table}>
         <div className={style.item}>
            <div className={style.userData}>
               {titles.map((t) => (
                  <div className={style.col}>
                     <p>{t.title}</p>
                     <p>{row[t.value]}</p>
                  </div>
               ))}
            </div>
            <div className={style.actions}>{rowAction}</div>
         </div>
      </div>
   );
};

export default TableItem;
