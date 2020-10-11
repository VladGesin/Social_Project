import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import validator from 'validator';
import {Validation} from "../../Validation/Validation";


const DeleteuserModal = (props) => {

  const handleInputID = (e) =>{
    this.inputId = e.target.value;
  }
  const ValidationInputNewUser = () => {
    let validator = new Validation();
    let isValidId = validator.isValidId(this.inputId);
   if(isValidId){
    // DeleteUser();
    }

  function DeleteUser()
  {
       const response = fetch('http://localhost:8080/users/:id', {
        method: 'DELETE',
        body: JSON.stringify({
        })
      });
      const token = response.json();
      console.log(token);
    }
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
                <Modal.Title id="Delete_Account">מחיקת משתמש קיים</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="Id">
                    <Form.Label>הכנס תעודת זהות</Form.Label>
                    <Form.Control  placeholder='ת"ז המכילה ספרות 0-9 כולל ספרת ביקורת' onChange={e => this.handleInputID(e)}  type="text"/>
                    <span id="IDError"></span>
                  </Form.Group>
                </Form>
                <Button variant="primary" type="submit" onClick={this.ValidationInputNewUser}> {/*props.onHide*/}
                  מחק משתמש מהמערכת
                </Button>
              </Modal.Body>
            </Modal>
   )
     
}

export default DeleteuserModal;