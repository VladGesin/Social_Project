import React, { Fragment } from "react";
import { Form, Col, Button, Card } from "react-bootstrap";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import api from "../../../../api";
import { useParams } from "react-router-dom";
const CommAddMember = () => {
    const [showAdd, setShowAdd] = useState(false);

    const handleShowAdd = () => setShowAdd(true);

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
        <Button variant="success float-left" style={{marginLeft: "1em"}} onClick={handleShowAdd} dir="rtl">
        הוספת חבר ועדה
        </Button>
            <Modal
        show={showAdd}
        onHide={handleClose}
        size="lg"
        dir="rtl"
      >
        <Card className="text-right h-auto container" height="fit-content !important">
          <Card.Header as="h5" dir="rtl">
            הוספת חבר ועדה  
          </Card.Header>
          <Card.Body>
            <Form dir="rtl">
              <Form.Row>
              <Form.Group as={Col} controlId="formGridName">
                  <Form.Label>
                    שם פרטי<span className="validate">*</span>
                  </Form.Label>
                  <Form.Control
                    value={formData.name}
                    onChange={onChange}
                    name="name"
                  />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridName">
                  <Form.Label>
                    שם משפחה<span className="validate">*</span>
                  </Form.Label>
                  <Form.Control
                    value={formData.name}
                    onChange={onChange}
                    name="name"
                  />
                  </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridAppeaKind">
                  <Form.Label>תפקיד</Form.Label>
                  <Form.Control
                    as="select"
                    value={formData.typeOfAppeal}
                    onChange={onChange}
                    name="typeOfAppeal"
                  >
                    <option>משתמש קצה</option>
                    <option>חבר ועדה</option>
                    <option>יושב ראש</option>
                    <option>מנהל</option>
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

                <Form.Row>
                <Form.Group as={Col} controlId="formGridPhone">
                  <Form.Label>
                    טלפון<span className="validate">*</span>
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
              </Form.Row>

              <Button variant="success" type="submit" onClick={handleSubmit}>
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
    )
}

export default CommAddMember
