import React, { Fragment } from "react";
import { Form, Col, Button, Card } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import style from "./ContactDetails.module.scss";
import api from "../../../../../api";
const ContactDetails = ({ isOpen, close }) => {
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
               צפייה בפרטי איש קשר
            </Card.Header>
            <Card.Body>
               <Form dir="rtl">
                  <Form.Row>
                     <Form.Group as={Col} controlId="formGridName">
                        <Form.Label>שם איש קשר:</Form.Label>
                        <Form.Control disabled />
                     </Form.Group>

                     <Form.Group as={Col} controlId="formGridPhone">
                        <Form.Label>טלפון ליצירת קשר:</Form.Label>
                        <Form.Control disabled />
                     </Form.Group>

                     <Form.Group as={Col} controlId="formGridContactMail">
                        <Form.Label>כתובת אימייל</Form.Label>
                        <Form.Control
                           disabled
                           type="email"
                           placeholder="name@example.com"
                        />
                     </Form.Group>
                  </Form.Row>
               </Form>
            </Card.Body>
         </Card>
      </Modal>
   );
};

export default ContactDetails;
