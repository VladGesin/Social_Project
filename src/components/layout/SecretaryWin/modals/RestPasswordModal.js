import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import style from "./RestPassword.module.scss";
const RestPasswordModal = ({ isOpen, close, id }) => {
   const [passwordIsShown, setPasswordIsShown] = useState(false);
   const [passwordIsEmpty, setPasswordIsEmpty] = useState(true);
   const [newPassword, setNewPassword] = useState({
      password1: "",
      password2: "",
   });

   const handlePassword = (e) => {
      setNewPassword({ ...newPassword, [e.target.name]: e.target.value });
      if (e.target.value !== "") setPasswordIsEmpty(false);
      else setPasswordIsEmpty(true);
   };
   return (
      <Modal
         show={isOpen}
         onHide={close}
         contentClassName={style.deleteWindow}
         centered
         size="md"
         backdrop={"static"}
      >
         <div className={style.header}>
            <h3 className={style.title}>איפוס סיסמא</h3>
            <i className="fas fa-times" onClick={close}></i>
         </div>

         <div className={style.body}>
            <div className={style.userId}>
               <label>תעודת זהות</label>
               <input readOnly value={id} type="text" />
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

            <div className={style.btnContainer}>
               <button className={style.saveBtn}>שמור סיסמא</button>
            </div>
         </div>
      </Modal>
   );
};

export default RestPasswordModal;
