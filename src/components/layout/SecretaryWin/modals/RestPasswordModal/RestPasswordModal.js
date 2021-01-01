import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import api from "../../../../../api";
import style from "./RestPassword.module.scss";
import ResetPassword from "./RestPassword";

const RestPasswordModal = ({ isOpen, close, setMsg, id }) => {
   useEffect(() => {});
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

         <ResetPassword close={close} setMsg={setMsg} id={id} />
      </Modal>
   );
};

export default RestPasswordModal;
