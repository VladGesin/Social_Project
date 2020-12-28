import React, { Fragment } from "react";
import { Form, Col, Button, Card } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import style from "./ContactDetails.module.scss";
import api from "../../../../../api";

/*
inbox_id
:
1
sender_id
:
"555555555"
committee_name
:
"CoName"
subject
:
"Hello this is a test subject"
inbox_content
:
"test content"
inbox_sending_time
:
"2020-12-17"
is_open
:
"פתוח"
is_spam
:
true

contact_email
:
"test@gmail.com"
contact_phone
:
"05012546345"
priority
:
null
type
:
"some type"
contact_full_name
:
"Amit Shalev"
handler_id
:
"555555555"
reply_content
:
"some reply content"
reply_time
:

*/
const ContactDetails = ({ isOpen, close, data }) => {
   return (
      <Modal
         show={isOpen}
         onHide={close}
         size="lg"
         dir="rtl"
         contentClassName={style.container}
         centered
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
                        <Form.Control
                           disabled
                           value={data?.contact_full_name}
                        />
                     </Form.Group>

                     <Form.Group as={Col} controlId="formGridPhone">
                        <Form.Label>טלפון ליצירת קשר:</Form.Label>
                        <Form.Control disabled value={data?.contact_phone} />
                     </Form.Group>

                     <Form.Group as={Col} controlId="formGridContactMail">
                        <Form.Label>כתובת אימייל</Form.Label>
                        <Form.Control
                           disabled
                           type="email"
                           value={data?.contact_email}
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
