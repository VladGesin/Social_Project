import React, { useState } from "react";
import { Form, Col, Button, Card } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import style from "./AddContact.module.scss";
import api from "../../../../../api";

const AddContact = ({ isOpen, close, setReRender, reRender }) => {
   const [formData, setFormData] = useState({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      role: "",
      prefix: "050",
   });
   const [validation, setValidation] = useState({
      first_name: null,
      last_name: null,
      email: null,
      phone: null,
      role: null,
   });
   const handleChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });
   const clearValidation = () => {
      setValidation({
         first_name: null,
         last_name: null,
         email: null,
         phone: null,
         role: null,
      });
   };
   const onSubmit = async (e) => {
      let validationObj = {
         first_name: null,
         last_name: null,
         email: null,
         phone: null,
         role: null,
      };
      if (formData.first_name.length == 0) {
         validationObj = { ...validationObj, first_name: false };
      } else {
         validationObj = { ...validationObj, first_name: true };
      }
      if (formData.last_name.length == 0) {
         validationObj = { ...validationObj, last_name: false };
      } else {
         validationObj = { ...validationObj, last_name: true };
      }
      if (formData.role.length == 0) {
         validationObj = { ...validationObj, role: false };
      } else {
         validationObj = { ...validationObj, role: true };
      }
      if (formData.phone.length != 7) {
         validationObj = { ...validationObj, phone: false };
      } else {
         validationObj = { ...validationObj, phone: true };
      }
      const validateEmail = (email) => {
         var re = /\S+@\S+\.\S+/;
         return re.test(email);
      };
      if (!validateEmail(formData.email)) {
         validationObj = { ...validationObj, email: false };
         console.log("false");
      } else {
         validationObj = { ...validationObj, email: true };
         console.log("true");
      }
      setValidation(validationObj);
      if (Object.values(validation).some((v) => v == false || v == null))
         return;
      const res = await api.post("contacts", {
         firstName: formData.first_name,
         lastName: formData.last_name,
         email: formData.email,
         role: formData.role,
         phone: formData.prefix + formData.phone,
      });
      setReRender(!reRender);
      close();
   };
   return (
      <Modal
         show={isOpen}
         size="lg"
         dir="rtl"
         contentClassName={style.container}
         centered
      >
         <Card className={`text-right h-auto ${style.container}`}>
            <Card.Header as="h5" dir="rtl" className={style.header}>
               הוספת איש קשר
            </Card.Header>
            <Card.Body>
               <Form dir="rtl">
                  <Form.Row>
                     <Form.Group as={Col} className="col-6">
                        <Form.Label>שם פרטי</Form.Label>
                        <Form.Control
                           className={style.input}
                           onChange={handleChange}
                           name="first_name"
                        />
                        {validation.first_name == false && (
                           <p className={style.errorMsg}>שם פרטי לא תקין</p>
                        )}
                     </Form.Group>

                     <Form.Group as={Col}>
                        <Form.Label>שם משפחה</Form.Label>
                        <Form.Control
                           className={style.input}
                           onChange={handleChange}
                           name="last_name"
                        ></Form.Control>
                        {validation.last_name == false && (
                           <p className={style.errorMsg}>שם משפחה לא תקין</p>
                        )}
                     </Form.Group>
                     <Form.Group as={Col}>
                        <Form.Label>תפקיד</Form.Label>
                        <Form.Control
                           className={style.input}
                           onChange={handleChange}
                           name="role"
                        ></Form.Control>
                        {validation.role == false && (
                           <p className={style.errorMsg}>תפקיד לא תקין</p>
                        )}
                     </Form.Group>
                  </Form.Row>

                  <Form.Row>
                     <Form.Group as={Col} className="col-6">
                        <Form.Label>דוא"ל</Form.Label>
                        <Form.Control
                           className={style.input}
                           onChange={handleChange}
                           name="email"
                        />
                        {validation.email == false && (
                           <p className={style.errorMsg}>דוא"ל לא תקין</p>
                        )}
                     </Form.Group>

                     <Form.Group as={Col}>
                        <Form.Label>טלפון</Form.Label>
                        <Form.Control
                           className={style.input}
                           onChange={handleChange}
                           name="phone"
                        ></Form.Control>
                        {validation.phone == false && (
                           <p className={style.errorMsg}>טלפון לא תקין</p>
                        )}
                     </Form.Group>
                     <Form.Group as={Col} className={`col-1 ${style.prefix}`}>
                        <Form.Label> </Form.Label>
                        <Form.Control
                           as="select"
                           className={style.option}
                           onChange={handleChange}
                           name="prefix"
                        >
                           <option>050</option>
                           <option>052</option>
                           <option>053</option>
                           <option>054</option>
                        </Form.Control>
                     </Form.Group>
                  </Form.Row>
                  <div className={style.actions}>
                     <Button variant="success" onClick={onSubmit}>
                        שמור
                     </Button>
                     <Button
                        variant="danger"
                        onClick={() => {
                           close();
                           clearValidation();
                        }}
                     >
                        ביטול
                     </Button>
                  </div>
               </Form>
            </Card.Body>
         </Card>
      </Modal>
   );
};

export default AddContact;
