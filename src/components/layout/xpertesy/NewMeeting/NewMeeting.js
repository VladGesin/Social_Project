import React, { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import EmailList from "./EmailList";
import api from "../../../../api";
import style from "./EmailList.module.scss";
const NewMeeting = () => {
   const [formData, setFormData] = useState({
      roomName: "",
      hostName: "",
      startDate: "",
      startTime: "",
      participants: "",
   });
   const [participants, setParticipants] = useState([]);
   const [messages, setMessages] = useState([]);
   const urlRef = useRef(null);

   const onChangeHandler = (e) => {
      setFormData({
         ...formData,
         [e.currentTarget.name]: e.currentTarget.value,
      });
   };

   const addParticipantHandler = (e) => {
      if (!validateEmail(formData.participants)) {
         setMessages([
            ...messages,
            { msg: "האמייל שהוזן אינו חוקי", type: "danger" },
         ]);
         setTimeout(() => {
            setMessages((cur) => {
               const msgs = cur.slice(1);
               return msgs;
            });
         }, 3000);

         return;
      }
      if (participants.includes(formData.participants.toLocaleLowerCase()))
         return;
      setParticipants([
         ...participants,
         formData.participants.toLocaleLowerCase(),
      ]);
      setFormData({
         ...formData,
         participants: "",
      });
   };

   const deleteParticipant = (email) => {
      const newEmailList = participants.filter((e) => e !== email);
      setParticipants(newEmailList);
   };

   const validateEmail = (email) => {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
   };
   const validateForm = () => {
      if (
         new Date(`${formData.startDate}:${formData.startTime}`) < new Date()
      ) {
         setMessages([
            ...messages,
            { msg: "אין אפשרות ליצור פגישה בעבר", type: "danger" },
         ]);
         setTimeout(() => {
            setMessages((cur) => {
               const msgs = cur.slice(1);
               return msgs;
            });
         }, 3000);
         return false;
      }
      if (participants.length > 4 || participants.length < 2) {
         setMessages([
            ...messages,
            { msg: "הזמן 2-4 משתתפים", type: "danger" },
         ]);
         setTimeout(() => {
            setMessages((cur) => {
               const msgs = cur.slice(1);
               return msgs;
            });
         }, 3000);

         return false;
      }
      return true;
   };

   const createNewMeeting = async (data) => {
      try {
         const res = await api.post("/xpertesy/createroom", data);
         return res;
      } catch (e) {
         if (e.response.status == 500) {
            setMessages([
               ...messages,
               { msg: `כתובת המייל לא קיימת במערכת`, type: "warning" },
            ]);
         }
         console.log(e);
      }
   };

   const onSubmitHandler = async (e) => {
      e.preventDefault();
      if (validateForm()) {
         const req = {
            roomName: formData.roomName,
            hostName: formData.hostName,
            date: formData.startDate + " " + formData.startTime + ":00",
            participants: participants,
         };
         try {
            const res = await createNewMeeting(req);
            const url = res.data.link;

            setMessages([
               ...messages,
               { msg: `פגישה נוצרה בהצלחה`, link: url, type: "success" },
            ]);

            setFormData({
               roomName: "",
               hostName: "",
               startDate: "",
               startTime: "",
               participants: "",
            });
            setParticipants([]);
         } catch (e) {
            console.log(e);
         }
      }
   };

   function copyToClipboard(e) {
      urlRef.current.select();
      document.execCommand("copy");
      e.target.focus();
   }

   return (
      <div
         style={{
            backgroundColor: "#f6fcfc",
            margin: "2rem",
            padding: "2rem",
            border: "1px solid #ccc",
            height: "fit-content",
         }}
         className={style.pageContainer}
      >
         <h3 className={`text-right  mr-5`}>יצירת פגישה חדשה</h3>
         {messages.length > 0 && (
            <Container>
               {messages.map((e) => (
                  <Alert
                     show={messages.length > 0}
                     className="text-center"
                     variant={e.type}
                     key={e}
                  >
                     {e.msg}
                     {e.link && (
                        <div>
                           <textarea
                              ref={urlRef}
                              defaultValue={e.link}
                              style={{
                                 width: "80%",
                                 display: "block",
                                 margin: "1rem auto",
                                 textAlign: "center",
                                 resize: "none",
                              }}
                           />
                           <Button
                              className="submitBtn"
                              variant="success"
                              onClick={copyToClipboard}
                           >
                              העתק קישור
                           </Button>
                        </div>
                     )}
                  </Alert>
               ))}
            </Container>
         )}
         <Form
            className={`p-5 ${style.formContainer} `}
            dir="rtl"
            onSubmit={onSubmitHandler}
         >
            <Form.Group as={Row} className={`pr-3 ${style.section}`}>
               <Form.Label column sm="1" className="text-right">
                  שם חדר
               </Form.Label>
               <Col sm="2">
                  <Form.Control
                     value={formData.roomName}
                     name="roomName"
                     onChange={onChangeHandler}
                     required
                  />
               </Col>
            </Form.Group>
            <Form.Group as={Row} className={`pr-3 ${style.section}`}>
               <Form.Label column sm="1" className="text-right">
                  שם מארח
               </Form.Label>
               <Col sm="2">
                  <Form.Control
                     value={formData.hostName}
                     name="hostName"
                     onChange={onChangeHandler}
                     required
                  />
               </Col>
            </Form.Group>
            <Form.Group as={Row} className={`pr-3 ${style.section}`}>
               <Form.Label column sm="1" className="text-right">
                  תאריך התחלה
               </Form.Label>
               <Col sm="2">
                  <input
                     required
                     value={formData.startDate}
                     name="startDate"
                     onChange={onChangeHandler}
                     min={new Date().toISOString().slice(0, 10)}
                     type="date"
                     style={{
                        width: "100%",
                        padding: " .375rem .75rem",
                        borderRadius: ".25rem",
                        border: "1px solid #ced4da",
                        color: "#495057",
                        outline: "none",
                     }}
                  />
               </Col>
               <Form.Label column sm="1" className="text-right">
                  שעת התחלה
               </Form.Label>
               <Col sm="2">
                  <input
                     required
                     value={formData.startTime}
                     name="startTime"
                     onChange={onChangeHandler}
                     type="time"
                     style={{
                        width: "100%",
                        padding: " .375rem .75rem",
                        borderRadius: ".25rem",
                        border: "1px solid #ced4da",
                        color: "#495057",
                        outline: "none",
                     }}
                  />
               </Col>
            </Form.Group>
            <Form.Group as={Row} className={`pr-3 ${style.section}`}>
               <Form.Label column sm="1" className="text-right">
                  הזמנת משתתפים
               </Form.Label>
               <Col sm="4" md="3">
                  <div style={{ display: "flex" }}>
                     <Form.Control
                        value={formData.participants}
                        name="participants"
                        onChange={onChangeHandler}
                        type="email"
                     />
                     <Button
                        className="mr-2"
                        variant="outline-success"
                        onClick={addParticipantHandler}
                     >
                        הוסף
                     </Button>
                  </div>
               </Col>
            </Form.Group>
            <EmailList
               emails={participants}
               deleteParticipant={deleteParticipant}
            />
            <div className={style.btnContainer}>
               <Button className="submitBtn" variant="success" type="submit">
                  יצירת פגישה
               </Button>
            </div>
         </Form>
      </div>
   );
};

export default NewMeeting;
