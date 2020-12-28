import React, { useState, useEffect, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import api from "../../../../../api";
import style from "./EditUserModal.module.scss";

const EditUserModal = ({
   isOpen,
   close,
   id,
   setUsers,
   users,
   setMsg,
   getAndStoreUsers,
}) => {
   const [stage, setStage] = useState(1);
   const [emailIsValid, setEmailIsValid] = useState(true);
   const [phoneIsValid, setPhoneIsValid] = useState(true);
   const [committeesBoxItem, setCommitteesBoxItem] = useState([]);
   const [image, setImage] = useState({
      name: "",
      path: "",
   });
   const emailRef = useRef(null);
   const phoneRef = useRef(null);
   const [committee, setCommittee] = useState([]);
   const [formDetails, setFormDetails] = useState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      phonePrefix: "054",
      id: "",
      birthday: "",
      userType: "",
   });
   const [userType, setUserType] = useState({
      user: false,
      committee: false,
      chairman: false,
      admin: false,
   });

   const getAndStoreUserData = async () => {
      try {
         const res = await api.get(`user/${id}`);
         console.log(res);
         const {
            firstName,
            lastName,
            userType,
            email,
            birthday,
            phoneNumber,
         } = res.data[0];

         setUserType({
            user: false,
            committee: false,
            chairman: false,
            admin: false,
            [userType]: true,
         });
         setFormDetails((cur) => ({
            ...cur,
            firstName,
            lastName,
            userType,
            email,
            birthday,
            id,
            phone: phoneNumber.slice(3),
            phonePrefix: phoneNumber.slice(0, 3),
         }));
         setStage(1);
      } catch (err) {
         alert(err);
      }
   };
   const getAndStoreCommittees = async () => {
      let _committees = await api.get("committees");
      _committees = _committees.data.map((c) => c.name);
      setCommittee(_committees);
   };

   useEffect(() => {
      if (!id) return;
      getAndStoreUserData();
   }, [id]);

   useEffect(() => {
      if (!emailIsValid) emailRef.current.focus();
   }, [emailIsValid]);

   useEffect(() => {
      getAndStoreCommittees();
   }, []);

   const onChange = (e) => {
      setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
   };

   const onUserTypeChange = (e) => {
      setUserType({
         user: false,
         committee: false,
         chairman: false,
         admin: false,
         [e.target.name]: e.target.checked,
      });
   };

   const onNextStage = () => {
      const validateEmail = (email) => {
         var re = /\S+@\S+\.\S+/;
         return re.test(email);
      };
      const validatePhone = (phoneNumber, numbersAmount = 7) => {
         return !(isNaN(+phoneNumber) || phoneNumber.length !== numbersAmount);
      };

      if (!validateEmail(formDetails.email)) {
         setEmailIsValid(false);
         return;
      }
      if (!validatePhone(formDetails.phone)) {
         setPhoneIsValid(false);
         return;
      }
      setEmailIsValid(true);
      setPhoneIsValid(true);
      setStage(2);
   };
   const onSave = async (e) => {
      const type = Object.keys(userType).filter((t) => userType[t])[0];
      console.log(type);
      await api.patch(`users/${id}`, {
         firstName: formDetails.firstName,
         lastName: formDetails.lastName,
         email: formDetails.email,
         type: type,
         birthday: formDetails.birthday,
         phone: formDetails.phonePrefix + formDetails.phone,
         contactUser: true,
      });
      getAndStoreUsers();
      setUsers(users);
      setImage({ path: "", name: "" });
      setStage(1);
      close();
      setMsg({ msg: "פרטי המשתמש עודכנו בהצלחה", type: "success" });
   };
   const onSelectImage = (e) => {
      const _img = { name: e.target.files[0].name };
      if (e.target.files && e.target.files[0]) {
         let reader = new FileReader();
         reader.onload = (e) => {
            _img.path = e.target.result;
            setImage(_img);
         };
         reader.readAsDataURL(e.target.files[0]);
      }
   };
   return (
      <Modal
         show={isOpen}
         onHide={() => {
            setImage({ path: "", name: "" });
            setUserType({
               user: false,
               committee: false,
               chairman: false,
               admin: false,
               [formDetails.userType]: true,
            });
            close();
         }}
         contentClassName={style.editUser}
         centered
         size="xl"
         backdrop={"static"}
      >
         <div className={style.header}>
            <h3 className={style.title}>עריכת פרטי משתמש</h3>
            <i
               className="fas fa-times"
               onClick={() => {
                  close();
                  setUserType({
                     user: false,
                     committee: false,
                     chairman: false,
                     admin: false,
                     [formDetails.userType]: true,
                  });
                  setImage({ path: "", name: "" });
                  setStage(1);
               }}
            ></i>
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
                                 name="chairman"
                                 checked={userType.chairman}
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
                                 name="user"
                                 checked={userType.user}
                              />
                           </div>
                           <div>
                              <label>חבר ועדה</label>
                              <input
                                 checked={userType.committee}
                                 className={style.userTypeCheckBox}
                                 type="checkbox"
                                 onChange={onUserTypeChange}
                                 name="committee"
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
                        <div className={style.phoneInput}>
                           <input
                              value={formDetails.phone}
                              name="phone"
                              type="text"
                              onChange={onChange}
                              ref={phoneRef}
                           />
                           <select
                              value={formDetails.phonePrefix}
                              onChange={onChange}
                              name="phonePrefix"
                           >
                              <option>050</option>
                              <option>052</option>
                              <option>053</option>
                              <option>054</option>
                              <option>055</option>
                              <option>056</option>
                              <option>057</option>
                              <option>058</option>
                              <option>059</option>
                           </select>
                        </div>
                     </div>{" "}
                     {!phoneIsValid && (
                        <p className={style.invalidEmail}>* טלפון לא תקין</p>
                     )}
                     <div>
                        <label className={style.imageUpload}>
                           העלאת תמונת פרופיל
                           <i className="fa fa-cloud-upload"></i>
                           <input type="file" onChange={onSelectImage} />
                        </label>

                        <p>תמונה זו תוצג בפרופיל המשתמש בלבד</p>
                        {image.name !== "" && (
                           <>
                              <p style={{ direction: "rtl" }}>
                                 {`שם התמונה : ${image.name}`}
                              </p>
                              <img
                                 src={image.path}
                                 alt=""
                                 className={style.imagePreview}
                              />
                           </>
                        )}
                     </div>
                  </>
               ) : (
                  <>
                     {" "}
                     <div>
                        <label>שיוך יושב ראש לועדה</label>
                        <select
                           disabled={
                              userType.chairman || userType.admin ? false : true
                           }
                           dir="rtl"
                        >
                           <option></option>
                           {committee.map((c) => (
                              <option>{c}</option>
                           ))}
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
                           {committee.map((c) => (
                              <option>{c}</option>
                           ))}
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
