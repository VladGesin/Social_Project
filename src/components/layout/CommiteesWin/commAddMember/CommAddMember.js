import React, { Fragment, useEffect } from "react";
import { Form, Col, Button, Card } from "react-bootstrap";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import api from "../../../../api";
import MsgBox from "../../SecretaryWin/MsgBox/MsgBox";
import { useParams } from "react-router-dom";
const CommAddMember = (props) => {
   const commName = useParams().type;
   const [showAdd, setShowAdd] = useState(false);
   const [emailIsValid, setEmailIsValid] = useState(true);
   const [msg, setMsg] = useState({ msg: "" });
   const [formData, setFormData] = useState({
      email: "",
   });   

   const handleClose = () => {
      setEmailIsValid(true);
      setShowAdd(false);
      //init form
      setFormData({
         email: "",
      });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      var re = /\S+@\S+\.\S+/;
      var ret = /^[0-9\b]+$/;
      if (!re.test(formData.email)) {
         setEmailIsValid(false);
      } else setEmailIsValid(true);

         if(re.test(formData.email)) {
         await api
            .post(`committees`, {
               email: formData.email,
               committeeName: commName,
               role: "חבר ועדה"
            })
            .then((res) => {               
               setMsg({
                  msg: "חבר הועדה התווסף בהצלחה",
                  type: "success",
               });
               props.setReRender(curr => !curr);
            })
            .catch((error) => {
               if(error.response.status === 500) {
                  setMsg({
                     msg: "המשתמש כבר קיים בועדה!"                  
                  });
               }
               else if (error.response.status === 404){
                  setMsg({
                     msg: "דואר אלקטרוני שגוי!"                  
                  });
               }
            });
            handleClose();
         }
      };
         // else {
         //    setMsg({
         //       msg: "דואר אלקטרוני לא קיים"});
         //    }

   const onChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleShowAdd = () => setShowAdd(true);

   return (
      <Fragment>
         {msg.msg !== "" && (
            <MsgBox
               name={msg.name}
               msg={msg.msg}
               clear={() => {
                  setMsg({ msg: "" });
               }}
               type={msg.type}
            />
         )}
         {props.isAllowed && <Button
            variant="success float-left"
            style={{ marginLeft: "1em" }}
            onClick={handleShowAdd}
            dir="rtl"
         >
            הוספת חבר ועדה
         </Button>}
         <Modal show={showAdd} onHide={handleClose} size="lg" dir="rtl">
            <Card
               className="text-right h-auto container"
               height="fit-content !important"
               style={{padding:"inherit"}}
            >
               <Card.Header as="h5" dir="rtl">
                  הוספת חבר ועדה
               </Card.Header>
               <Card.Body>
                  <Form dir="rtl">
                     <Form.Row>
                        <Form.Group as={Col} controlId="formGridContactMail">
                           <Form.Label>
                              דואר אלקטרוני<span className="validate">*</span>
                           </Form.Label>
                           <Form.Control
                              type="email"
                              placeholder="name@example.com"
                              value={formData.email}
                              onChange={onChange}
                              name="email"
                              dir="ltr"
                           />
                           {!emailIsValid && (
                              <p className="validate">
                                 *כתובת דואר אלקטרוני לא תקינה
                              </p>
                           )}
                        </Form.Group>
                     </Form.Row>
                     <Button
                        variant="success"
                        type="submit"
                        onClick={handleSubmit}
                     >
                        הוסף
                     </Button>
                     <Button
                        variant="secondary"
                        onClick={handleClose}
                        style={{ padding: "6px 12px" }}
                        style={{ margin: "6px" }}
                     >
                        ביטול
                     </Button>
                  </Form>
               </Card.Body>
            </Card>
         </Modal>
      </Fragment>
   );
};

export default CommAddMember;
