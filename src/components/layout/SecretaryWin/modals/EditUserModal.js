import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import api from "../../../../api";
import style from "./EditUserModal.module.scss";
const EditUserModal = ({ isOpen, close, id }) => {
   const [stage, setStage] = useState(1);
   const [committeesBoxItem, setCommitteesBoxItem] = useState([]);
   const [formDetails, setFormDetails] = useState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      id: "",
      birthDate: "",
      type: "",
   });

   useEffect(() => {
      (async function () {
         if (id !== undefined) {
            const res = await api.get(`user/${id}`);
            console.log(res);
            console.log(id);
         }
      })();
   }, [id]);
   return (
      <Modal
         show={isOpen}
         onHide={close}
         contentClassName={style.editUser}
         centered
         size="xl"
         backdrop={"static"}
      >
         <div className={style.header}>
            <h3 className={style.title}>עריכת פרטי משתמש</h3>
            <i className="fas fa-times" onClick={close}></i>
         </div>

         <div className={style.body}>
            <div className={style.rightSection}>
               {stage === 1 ? (
                  <>
                     <div>
                        <label>שם פרטי</label>
                        <input type="text" />
                     </div>
                     <div>
                        <label>שם משפחה</label>
                        <input type="text" />
                     </div>
                     <div>
                        <label>תעודת זהות</label>
                        <input type="text" />
                     </div>
                     <div>
                        <label>תאריך לידה</label>
                        <input type="text" />
                     </div>
                  </>
               ) : (
                  <>
                     <p> סוג משתמש</p>
                     <div className={style.userType}>
                        <div>
                           <div>
                              <label>מנהל מערכת</label>
                              <input
                                 className={style.userTypeCheckBox}
                                 type="checkbox"
                              />
                           </div>

                           <div>
                              <label>יושב ראש ועדה</label>
                              <input
                                 className={style.userTypeCheckBox}
                                 type="checkbox"
                              />
                           </div>
                        </div>
                        <div>
                           <div>
                              <label>הורה</label>
                              <input
                                 className={style.userTypeCheckBox}
                                 type="checkbox"
                              />
                           </div>
                           <div>
                              <label>חבר ועדה</label>
                              <input
                                 className={style.userTypeCheckBox}
                                 type="checkbox"
                              />
                           </div>
                        </div>
                     </div>
                  </>
               )}
            </div>
            <div className={style.leftSection}>
               {stage === 1 ? (
                  <>
                     {" "}
                     <div>
                        <label>כתובת מייל</label>
                        <input type="text" />
                     </div>
                     <div>
                        <label>טלפון נייד</label>
                        <input type="text" />
                     </div>
                     <div>
                        <label className={style.imageUpload}>
                           העלאת תמונת פרופיל
                           <i className="fa fa-cloud-upload"></i>
                           <input type="file" />
                        </label>
                        <p>תמונה זו תוצג בפרופיל המשתמש בלבד</p>
                     </div>
                  </>
               ) : (
                  <>
                     {" "}
                     <div>
                        <label>שיוך יושב ראש לועדה</label>
                        <select dir="rtl">
                           <option></option>
                           <option>ועדת קישוט בית ספר</option>
                           <option>ועדת הווי ובידור</option>
                           <option>ועדת פיתוח אתרים</option>
                        </select>
                     </div>
                     <div>
                        <label>שיוך חבר ועדה לועדה</label>
                        <select
                           dir="rtl"
                           onChange={(e) => {
                              const updatedItems = [...committeesBoxItem];
                              if (
                                 committeesBoxItem.indexOf(e.target.value) ==
                                    -1 &&
                                 e.target.value != ""
                              ) {
                                 updatedItems.push(e.target.value);
                                 setCommitteesBoxItem(updatedItems);
                              }
                           }}
                        >
                           {" "}
                           <option></option>
                           <option>ועדת קישוט בית ספר</option>
                           <option>ועדת הווי ובידור</option>
                           <option>ועדת פיתוח אתרים</option>
                           <option>ועדת 1</option>
                           <option>ועדת 2</option>
                           <option>ועדת 3</option>
                        </select>
                     </div>
                     <div className={style.committeesBox}>
                        {committeesBoxItem.map((i) => (
                           <div className={style.item}>
                              <i
                                 className="fas fa-times"
                                 onClick={(e) => {
                                    const index = committeesBoxItem.indexOf(
                                       e.target.nextSibling.innerHTML
                                    );
                                    const updatedItems = committeesBoxItem.filter(
                                       (_, idx) => idx != index
                                    );
                                    setCommitteesBoxItem(updatedItems);
                                 }}
                              ></i>
                              <span>{i}</span>
                           </div>
                        ))}
                     </div>
                  </>
               )}
            </div>
         </div>
         <div className={style.footer}>
            {stage === 1 ? (
               <>
                  <div className={style.btnContainer}>
                     <button onClick={() => setStage(2)}>לעמוד הבא</button>
                  </div>
               </>
            ) : (
               <>
                  <>
                     <div className={style.btnContainer}>
                        <button>שמירה</button>
                        <button
                           className={style.prevPage}
                           onClick={() => setStage(1)}
                        >
                           לעמוד הקודם
                        </button>
                     </div>
                  </>
               </>
            )}
         </div>
      </Modal>
   );
};

export default EditUserModal;
