import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

const RestartModal = (props) => {
 
   return(
    <Modal
        onHide = {props.onHide}
        show = {props.show}
        size="lg"  
       aria-labelledby="Restart_Pass"
       dir="rtl"
     >
       <Modal.Header closeButton>
         <Modal.Title id="Restart_Pass">איפוס סיסמא</Modal.Title>
       </Modal.Header>
       <Modal.Body>
         <Form>
           <Form.Group controlId="EnterID1">
             <Form.Label>תעודת זהות</Form.Label>
             <Form.Control type="ID" placeholder="123456789" />
             <Form.Text className="ID_Pass_new"> </Form.Text>
           </Form.Group>

           <Form.Group controlId="EnterPass1">
             <Form.Label>סיסמא חדשה</Form.Label>
             <Form.Control type="New_Pass" placeholder="סיסמא חדשה" />
           </Form.Group>
           <Button variant="primary" type="submit" onClick={props.onHide}>
             שמור וסגור
           </Button>
         </Form>
       </Modal.Body>
     </Modal>
   )
     
}

export default RestartModal;