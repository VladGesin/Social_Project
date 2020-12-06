import React, { Fragment } from "react";
import { Form, Col, Button, Card } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import style from "./AppealReply.module.scss";
import api from "../../../../../api";

const AppealReply = ({ isOpen, close }) => {
   return (
      <Modal
         show={isOpen}
         onHide={close}
         size="lg"
         dir="rtl"
         contentClassName={style.container}
      >
         <Card className={`text-right h-auto ${style.container}`}>
            <Card.Header as="h5" dir="rtl" className={style.header}>
               מענה לפנייה מספר 123456
            </Card.Header>
            <Card.Body>
               <Form dir="rtl">
                  <Form.Group>
                     <Form.Label>מענה הפנייה:</Form.Label>
                     <Form.Control
                        disabled
                        className={style.input}
                        disabled
                        as="textarea"
                        placeholder="פירוט הפנייה כולל את כל גוף הפנייה ותוכן אליו תרצה/י שיתייחסו בפנייה. נא לכתוב כמה שיותר פרטים וכמה שיותר ברור על מנת שנוכל לסייע במהירות "
                     />
                  </Form.Group>
               </Form>
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

export default AppealReply;
