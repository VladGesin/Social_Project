import React, { Fragment } from "react";
import { Form, Col, Button, Card } from "react-bootstrap";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./commApealModal.css";
import api from "../../../../api";

const CommApealModal = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setPhoneIsValid(true);
    setEmailIsValid(true);
    setShow(false);
    setFormData("בקשה", "רגיל", "", "", "", "050", "", "");
  };
  const handleShow = () => setShow(true);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [phoneIsValid, setPhoneIsValid] = useState(true);
  const [formData, setFormData] = useState({
    commName: props.name,
    typeOfAppeal: "בקשה",
    urgency: "רגיל",
    subject: "",
    content: "",
    name: "",
    pre_Tel: "050",
    inTel: "",
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData.email + formData.inTel);
    var re = /\S+@\S+\.\S+/;
    var ret = /^[0-9\b]+$/;
    if (!re.test(formData.email)) {
      setEmailIsValid(false);
    } else setEmailIsValid(true);
    if (!ret.test(formData.inTel) || formData.inTel.length < 7) {
      setPhoneIsValid(false);
    } else setPhoneIsValid(true);

    console.log(
      "this print from submit:" +
        "\n name of comm:" +
        formData.commName +
        "\ntypeOfAppeal: " +
        formData.typeOfAppeal +
        "\n urgency:" +
        formData.urgency +
        "\n subject: " +
        formData.subject +
        "\n content: " +
        formData.content +
        "\n name: " +
        formData.name +
        "\n pre_Tel: " +
        formData.pre_Tel +
        "\n in tel" +
        formData.inTel +
        "\n email:" +
        formData.email
    );

    /* 
    const validateEmail = (email) => {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
   };
    const validatePhone = (inTel) =>{
      var ret = /^[0-9\b]+$/;
      return ret.test(inTel);
   }
   let mailIsValid = validateEmail(formData.email);
   let phoneIsValid = validatePhone(formData.inTel);
   if(!mailIsValid)
      setemailIsValid(false);
   else
      setemailIsValid(true);
  if(!phoneIsValid)
      setPhoneIsValid(false)
  else
      setPhoneIsValid(true);
      */
  };

  const handleTellength = (e) => {
    if (e.target.value.length < 8) onChange(e);
  };

  const onChange = (e) => {
    setFormData({ formData, [e.target.name]: e.target.value });
  };
  return (
    <Fragment>
      <Button variant="primary float-left" onClick={handleShow} dir="rtl">
        פניה לוועדה
      </Button>
      <Modal show={show} onHide={handleClose} size="lg" dir="rtl" height="fit-content !important">
        <Card className="text-right h-auto">
          <Card.Header as="h5" dir="rtl">
            פניה ל{props.name}
          </Card.Header>
          <Card.Body>
            <Form dir="rtl">
              <Form.Row>
                <Form.Group as={Col} controlId="formGridAppeaKind">
                  <Form.Label>סוג הפנייה</Form.Label>
                  <Form.Control
                    as="select"
                    defaultValue="בקשה"
                    value={formData.typeOfAppeal}
                    onChange={onChange}
                    name="typeOfAppeal"
                  >
                    <option>בקשה</option>
                    <option>הצעה</option>
                    <option>תלונה</option>
                    <option>דיווח</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridAppealUrgent">
                  <Form.Label>דחיפות</Form.Label>
                  <Form.Control
                    as="select"
                    defaultValue="רגיל"
                    value={formData.urgency}
                    onChange={onChange}
                    name="urgency"
                  >
                    <option>רגיל</option>
                    <option>דחוף</option>
                    <option>דחוף ביותר</option>
                    <option>בהול</option>
                  </Form.Control>
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="formGridAppealSubject">
                <Form.Label>נושא הפנייה</Form.Label>
                <Form.Control
                  placeholder="נושא הפנייה"
                  value={formData.subject}
                  onChange={onChange}
                  name="subject"
                />
              </Form.Group>

              <Form.Group controlId="formGridAppealDetails">
                <Form.Label>פרטי הפנייה</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="פירוט הפנייה כולל את כל גוף הפנייה ותוכן אליו תרצה/י שיתייחסו בפנייה. נא לכתוב כמה שיותר פרטים וכמה שיותר ברור על מנת שנוכל לסייע במהירות "
                  value={formData.content}
                  onChange={onChange}
                  name="content"
                />
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridName">
                  <Form.Label>שם איש קשר</Form.Label>
                  <Form.Control
                    value={formData.name}
                    onChange={onChange}
                    name="name"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPhone">
                  <Form.Label>טלפון ליצירת קשר</Form.Label>
                  <Form.Control
                    value={formData.inTel}
                    onChange={handleTellength}
                    name="inTel"
                  />
                  {!phoneIsValid && (
                    <p className="validate">*מספר הטלפון אינו תקין</p>
                  )}
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPhone">
                  <Form.Label style={{ opacity: "0" }}>.</Form.Label>
                  <Form.Control
                    as="select"
                    defaultValue="050"
                    value={formData.pre_Tel}
                    onChange={onChange}
                    name="pre_Tel"
                  >
                    <option>050</option>
                    <option>051</option>
                    <option>052</option>
                    <option>053</option>
                    <option>054</option>
                    <option>055</option>
                    <option>058</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridContactMail">
                  <Form.Label>דואר אלקטרוני</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={onChange}
                    name="email"
                  />
                  {!emailIsValid && (
                    <p className="validate">*כתובת דואר אלקטרוני לא תקינה</p>
                  )}
                </Form.Group>
              </Form.Row>

              <Button variant="primary" type="submit" onClick={handleSubmit}>
                שליחה
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

export default CommApealModal;
