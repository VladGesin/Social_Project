import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

const DeleteuserModal = (props) => {
 
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
                    <Form.Control type="New_Id" placeholder="123456789" />
                  </Form.Group>
                </Form>
                <Button variant="primary" type="submit" onClick={props.onHide}>
                  מחק משתמש מהמערכת
                </Button>
              </Modal.Body>
            </Modal>
   )
     
}

export default DeleteuserModal;