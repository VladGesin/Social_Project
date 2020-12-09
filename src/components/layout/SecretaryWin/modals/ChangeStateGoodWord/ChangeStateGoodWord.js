import React, { useState, useEffect } from "react";
import { Form, Col, Button, Card } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import style from "./ChangeStateGoodWord.module.scss";
import api from "../../../../../api";
const ChangeStateGoodWord = ({ isOpen, close, data, reRender, setMsg }) => {
   const [status, setStatus] = useState();

   useEffect(() => {
      setStatus(data.state);
   }, [data.state]);

   const onUpdate = async (e) => {
      let newState =
         status === "אושר" ? true : status === "נדחה" ? false : null;

      const res = await api.patch("goodWord", {
         serial_number: data.serial_id,
         status: newState,
      });
      close();
      reRender();
      setMsg({ msg: "סטאטוס מילה טובה עודכן בהצלחה" });
   };
   return (
      <Modal
         show={isOpen}
         onHide={close}
         size="sm"
         dir="rtl"
         contentClassName={style.container}
      >
         <Card className={`text-right h-auto ${style.container}`}>
            <Card.Header as="h5" dir="rtl" className={style.header}>
               <p>
                  עדכון סטטוס למילה טובה מספר <span>{data.serial_id}</span>
               </p>
            </Card.Header>
            <Card.Body>
               <Form dir="rtl">
                  <Form.Row>
                     <Form.Group as={Col}>
                        <Form.Label>סטטוס:</Form.Label>
                        <Form.Control
                           className={style.input}
                           defaultValue={data.state}
                           as="select"
                           onChange={(e) => setStatus(e.target.value)}
                        >
                           <option>אושר</option>
                           <option>נדחה</option>
                           <option>טרם טופל</option>
                        </Form.Control>
                     </Form.Group>
                  </Form.Row>

                  <div className={style.btnContainer}>
                     <Button variant="secondary" onClick={close}>
                        ביטול
                     </Button>
                     <Button variant="success" onClick={onUpdate}>
                        עדכן
                     </Button>
                  </div>
               </Form>
            </Card.Body>
         </Card>
      </Modal>
   );
};

export default ChangeStateGoodWord;
