import React, { Fragment } from "react";
import { Form, Col, Button, Card } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import style from "./MarkAsSpam.module.scss";
import api from "../../../../../api";
const MarkAsSpam = ({ isOpen, close }) => {
   return (
      <Modal
         show={isOpen}
         onHide={close}
         size="lg"
         dir="rtl"
         contentClassName={style.container}
      >
         <Card className={`text-right h-auto ${style.container}`}>
            <Card.Body>
               <h3>האם אתה בטוח שברצונך לסמן את פנייה מספר 123456 כספאם?</h3>
            </Card.Body>
            <div className={style.btnContainer}>
               <Button variant="secondary">אישור </Button>
               <Button onClick={close} variant="danger">
                  ביטול
               </Button>
            </div>
         </Card>
      </Modal>
   );
};

export default MarkAsSpam;
