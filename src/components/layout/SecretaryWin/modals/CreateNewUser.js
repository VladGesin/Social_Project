import React, { useState, useEffect, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import api from "../../../../api";
import style from "./CreateNewUser.module.scss";
const CreateNewUser = ({ isOpen, close, id, setUsers, users, setMsg }) => {
   const [stage, setStage] = useState(1);
   const [validation, setValidation] = useState({
      emailIsValid: true,
      emailIsAlreadyExist: false,
      phoneIsValid: true,
      firstNameIsValid: true,
      lastNameIsValid: true,
      idIsValid: true,
      idIsAlreadyExist: false,
      birthDateIsValid: true,
      birthDateIsEmpty: null,
      passwordIsValid: true,
   });

   const [passwordIsShown, setPasswordIsShown] = useState(false);
   const [committeesBoxItem, setCommitteesBoxItem] = useState([]);
   const [imageName, setImageName] = useState("");
   const [imagePath, setImagePath] = useState("");
   const [formDetails, setFormDetails] = useState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      phonePrefix: "054",
      id: "",
      birthday: "",
      userType: "",
      password: "",
   });
   const [userType, setUserType] = useState({
      parent: true,
      committeeMember: false,
      committeeHead: false,
      admin: false,
   });
   const emailRef = useRef(null);
   const phoneRef = useRef(null);

   const onChange = (e) => {
      setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
   };
   const onUserTypeChange = (e) => {
      setUserType({
         parent: false,
         committeeMember: false,
         committeeHead: false,
         admin: false,
         [e.target.name]: e.target.checked,
      });
      console.log(e.target.checked);
   };
   const validateForm = () => {
      const validatePassword = (password) => {
         var regularExpression =
            "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&])";
         if (!password.match(regularExpression) || password.length < 8)
            return false;
         return true;
      };
      const validateDate = () => {
         const today = new Date();
         const birthDate = new Date(formDetails.birthday);
         let age = today.getFullYear() - birthDate.getFullYear();
         const m = today.getMonth() - birthDate.getMonth();
         if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
         }
         if (age < 18) {
            return false;
         } else {
            return true;
         }
      };

      let isValid = true;
      if (!validateEmail(formDetails.email)) {
         setValidation((cur) => ({ ...cur, emailIsValid: false }));
         setStage(1);
         isValid = false;
      } else {
         setValidation({ ...validation, emailIsValid: true });
      }
      if (isNaN(+formDetails.phone) || formDetails.phone.length !== 7) {
         setStage(1);
         setValidation((cur) => ({ ...cur, phoneIsValid: false }));
         isValid = false;
      } else {
         setValidation((cur) => ({ ...cur, phoneIsValid: true }));
      }
      if (formDetails.firstName.length === 0) {
         setStage(1);
         setValidation((cur) => ({ ...cur, firstNameIsValid: false }));
         isValid = false;
      } else {
         setValidation((cur) => ({ ...cur, firstNameIsValid: true }));
      }

      if (formDetails.lastName.length === 0) {
         setStage(1);
         setValidation((cur) => ({ ...cur, lastNameIsValid: false }));
         isValid = false;
      } else {
         setValidation((cur) => ({ ...cur, lastNameIsValid: true }));
      }
      if (formDetails.id.length !== 9) {
         setStage(1);
         setValidation((cur) => ({ ...cur, idIsValid: false }));
         isValid = false;
      } else {
         setValidation((cur) => ({ ...cur, idIsValid: true }));
      }

      if (formDetails.birthday.length === 0) {
         setStage(1);
         setValidation((cur) => ({ ...cur, birthDateIsEmpty: true }));
         isValid = false;
      } else {
         setValidation((cur) => ({ ...cur, birthDateIsEmpty: false }));
      }
      if (!validateDate()) {
         setValidation((cur) => ({ ...cur, birthDateIsValid: false }));
         isValid = false;
         setStage(1);
      } else {
         setValidation((cur) => ({ ...cur, birthDateIsValid: true }));
      }
      if (!validatePassword(formDetails.password)) {
         setValidation((cur) => ({ ...cur, passwordIsValid: false }));
         isValid = false;
      } else {
         setValidation((cur) => ({ ...cur, passwordIsValid: true }));
      }
      return isValid;
   };
   const validateEmail = (email) => {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
   };
   const onPrevStage = (e) => {
      e.preventDefault();
      if (stage === 3) {
         setStage(2);
      }
      if (stage === 2) {
         setStage(1);
      }
   };
   const onNextStage = (e) => {
      e.preventDefault();
      if (stage === 1) {
         setStage(2);
      }
      if (stage === 2) {
         setStage(3);
      }
   };
   const onSelectImage = (e) => {
      setImageName(e.target.files[0].name);
      console.log(e.target.files);
      if (e.target.files && e.target.files[0]) {
         let reader = new FileReader();
         reader.onload = (e) => {
            setImagePath(e.target.result);
         };
         reader.readAsDataURL(e.target.files[0]);
      }
   };
   const onSave = async (e) => {
      try {
         e.preventDefault();
         const isValid = validateForm();
         if (!isValid) return;

         const userTypes = Object.keys(userType);
         const checkedUserType = userTypes.filter((u) => userType[u]);

         const reqObj = {
            id: formDetails.id,
            firstName: formDetails.firstName,
            lastName: formDetails.lastName,
            email: formDetails.email,
            password: formDetails.password,
            type: checkedUserType[0],
            contactUser: true,
            birthday: formDetails.birthday,
            phone: formDetails.phonePrefix + formDetails.phone,
         };
         console.log(reqObj.phone);
         const res = await api.post(`users`, reqObj);

         setValidation((cur) => ({
            ...cur,
            idIsAlreadyExist: false,
            emailIsAlreadyExist: false,
         }));
         const updatedUsers = await api.get("users/");
         setUsers(updatedUsers.data);
         setStage(1);
         setFormDetails({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            id: "",
            birthday: "",
            userType: "",
            password: "",
         });
         close();
         setMsg({ msg: "המשתמש נוצר בהצלחה" });
      } catch (e) {
         if (e.response.data.message == "User already exists")
            setValidation((cur) => ({ ...cur, idIsAlreadyExist: true }));
         else
            setValidation((cur) => ({
               ...cur,
               emailIsAlreadyExist: true,
               idIsAlreadyExist: false,
            }));

         setStage(1);
      }
   };
   return (
      <Modal
         show={isOpen}
         onHide={() => {
            close();
            setFormDetails({
               firstName: "",
               lastName: "",
               email: "",
               phone: "",
               id: "",
               birthday: "",
               userType: "",
               password: "",
            });
            setValidation({
               emailIsValid: true,
               emailIsAlreadyExist: false,
               phoneIsValid: true,
               firstNameIsValid: true,
               lastNameIsValid: true,
               idIsValid: true,
               idIsAlreadyExist: false,
               birthDateIsEmpty: null,
               birthDateIsValid: true,
               passwordIsValid: true,
            });
            setStage(1);
         }}
         contentClassName={style.newUser}
         centered
         size="xl"
      >
         <div className={style.header}>
            <div
               onClick={() => setStage(1)}
               className={`${style.stageContainer}  ${
                  stage === 1 && `${style.activeStage}`
               }`}
            >
               <div className={`${style.one} ${style.stage}`}>1</div>
               <p>פרטים אישיים</p>
            </div>
            <div className={style.line}></div>
            <div
               onClick={() => setStage(2)}
               className={`${style.stageContainer}  ${
                  stage === 2 && `${style.activeStage}`
               }`}
            >
               <div className={`${style.two} ${style.stage}`}>2</div>{" "}
               <p>סיווג משתמש</p>
            </div>
            <div className={style.line}></div>
            <div
               onClick={() => setStage(3)}
               className={`${style.stageContainer}  ${
                  stage === 3 && `${style.activeStage}`
               }`}
            >
               <div className={`${style.three} ${style.stage}`}>3</div>{" "}
               <p>יצירת סיסמא</p>
            </div>
         </div>
         <form>
            <div className={style.body}>
               {stage === 1 ? (
                  <>
                     <div className={style.rightSection}>
                        <form onSubmit={onNextStage}>
                           <div>
                              <label>שם פרטי</label>
                              <input
                                 value={formDetails.firstName}
                                 name="firstName"
                                 onChange={onChange}
                                 type="text"
                                 required
                              />{" "}
                              {!validation.firstNameIsValid && (
                                 <span className={style.invalidEmail}>
                                    * שדה חובה
                                 </span>
                              )}
                           </div>
                           <div>
                              <label>שם משפחה</label>
                              <input
                                 value={formDetails.lastName}
                                 name="lastName"
                                 onChange={onChange}
                                 type="text"
                                 required
                              />{" "}
                              {!validation.lastNameIsValid && (
                                 <span className={style.invalidEmail}>
                                    * שדה חובה
                                 </span>
                              )}
                           </div>
                           <div>
                              <label>תעודת זהות</label>
                              <input
                                 value={formDetails.id}
                                 name="id"
                                 type="text"
                                 onChange={onChange}
                                 required
                              />
                              {!validation.idIsValid && (
                                 <span className={style.invalidEmail}>
                                    * ת.ז חייבת להכיל 9 ספרות
                                 </span>
                              )}
                              {validation.idIsAlreadyExist && (
                                 <span className={style.invalidEmail}>
                                    * ת.ז זאת כבר קיימת במערכת
                                 </span>
                              )}
                           </div>
                           <div>
                              <label>תאריך לידה</label>
                              <input
                                 type="date"
                                 value={formDetails.birthday}
                                 name="birthday"
                                 onChange={onChange}
                                 required
                              />
                              {validation.birthDateIsEmpty == true && (
                                 <span className={style.invalidEmail}>
                                    * שדה חובה
                                 </span>
                              )}
                              {validation.birthDateIsValid == false && (
                                 <span className={style.invalidEmail}>
                                    * 18 הוא גיל מינימלי
                                 </span>
                              )}
                           </div>
                        </form>
                     </div>{" "}
                     <div className={style.leftSection}>
                        <div>
                           <label>כתובת מייל</label>
                           <input
                              value={formDetails.email}
                              name="email"
                              type="text"
                              onChange={onChange}
                              ref={emailRef}
                              required
                           />
                        </div>
                        {!validation.emailIsValid && (
                           <p className={style.invalidEmail}>
                              * אימייל לא תקין
                           </p>
                        )}
                        {validation.emailIsAlreadyExist && (
                           <p className={style.invalidEmail}>
                              * אימייל כבר קיים במערכת
                           </p>
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
                        {!validation.phoneIsValid && (
                           <p className={style.invalidEmail}>* טלפון לא תקין</p>
                        )}
                        <div>
                           <label className={style.imageUpload}>
                              העלאת תמונת פרופיל
                              <i className="fa fa-cloud-upload"></i>
                              <input
                                 type="file"
                                 onChange={onSelectImage}
                                 accept="image/*"
                              />
                           </label>
                           <p>תמונה זו תוצג בפרופיל המשתמש בלבד</p>
                           {imageName !== "" && (
                              <>
                                 <p style={{ direction: "rtl" }}>
                                    {`שם התמונה : ${imageName}`}
                                 </p>
                                 <img
                                    src={imagePath}
                                    alt=""
                                    className={style.imagePreview}
                                 />
                              </>
                           )}
                        </div>
                     </div>
                  </>
               ) : stage === 2 ? (
                  <>
                     <div className={style.rightSection}>
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
                           <div className={style.paddingLeft}>
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
                     </div>

                     <div className={style.leftSection}>
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
                     </div>
                  </>
               ) : (
                  <>
                     {" "}
                     <div className={style.password}>
                        <label>סיסמא</label>
                        <input
                           value={formDetails.password}
                           name="password"
                           onChange={onChange}
                           type={passwordIsShown ? "text" : "password"}
                        />
                        {!passwordIsShown ? (
                           <i
                              className={`fas fa-eye ${style.eye}`}
                              onClick={() => setPasswordIsShown((cur) => !cur)}
                           ></i>
                        ) : (
                           <i
                              className={`far fa-eye-slash ${style.eye}`}
                              onClick={() => setPasswordIsShown((cur) => !cur)}
                           ></i>
                        )}
                        <div className="rules">
                           <p>הסיסמא חייבת להכיל:</p>
                           <p>1. לפחות 8 תווים</p>
                           <p>2. לפחות אות גדולה אחת</p>
                           <p>3. לפחות אות קטנה אחת</p>
                           <p>4. לפחות ספרה אחת</p>
                           <p>5. לפחות תו אחד מיוחד</p>
                        </div>
                        {!validation.passwordIsValid && (
                           <span className={style.invalidEmail}>
                              * סיסמא לא תקינה
                           </span>
                        )}
                     </div>
                  </>
               )}
            </div>
            <div className={style.footer}>
               {stage === 1 ? (
                  <>
                     <div className={style.btnContainer}>
                        <button type="submit" onClick={onNextStage}>
                           לעמוד הבא
                        </button>{" "}
                     </div>
                  </>
               ) : stage === 2 ? (
                  <>
                     <div className={style.btnContainer}>
                        <button onClick={onNextStage}>לעמוד הבא</button>{" "}
                        <button
                           className={style.prevPage}
                           onClick={onPrevStage}
                        >
                           לעמוד הקודם
                        </button>
                     </div>
                  </>
               ) : (
                  <div className={style.btnContainer}>
                     <button onClick={onSave}>סיום</button>
                     <button className={style.prevPage} onClick={onPrevStage}>
                        לעמוד הקודם
                     </button>
                  </div>
               )}
            </div>
         </form>
      </Modal>
   );
};

export default CreateNewUser;
