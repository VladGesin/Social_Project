import React from "react";
import style from "./TableItem.module.scss";

const TableItem = ({ row, rowAction, titles }) => {
   return (
      <div className={style.table}>
         <div className={style.item}>
            <div className={style.userData}>
               {titles.map((t) => (
                  <div className={style.col} key={t.title}>
                     <p>{t.title}</p>
                     <p
                        className={
                           t?.color?.spam == "red" &&
                           row[t.variableName] == "ספאם"
                              ? style.spam
                              : ""
                        }
                     >
                        {row[t.variableName]}
                     </p>
                  </div>
               ))}
            </div>
            <div className={style.actions}>{rowAction}</div>
         </div>
      </div>
   );
};

export default TableItem;
