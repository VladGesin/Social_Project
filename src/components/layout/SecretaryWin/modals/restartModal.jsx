import Modal from "react-bootstrap/Modal";
import React from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

const RestartModal = (props) => {
 
   return(
    <Modal
        onHide = {props.onHide}
        show = {props.show}
        size="lg"  
       aria-labelledby="Restart_Pass"
       className="text-right"
     >
       <Modal.Header dir="rtl">
         <Modal.Title id="Restart_Pass">איפוס סיסמא</Modal.Title>
       </Modal.Header>
       <Modal.Body>
         <Form>
           <Form.Group controlId="EnterID1">
             <Form.Label >תעודת זהות</Form.Label>
             <Form.Control type="ID" placeholder="123456789" dir="rtl" />
             <Form.Text className="ID_Pass_new"> </Form.Text>
           </Form.Group>

           <Form.Group controlId="EnterPass1">
             <Form.Label>סיסמא חדשה</Form.Label>
             <Form.Control type="New_Pass" placeholder="סיסמא חדשה" dir="rtl"/>
           </Form.Group>
           <Button variant="primary" type="submit" onClick={props.onHide}>
             שמור
           </Button>
         </Form>
       </Modal.Body>
     </Modal>
   )
     
}

export default RestartModal;