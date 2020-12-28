import React, { useState } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import api from "../../../../../api";
import style from "./RestPassword.module.scss";
import Context from "../../../../../store/Context";

const RestPassword = ({ close, setMsg }) => {
   const { userState } = React.useContext(Context);

   const [passwordIsShown, setPasswordIsShown] = useState(false);
   const [passwordIsEmpty, setPasswordIsEmpty] = useState(true);
   const [newPassword, setNewPassword] = useState({
      password1: "",
      password2: "",
   });
   const [isValidPassword, setIsValidPassword] = useState(true);
   const [isPasswordMatch, setIsPasswordMatch] = useState(true);

   const handlePassword = (e) => {
      setNewPassword({ ...newPassword, [e.target.name]: e.target.value });
      if (e.target.value !== "") setPasswordIsEmpty(false);
      else setPasswordIsEmpty(true);
   };

   const validatePassword = (password) => {
      var regularExpression =
         "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&])";
      if (!password.match(regularExpression) || password.length < 8)
         return false;
      return true;
   };

   const onSave = async () => {
      if (newPassword.password1 !== newPassword.password2) {
         setIsPasswordMatch(false);
         return;
      } else {
         setIsPasswordMatch(true);
      }
      if (!validatePassword(newPassword.password1)) {
         setIsValidPassword(false);
         return;
      } else {
         setIsValidPassword(true);
      }
      try {
         const res = await api.post(`changePassword/${userState.id}`, {
            password: newPassword.password1,
         });
         setNewPassword({
            password1: "",
            password2: "",
         });
         close && close();
         setMsg({ msg: "הסיסמא אופסה בהצלחה", type: "success" });
         console.log("here");
      } catch (e) {
         console.log(e);
      }
   };
   return (
      <React.Fragment>
         <div className={style.body}>
            <div className={style.userId}>
               <label>תעודת זהות</label>
               <input readOnly value={userState.id} type="text" />
            </div>
            <div className={style.newPassword}>
               {passwordIsShown ? (
                  <i
                     className="fas fa-eye"
                     onClick={() => setPasswordIsShown((cur) => !cur)}
                  ></i>
               ) : (
                  <i
                     className="far fa-eye-slash"
                     onClick={() => setPasswordIsShown((cur) => !cur)}
                  ></i>
               )}

               <label>
                  סיסמא חדשה{" "}
                  <OverlayTrigger
                     trigger="click"
                     placement="top"
                     overlay={
                        <Popover id="popover-basic" className={style.rules}>
                           <Popover.Title as="h3">דרישות הסיסמא</Popover.Title>
                           <Popover.Content>
                              <div>
                                 <p> לא תכיל שם פרטי / משפחה * </p>
                                 <p> אורך 6 תווים לפחות * </p>

                                 <p> תוקף הסיסמא 180 ימים * </p>
                              </div>
                           </Popover.Content>
                        </Popover>
                     }
                  >
                     <i
                        className={`fas fa-question-circle ${style.questionMark}`}
                     ></i>
                  </OverlayTrigger>
               </label>
               <input
                  type={!passwordIsShown ? "password" : "text"}
                  onChange={handlePassword}
                  value={newPassword.password1}
                  name="password1"
               />
            </div>
            <div className={style.newPassword}>
               {passwordIsShown ? (
                  <i
                     className="fas fa-eye"
                     onClick={() => setPasswordIsShown((cur) => !cur)}
                  ></i>
               ) : (
                  <i
                     className="far fa-eye-slash"
                     onClick={() => setPasswordIsShown((cur) => !cur)}
                  ></i>
               )}

               <label>אימות סיסמא</label>
               <input
                  type={!passwordIsShown ? "password" : "text"}
                  disabled={passwordIsEmpty}
                  name="password2"
                  onChange={handlePassword}
               />
            </div>
            <div className={style.errors}>
               {!isPasswordMatch && <p>* הסיסמאות אינם תואמות</p>}
               {!isValidPassword && <p>* הסיסמא אינה עומדת בדרישות</p>}
            </div>
            <div className={style.btnContainer}>
               <button className={style.saveBtn} onClick={onSave}>
                  שמור סיסמא
               </button>
            </div>
         </div>
      </React.Fragment>
   );
};

export default RestPassword;
