import React from "react";
import style from "./Table.module.scss";

const Table = ({ children }) => {
   return <div className={style.table}>{children}</div>;
};

export default Table;
