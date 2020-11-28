import React, { useEffect } from "react";
import api from "../../../../../api";
const Photos = () => {
   useEffect(() => {
      (async function () {
         const images = await api.get("getAllImages");
         console.log(images.data);
      })();
   }, []);
   return <div>תמונות</div>;
};

export default Photos;
