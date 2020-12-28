import React, { Fragment } from "react";
import { Form, Col, Button, Card } from "react-bootstrap";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./commApealModal.css";
import api from "../../../../api";
import MsgBox from "../../SecretaryWin/MsgBox/MsgBox";
import { useParams } from "react-router-dom";

const CommApealModal = () => {
  const commName = useParams().type;
  const [show, setShow] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [phoneIsValid, setPhoneIsValid] = useState(true);
  const [contentIsValid, setContentIsValid] = useState(true);
  const [subjectIsValid, setSubjectIsValid] = useState(true);
  const [nameIsValid, setNameIsValid] = useState(true);
  const [msg, setMsg] = useState({ msg: "" });

  const [formData, setFormData] = useState({
    commName: commName,
    typeOfAppeal: "בקשה",
    urgency: "רגיל",
    subject: "",
    content: "",
    name: "",
    pre_Tel: "050",
    inTel: "",
    email: "",
  });

  const handleClose = () => {
    setPhoneIsValid(true);
    setEmailIsValid(true);
    setNameIsValid(true);
    setPhoneIsValid(true);
    setContentIsValid(true);
    setSubjectIsValid(true);
    setShow(false);
    //init form
    setFormData({
      commName: commName,
      typeOfAppeal: "בקשה",
      urgency: "רגיל",
      subject: "",
      content: "",
      name: "",
      pre_Tel: "050",
      inTel: "",
      email: "",
    });
  };

  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    var re = /\S+@\S+\.\S+/;
    var ret = /^[0-9\b]+$/;
    if (!re.test(formData.email)) {
      setEmailIsValid(false);
    } else setEmailIsValid(true);
    if (!ret.test(formData.inTel) || formData.inTel.length < 7) {
      setPhoneIsValid(false);
    } else setPhoneIsValid(true);
    if (formData.subject === "") {
      setSubjectIsValid(false);
    } else setSubjectIsValid(true);
    if (formData.content === "") {
      setContentIsValid(false);
    } else setContentIsValid(true);
    if (formData.name === "") {
      setNameIsValid(false);
    } else setNameIsValid(true);

    const reqObj = {
      committeeName: commName,
      type: formData.typeOfAppeal,
      priority: formData.urgency,
      subject: formData.subject,
      content: formData.content,
      full_name: formData.name,
      phone_number: formData.pre_Tel + formData.inTel,
      email: formData.email,
    };

    if (
      re.test(formData.email) &&
      ret.test(formData.inTel) &&
      formData.inTel.length === 7 &&
      (formData.subject && formData.content && formData.name) !==""
    ) {
      await api
        .post(`inbox`, reqObj)
        .then((res) => {
          setMsg({
            msg: "פנייתך התקבלה. מספר הפנייה: " + res.data.inbox_id,
            type: "success",
          });
        })
        .catch((error) => {
          console.log(error);
        });

      handleClose();
    }
  };

  const handleTellength = (e) => {
    if (e.target.value.length < 8) onChange(e);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
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
      <Button variant="primary float-left" onClick={handleShow} dir="rtl">
        פניה לוועדה
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        dir="rtl"
      >
        <Card className="text-right h-auto container" height="fit-content !important">
          <Card.Header as="h5" dir="rtl">
            פניה ל{commName}  
          </Card.Header>
          <Card.Body>
            <Form dir="rtl">
              <Form.Row>
                <Form.Group as={Col} controlId="formGridAppeaKind">
                  <Form.Label>סוג הפנייה</Form.Label>
                  <Form.Control
                    as="select"
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
                <Form.Label>
                  נושא הפנייה<span className="validate">*</span>
                </Form.Label>
                <Form.Control
                  placeholder="נושא הפנייה"
                  value={formData.subject}
                  onChange={onChange}
                  name="subject"
                />
                {!subjectIsValid && <p className="validate">*שדה חובה</p>}
              </Form.Group>

              <Form.Group controlId="formGridAppealDetails">
                <Form.Label>
                  פרטי הפנייה<span className="validate">*</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="פירוט הפנייה כולל את כל גוף הפנייה ותוכן אליו תרצה/י שיתייחסו בפנייה. נא לכתוב כמה שיותר פרטים וכמה שיותר ברור על מנת שנוכל לסייע במהירות "
                  value={formData.content}
                  onChange={onChange}
                  name="content"
                />
                {!contentIsValid && <p className="validate">*שדה חובה</p>}
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridName">
                  <Form.Label>
                    שם איש קשר<span className="validate">*</span>
                  </Form.Label>
                  <Form.Control
                    value={formData.name}
                    onChange={onChange}
                    name="name"
                  />
                  {!nameIsValid && <p className="validate">*שדה חובה</p>}
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPhone">
                  <Form.Label>
                    טלפון ליצירת קשר<span className="validate">*</span>
                  </Form.Label>
                  <Form.Control
                    value={formData.inTel}
                    onChange={handleTellength}
                    name="inTel"
                    type="number"
                  />
                  {!phoneIsValid && (
                    <p className="validate">*מספר הטלפון אינו תקין</p>
                  )}
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPhone">
                  <Form.Label style={{ opacity: "0" }}>.</Form.Label>
                  <Form.Control
                    as="select"
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
