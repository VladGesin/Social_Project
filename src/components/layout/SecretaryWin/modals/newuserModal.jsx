import Modal from "react-bootstrap/Modal";
import React from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

const NewuserModal = (props) => {
 
   return(
    <Modal
    onHide = {props.onHide}
    show = {props.show}
    size="lg"  
   aria-labelledby="Restart_Pass"
   className="text-right"
            >
              <Modal.Header dir="rtl">
                <Modal.Title id="New_Account">יצירת משתמש חדש</Modal.Title>
              </Modal.Header>
              <Modal.Body >
                <Form>
                  <Form.Group controlId="New_Id">
                    <Form.Label>תעודת זהות</Form.Label>
                    <Form.Control 
                    type="New_Id" 
                    placeholder="123456789" dir="rtl"
                    />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>כתובת מייל</Form.Label>
                    <Form.Control
                      type="emailNew"
                      placeholder="name@example.com"
                      dir="rtl"
                    />
                  </Form.Group>
                  <Form.Group controlId="Pass">
                    <Form.Label>סיסמא ראשונית</Form.Label>
                    <Form.Control type="password" placeholder="סיסמא ראשונית" dir="rtl" />
                  </Form.Group>
                </Form>
                <Button variant="primary" type="submit" onClick={props.onHide}>
                  שמור וסגור
                </Button>
              </Modal.Body>
            </Modal>
   )
     
}

export default NewuserModal;