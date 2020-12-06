import React, { useState, useEffect } from "react";
import api from "../../../../../api";
import axios from "axios";
import style from "./Photos.module.scss";
import { Spin, Space } from "antd";

const Photos = ({ setMsg }) => {
   const [imageList, setImageList] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [imageToUpload, setImageToUpload] = useState([]);

   useEffect(() => {
      (async function () {
         const images = await api.get("getAllImages");

         setImageList(
            images.data.sort((a, b) => {
               if (a.path < b.path) {
                  return -1;
               }
               if (a.last_nom > b.last_nom) {
                  return 1;
               }
               return 0;
            })
         );
         setIsLoading(false);
      })();
   }, [imageToUpload]);

   const onCheck = async (e, i) => {
      const homePageImages = imageList.filter((i) => i.status);
      if (homePageImages.length > 9 && e.target.checked === true) {
         setMsg({ msg: "ניתן לבחור עד 10 תמונות" });
         return;
      }
      const update = { ...i };
      update.status = !update.status;
      await api.patch("updateImageStatus", { images: [update] });
      setImageToUpload([...imageList]);
   };

   const onFileUpload = async (e) => {
      const files = e.target.files;
      const images = new FormData();
      for (let i = 0; i < files.length; i++) {
         images.append("images", files[i]);
         images.append("status", false);
      }
      await api.post("insertImage", images);
      setImageToUpload([...imageList]);
   };

   const onDeleteImage = async (i) => {
      console.log(i);
      const res = await api.delete("deleteImage", { path: i });
      setImageToUpload([...imageList]);
   };
   return (
      <div className={style.container}>
         <h2>ניהול תמונות</h2>
         {isLoading ? (
            <div className={style.spinner}>
               <Spin size="large" />
            </div>
         ) : (
            <div className={style.gallery}>
               {imageList.map(
                  (i, idx) =>
                     idx < 15 && (
                        <div className={style.imageContainer}>
                           <i
                              class="fas fa-times-circle"
                              onClick={() => onDeleteImage(i.path)}
                           ></i>

                           <img
                              className={style.image}
                              src={`https://www.hitprojectscenter.com/social-API/${i.path}`}
                           />
                           <div className={style.footer}>
                              <label>הוסף למסך הבית</label>
                              <input
                                 type="checkbox"
                                 name={i.id}
                                 checked={i.status}
                                 onChange={(e) => onCheck(e, i)}
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
         )}
      </div>
   );
};

export default Photos;
