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
   const [usersData, setUsersData] = useState([]);

   useEffect(() => {
      getAllUsers();
   }, []);

   const getAllUsers = async () => {
      const res = await api.get("/users/");
      console.log("idan");
      console.log(res.data);
      setUsersData(res.data);
   };

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

   const isEmailExist = () => {
      for (let user of usersData) {
         if (user.email === formData.email) {
            return user;
         }
      }
      return null;
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      var re = /\S+@\S+\.\S+/;
      var ret = /^[0-9\b]+$/;
      if (!re.test(formData.email)) {
         setEmailIsValid(false);
      } else setEmailIsValid(true);

      const tableObject = {
         committee: {},
         committeePosition: "",
         user: {},
      };
      const memberToAdd = isEmailExist();
      if (
         re.test(formData.email) &&
         memberToAdd
      ) {
         await api
            .post(`committees`, {
               userID: parseInt(memberToAdd.user_id),
               committeeName: commName,
               role:
                  memberToAdd.type === "admin" || "chairman"
                     ? "יושב ראש"
                     : "חבר ועדה",
            })
            .then((res) => {
               setMsg({
                  msg: "חבר הועדה התווסף בהצלחה",
                  type: "success",
               });
               props.setReRender(!props.reRender);
            })
            .catch((error) => {
               console.log(error);
            });
         }
         else {
            setMsg({
               msg: "דואר אלקטרוני לא קיים"});
            }
            handleClose();
   };

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
