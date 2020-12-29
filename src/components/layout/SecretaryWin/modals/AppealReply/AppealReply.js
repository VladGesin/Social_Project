import React, { useState } from "react";
import { Form, Col, Button, Card } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import style from "./AppealReply.module.scss";
import api from "../../../../../api";

const AppealReply = ({ isOpen, close, data, getAppealsForCommittee }) => {
   const [reply, setReply] = useState("");

   const onSave = async () => {
      try {
         if (reply == "") return;
         const res = await api.post("inbox/response", {
            inbox_id: data.inbox_id,
            content: reply,
         });
         close();
         getAppealsForCommittee();
      } catch (error) {
         console.log(error);
      }
   };
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
               מענה לפנייה מספר {data?.inbox_id}
            </Card.Header>
            <Card.Body>
               <Form dir="rtl">
                  <Form.Group>
                     <Form.Label>מענה הפנייה:</Form.Label>
                     <Form.Control
                        className={style.input}
                        as="textarea"
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                     />
                  </Form.Group>
               </Form>
            </Card.Body>
            <div className={style.btnContainer}>
               {!_reply?.reply_content && (
                  <Button variant="secondary" onClick={onSave}>
                     אישור{" "}
                  </Button>
               )}

               <Button onClick={close} variant="danger">
                  ביטול
               </Button>
            </div>
         </Card>
      </Modal>
   );
};

export default AppealReply;
