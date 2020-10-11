import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import {Validation} from "../../Validation/Validation";


const NewuserModal = (props) => {

const handleInputID = (e) =>{
  this.inputId = e.target.value;
}
const handleInputPassword = (e) => {
  this.inputPassword = e.target.value;
}

const handleInputEmail = (e) => {
  this.inputEmail = e.target.value;
}
  const ValidationInputNewUser = () => {
    let validator = new Validation();
    let isValidId = validator.isValidId(this.inputId);
    let isValidPassword = validator.isValidPassword(this.inputPassword);
    let isValidEmail = validator.isValidEmail(this.inputEmail);
   if(isValidId && isValidPassword && inputEmail)
   {
      openNewUser();
    }
  }
  function openNewUser()
  {
   const response = fetch('http://localhost:8080/users/:id', {
    method: 'POST',
    body: JSON.stringify({
      userID: this.inputId,
      email: this.inputEmail,
      password: this.inputPassword

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
                <Modal.Title id="New_Account">יצירת משתמש חדש</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="New_Id">
                    <Form.Label>תעודת זהות</Form.Label>
                    <Form.Control type="New_Id" placeholder="123456789" onChange={e => this.handleInputID(e)}  type="text"/>
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>כתובת מייל</Form.Label>
                    <Form.Control
                      type="emailNew"
                      placeholder="name@example.com"
                    />
                  </Form.Group>
                  <Form.Group controlId="Pass">
                    <Form.Label>סיסמא ראשונית</Form.Label>
                    <Form.Control type="password" placeholder="סיסמא ראשונית" />
                  </Form.Group>
                </Form>
                <Button variant="primary" type="submit" onClick={ValidationInputNewUser()}>
                  שמור וסגור
                </Button>
              </Modal.Body>
            </Modal>
   )
     
}

export default NewuserModal;