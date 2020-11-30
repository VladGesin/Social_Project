import React, { useState, useEffect } from "react";
import api from "../../../../../api";
import axios from "axios";
import style from "./Photos.module.scss";

const Photos = ({ setMsg }) => {
   const [imageList, setImageList] = useState([]);

   useEffect(() => {
      (async function () {
         const images = await axios.get(
            "https://api.unsplash.com/photos/?client_id=JiKkvpW24qq5jVBi4FFdHRQo2vhVpZeSt25q1ITs7CY&per_page=20"
         );
         console.log(images.data);
         images.data.forEach((i, j) => {
            if (j < 10) i.checked = true;
            else i.checked = false;
         });
         setImageList(images.data);
      })();
   }, []);

   const onCheck = (e) => {
      const selectedImages = imageList.filter((i) => i.checked);

      if (e.currentTarget.checked) {
         if (selectedImages.length > 9) {
            setMsg({ msg: "ניתן לבחור עד 10 תמונות" });

            return;
         } else {
            const updatedImagesList = imageList.map((i) => {
               if (i.id == e.currentTarget.name) i.checked = true;
               return i;
            });
            setImageList(updatedImagesList);
         }
      } else {
         const updatedImagesList = imageList.map((i) => {
            if (i.id == e.currentTarget.name) i.checked = false;
            return i;
         });
         setImageList(updatedImagesList);
      }
   };

   const onFileUpload = (e) => {
      console.log(e.target.files);
   };
   return (
      <div>
         <h2>ניהול תמונות</h2>
         <div className={style.gallery}>
            {imageList.map(
               (i, idx) =>
                  idx < 15 && (
                     <div className={style.imageContainer}>
                        <img className={style.image} src={i.urls.thumb} />
                        <div className={style.footer}>
                           <label>הוסף למסך הבית</label>
                           <input
                              type="checkbox"
                              name={i.id}
                              checked={i.checked}
                              onChange={onCheck}
                           />
                        </div>
                     </div>
                  )
            )}
            <div className={style.uploadImage}>
               <label htmlFor="file-upload">
                  <i class="fas fa-plus"></i>
               </label>
               <input
                  id="file-upload"
                  type="file"
                  multiple
                  onChange={onFileUpload}
               />
            </div>
         </div>
      </div>
   );
};

export default Photos;
