import React, { Fragment } from "react";
import { Form, Col, Button, Card } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import style from "./GoodWordDetails.module.scss";
import api from "../../../../../api";
const GoodWordDetails = ({ isOpen, close, data }) => {
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
               <p>
                  צפייה במילה טובה מספר <span>{data.serial_id}</span>
               </p>
            </Card.Header>
            <Card.Body>
               <Form dir="rtl">
                  <Form.Row>
                     <Form.Group as={Col}>
                        <Form.Label>שם השולח:</Form.Label>
                        <Form.Control
                           className={style.input}
                           disabled
                           disabled
                           placeholder={data.full_name}
                        />
                     </Form.Group>

                     <Form.Group as={Col}>
                        <Form.Label>אימייל:</Form.Label>
                        <Form.Control
                           className={style.input}
                           disabled
                           defaultValue={data.email}
                        ></Form.Control>
                     </Form.Group>
                     <Form.Group as={Col}>
                        <Form.Label>טלפון:</Form.Label>
                        <Form.Control
                           className={style.input}
                           disabled
                           defaultValue={data.phone}
                        ></Form.Control>
                     </Form.Group>
                  </Form.Row>
                  <Form.Group>
                     <Form.Label>סטאטוס:</Form.Label>
                     <Form.Control
                        className={style.input}
                        disabled
                        defaultValue={data.state}
                     />
                  </Form.Group>

                  <Form.Group>
                     <Form.Label>תוכן המילה הטובה:</Form.Label>
                     <Form.Control
                        disabled
                        className={style.input}
                        disabled
                        as="textarea"
                        placeholder={data.content}
                     />
                  </Form.Group>
               </Form>
            </Card.Body>
         </Card>
      </Modal>
   );
};

export default GoodWordDetails;
