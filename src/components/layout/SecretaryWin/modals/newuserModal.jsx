import Modal from "react-bootstrap/Modal";
import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Button } from "react-bootstrap";
import { Validation } from "../../Validation/Validation";
import api from "../../../../api";
import Context from "../../../../store/Context";

const NewuserModal = (props) => {
   const context = useContext(Context);
   const [userData, setUserData] = useState({
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      password1: "",
      password2: "",
      type: "",
      birthday: "",
      contactUser: true,
      phone: "",
   });
   const onChange = (e) => {
      // console.log(e.target.name);
      const updateData = { ...userData, [e.target.name]: e.target.value };
      setUserData(updateData);
   };

   const onSubmit = async (e) => {
      e.preventDefault();
      if (userData.password1 === userData.password2) {
         const req = { ...userData };
         req.password = userData.password1;
         req.id = +req.id;
         delete req.password1;
         delete req.password2;
         const res = await context.register(req);
         console.log(res);
         if (res != undefined) {
            props.onHide(false);
         }
      }
   };

   return (
      <Modal
         onHide={props.onHide}
         show={props.show}
         size="lg"
         className="text-right"
      >
         <Modal.Header dir="rtl">
            <Modal.Title>יצירת משתמש חדש</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Form>
               <Row className="justify-content-end">
                  <Form.Group className="col-6">
                     <Form.Label>תעודת זהות</Form.Label>
                     <Form.Control
                        required
                        name="id"
                        placeholder="123456789"
                        dir="rtl"
                        onChange={(e) => onChange(e)}
                     />
                  </Form.Group>
                  <Form.Group controlId="New_Id" className="col-6">
                     <Form.Label>כותבת מייל</Form.Label>
                     <Form.Control
                        required
                        type="email"
                        name="email"
                        onChange={(e) => onChange(e)}
                        placeholder="123456789"
                        dir="rtl"
                     />
                  </Form.Group>
               </Row>
               <Row className="justify-content-end">
                  <Form.Group controlId="New_Id" className="col-4">
                     <Form.Label>שם משפחה</Form.Label>
                     <Form.Control
                        required
                        name="lastName"
                        onChange={(e) => onChange(e)}
                        dir="rtl"
                     />
                  </Form.Group>
                  <Form.Group controlId="New_Id" className="col-4">
                     <Form.Label>שם פרטי</Form.Label>
                     <Form.Control
                        required
                        name="firstName"
                        onChange={(e) => onChange(e)}
                        dir="rtl"
                     />
                  </Form.Group>
                  <Form.Group controlId="New_Id" className="col-4">
                     <Form.Label>טלפון</Form.Label>
                     <Form.Control
                        required
                        name="phone"
                        onChange={(e) => onChange(e)}
                        placeholder="052-3456789"
                        dir="rtl"
                     />
                  </Form.Group>
               </Row>
               <Row className="justify-content-end">
                  <Form.Group controlId="New_Id" className="col-6">
                     <Form.Label>סוג משתמש</Form.Label>
                     <Form.Control
                        required
                        name="type"
                        onChange={(e) => onChange(e)}
                        dir="rtl"
                     />
                  </Form.Group>
                  <Form.Group controlId="New_Id" className="col-6">
                     <Form.Label>תאריך לידה</Form.Label>
                     <Form.Control
                        required
                        type="date"
                        name="birthday"
                        onChange={(e) => onChange(e)}
                        dir="rtl"
                     />
                  </Form.Group>
               </Row>
               <Row className="justify-content-end">
                  <Form.Group controlId="New_Id" className="col-6">
                     <Form.Label>הקש שוב סיסמא ראשונית</Form.Label>
                     <Form.Control
                        required
                        type="password"
                        name="password1"
                        onChange={(e) => onChange(e)}
                        dir="rtl"
                     />
                  </Form.Group>
                  <Form.Group controlId="New_Id" className="col-6">
                     <Form.Label>סיסמא ראשונית</Form.Label>
                     <Form.Control
                        required
                        type="password"
                        name="password2"
                        onChange={(e) => onChange(e)}
                        dir="rtl"
                     />
                  </Form.Group>
               </Row>
               <Button
                  variant="primary"
                  type="submit"
                  onClick={(e) => onSubmit(e)}
               >
                  שמור וסגור
               </Button>
            </Form>
         </Modal.Body>
      </Modal>
   );
};

export default NewuserModal;
