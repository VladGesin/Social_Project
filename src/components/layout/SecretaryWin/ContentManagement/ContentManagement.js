import React from "react";
import Photos from "./Photos/Photos";
import Committees from "./Committees/Committees";
import GoodWord from "./GoodWord/GoodWord";
import Contact from "./Contact/Contact";
import style from "../SecretaryWin.module.scss";
const ContentManagement = ({ activePage, setMsg }) => {
   return (
      <div className={style.table}>
         {activePage.photos && <Photos setMsg={setMsg} />}
         {activePage.committees && <Committees setMsg={setMsg} />}
         {activePage.goodWord && <GoodWord setMsg={setMsg} />}

         {activePage.contactPageManagement && <Contact setMsg={setMsg} />}
      </div>
   );
};

export default ContentManagement;
