import React, { useState, useEffect, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import api from "../../../../api";
import style from "./EditUserModal.module.scss";
const EditUserModal = ({ isOpen, close, id, setUsers, users }) => {
   const [stage, setStage] = useState(1);
   const [emailIsValid, setEmailIsValid] = useState(true);
   const [phoneIsValid, setPhoneIsValid] = useState(true);
   const [committeesBoxItem, setCommitteesBoxItem] = useState([]);
   const [formDetails, setFormDetails] = useState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      id: "",
      birthday: "",
      userType: "a",
   });
   const [userType, setUserType] = useState({
      parent: false,
      committeeMember: false,
      committeeHead: false,
      admin: false,
   });
   const emailRef = useRef(null);
   const phoneRef = useRef(null);
   useEffect(() => {
      (async function () {
         if (id !== undefined) {
            const res = await api.get(`user/${id}`);
            console.log(res.data);
            const {
               firstName,
               lastName,
               userType,
               email,
               birthday,
               phoneNumber,
            } = res.data[0];

            setFormDetails((cur) => ({
               ...cur,
               firstName,
               lastName,
               userType,
               email,
               birthday,
               id,
               phone: phoneNumber,
            }));
            setStage(1);
         }
      })();
   }, [id]);
   useEffect(() => {
      if (!emailIsValid) emailRef.current.focus();
   }, [emailIsValid]);
   const onChange = (e) => {
      setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
   };
   const onUserTypeChange = (e) => {
      setUserType({ ...userType, [e.target.name]: e.target.checked });
      console.log(e.target.checked);
   };
   const validateEmail = (email) => {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
   };

   const onNextStage = () => {
      if (!validateEmail(formDetails.email)) {
         setEmailIsValid(false);
         return;
      }
      if (isNaN(+formDetails.phone) || formDetails.phone.length !== 10) {
         setPhoneIsValid(false);
         return;
      }
      setEmailIsValid(true);
      setPhoneIsValid(true);
      setStage(2);
   };
   const onSave = async (e) => {
      const reqObj = {
         firstName: formDetails.firstName,
         lastName: formDetails.lastName,
         email: formDetails.email,
         type: formDetails.userType,
         birthday: formDetails.birthday,
         phone: formDetails.phone,
         contactUser: true,
      };
      const res = await api.patch(`users/${id}`, reqObj);

      const user = res.data[0];
      const userIndex = users.findIndex((i) => i.user_id === user.ID);
      const updateUsers = [...users];
      updateUsers[userIndex] = {
         birth_date: user.birthDay,
         contacts: user.contactUser,
         email: user.email,
         first_name: user.firstName,
         last_name: user.lastName,
         phone: user.phone,
         user_id: user.ID,
      };
      setUsers(updateUsers);
      close();
   };
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
                        <input
                           value={formDetails.firstName}
                           name="firstName"
                           onChange={onChange}
                           type="text"
                        />
                     </div>
                     <div>
                        <label>שם משפחה</label>
                        <input
                           value={formDetails.lastName}
                           name="lastName"
                           onChange={onChange}
                           type="text"
                        />
                     </div>
                     <div>
                        <label>תעודת זהות</label>
                        <input
                           value={formDetails.id}
                           name="id"
                           type="text"
                           onChange={onChange}
                           disabled
                        />
                     </div>
                     <div>
                        <label>תאריך לידה</label>
                        <input
                           type="text"
                           value={formDetails.birthday}
                           name="birthday"
                           onChange={onChange}
                           disabled
                        />
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
                                 onChange={onUserTypeChange}
                                 name="admin"
                                 checked={userType.admin}
                              />
                           </div>

                           <div>
                              <label>יושב ראש ועדה</label>
                              <input
                                 className={style.userTypeCheckBox}
                                 type="checkbox"
                                 onChange={onUserTypeChange}
                                 name="committeeHead"
                                 checked={userType.committeeHead}
                              />
                           </div>
                        </div>
                        <div>
                           <div>
                              <label>הורה</label>
                              <input
                                 className={style.userTypeCheckBox}
                                 type="checkbox"
                                 onChange={onUserTypeChange}
                                 name="parent"
                                 checked={userType.parent}
                              />
                           </div>
                           <div>
                              <label>חבר ועדה</label>
                              <input
                                 checked={userType.committeeMember}
                                 className={style.userTypeCheckBox}
                                 type="checkbox"
                                 onChange={onUserTypeChange}
                                 name="committeeMember"
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
                        <input
                           value={formDetails.email}
                           name="email"
                           type="text"
                           onChange={onChange}
                           ref={emailRef}
                        />
                     </div>
                     {!emailIsValid && (
                        <p className={style.invalidEmail}>* אימייל לא תקין</p>
                     )}
                     <div>
                        <label>טלפון נייד</label>
                        <input
                           value={formDetails.phone}
                           name="phone"
                           type="text"
                           onChange={onChange}
                           ref={phoneRef}
                        />
                     </div>{" "}
                     {!phoneIsValid && (
                        <p className={style.invalidEmail}>* טלפון לא תקין</p>
                     )}
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
                     <button onClick={onNextStage}>לעמוד הבא</button>
                  </div>
               </>
            ) : (
               <>
                  <>
                     <div className={style.btnContainer}>
                        <button onClick={onSave}>שמירה</button>
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
