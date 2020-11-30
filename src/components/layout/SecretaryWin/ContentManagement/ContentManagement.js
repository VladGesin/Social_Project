import React from "react";
import Photos from "./Photos/Photos";
import Committees from "./Committees/Committees";
const ContentManagement = ({ activePage, setMsg }) => {
   return (
      <div>
         {activePage.photos && <Photos setMsg={setMsg} />}
         {activePage.committees && <Committees setMsg={setMsg} />}
      </div>
   );
};

export default ContentManagement;
