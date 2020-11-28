import React from "react";
import Photos from "./Photos/Photos";
const ContentManagement = ({ activePage }) => {
   return <div>{activePage.photos && <Photos />}</div>;
};

export default ContentManagement;
