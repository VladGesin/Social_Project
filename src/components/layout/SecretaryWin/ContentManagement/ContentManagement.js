import React from "react";
import Photos from "./Photos/Photos";
import Committees from "./Committees/Committees";
import style from "../SecretaryWin.module.scss";
const ContentManagement = ({ activePage, setMsg }) => {
   return (
      <div className={style.table}>
         {activePage.photos && <Photos setMsg={setMsg} />}
         {activePage.committees && <Committees setMsg={setMsg} />}
      </div>
   );
};

export default ContentManagement;
