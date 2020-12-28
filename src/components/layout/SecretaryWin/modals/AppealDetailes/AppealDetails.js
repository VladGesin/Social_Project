import React, { Fragment } from "react";
import { Form, Col, Button, Card } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import style from "./AppealDetails.module.scss";
import api from "../../../../../api";

const AppealDetails = ({ isOpen, close, data }) => {
   console.log(data);
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
               צפייה בפנייה מספר {data?.inbox_id}
            </Card.Header>
            <Card.Body>
               <Form dir="rtl">
                  <Form.Row>
                     <Form.Group as={Col} className="col-10">
                        <Form.Label>נושא הפנייה:</Form.Label>
                        <Form.Control
                           className={style.input}
                           disabled
                           disabled
                           placeholder={data?.subject}
                        />
                     </Form.Group>

                     <Form.Group as={Col}>
                        <Form.Label>דחיפות:</Form.Label>
                        <Form.Control
                           className={style.input}
                           disabled
                           defaultValue={data?.priority}
                        ></Form.Control>
                     </Form.Group>
                  </Form.Row>

                  <Form.Group>
                     <Form.Label>פרטי הפנייה:</Form.Label>
                     <Form.Control
                        disabled
                        className={style.input}
                        disabled
                        as="textarea"
                        placeholder={data?.inbox_content}
                     />
                  </Form.Group>
                  <Form.Group>
                     <Form.Label>מענה הפנייה:</Form.Label>
                     <Form.Control
                        disabled
                        className={style.input}
                        disabled
                        as="textarea"
                        placeholder={data?.reply_content}
                     />
                  </Form.Group>
               </Form>
            </Card.Body>
         </Card>
      </Modal>
   );
};

export default AppealDetails;
