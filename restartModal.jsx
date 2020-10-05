import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import validator from 'validator';
import {Validation} from "../../Validation/Validation";

const RestartModal = (props) => {

  leInputID = e => {
    this.inputId = e.target.value;
  }
  handleInputPassword = e => {
    this.inputPassword = e.target.value;
  }
  ValidetionInputIdAndPassword = () => {
     let validator = new Validation();
     let isValidId = validator.isValidId(this.inputId);
     let isValidPassword = validator.isValidPassword(this.inputPassword);
    if(isValidId && isValidPassword)
    {
      changeDetails();
    }
  }
  function changeDetails()
  {
    const response = fetch('http://localhost:8080/users/:id', {
     method: 'PATCH',
     body: JSON.stringify({
      password: this.inputPassword,
      userID: this.inputId
     })
   });
   const token = response.json();
   console.log(token);
 }

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
             <Form.Control type="ID" placeholder='ת"ז המכילה ספרות 0-9 כולל ספרת ביקורת'  onChange={e => this.handleInputID(e)}  type="text" /> 
             <Form.Text className="ID_Pass_new"> </Form.Text>
           </Form.Group>

           <Form.Group controlId="EnterPass1">
             <Form.Label>סיסמא חדשה</Form.Label>
             <Form.Control type="New_Pass" placeholder="סיסמא חדשה" onChange={e => this.handleInputPassword(e)}/> 
           </Form.Group>
           <Button variant="primary" type="submit" onClick={this.ValidetionInputIdAndPassword}> {/*props.onHide */}
             שמור וסגור
           </Button>
         </Form>
       </Modal.Body>
     </Modal>
   )
     
}

export default RestartModal;