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
    const [phoneIsValid, setPhoneIsValid] = useState(true);
    const [firstNameIsValid, setFirstNameIsValid] = useState(true);
    const [lastNameIsValid, setLastNameIsValid] = useState(true);
    const [msg, setMsg] = useState({ msg: "" });
    const [usersData, setUsersData] = useState([]);

    useEffect(() => {
      getAllUsers();
   }, []);

   const getAllUsers = async () => {
      const res = await api.get("/users/");
      console.log('idan')
      console.log(res.data)
      setUsersData(res.data);
   };

    const [formData, setFormData] = useState({
        userType: "משתמש קצה",
        firstName: "",
        lastName: "",
        pre_Tel: "050",
        inTel: "",
        email: ""
    });

    const handleClose = () => {
      setPhoneIsValid(true);
      setEmailIsValid(true);
      setFirstNameIsValid(true);
      setLastNameIsValid(true);
      setPhoneIsValid(true);
      setShowAdd(false);
      //init form
      setFormData({
        userType: "משתמש קצה",
        firstName: "",
        lastName: "",
        pre_Tel: "050",
        inTel: "",
        email: ""
      });
    };

    const isEmailExist = () => {
        for(let user of usersData) {
        if(user.email === formData.email){
          return user;
        }
      }
      return null;
    }

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
      if (formData.firstName === "") {
        setFirstNameIsValid(false);
      } else setFirstNameIsValid(true);
      if (formData.lastName === "") {
        setLastNameIsValid(false);
      } else setLastNameIsValid(true);

      const TableObj = {
        committee: {},
        committeePosition: "",
        user: {}
      };
      const memberToAdd = isEmailExist();
      if (
        re.test(formData.email) &&
        ret.test(formData.inTel) &&
        formData.inTel.length === 7 &&
        (formData.firstName && formData.lastName) !=="" &&
        memberToAdd
        ) {
          debugger
        await api
          .post(`committees`, {
            userID: parseInt(memberToAdd.user_id),
            committeeName: commName,
            role: (memberToAdd.type === 'admin' || 'chairman')? "יושב ראש" : "חבר ועדה"
          })
          .then((res) => {
            setMsg({
              msg: "חבר הועדה התווסף בהצלחה",
              type: "success",
            });
            TableObj.committee = {
              committeeName: res.data.data[0].committee.committee_name,
              committeeInformation: res.data.data[0].committee.committee_information
            }
            TableObj.committeePosition = res.data.data[0].committeePosition;
            TableObj.user = memberToAdd;
            props.setCommitteeData([...props.committeeData, TableObj]);
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
                    value={formData.firstName}
                    onChange={onChange}
                    name="firstName"
                  />
                  {!firstNameIsValid && (
                    <p className="validate">*שם פרטי לא תקין</p>
                  )}
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridName">
                  <Form.Label>
                    שם משפחה<span className="validate">*</span>
                  </Form.Label>
                  <Form.Control
                    value={formData.lastName}
                    onChange={onChange}
                    name="lastName"
                  />
                  {!lastNameIsValid && (
                    <p className="validate">*שם משפחה לא תקין</p>
                  )}
                  </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridAppeaKind">
                  <Form.Label>תפקיד</Form.Label>
                  <Form.Control
                    as="select"
                    value={formData.userType}
                    onChange={onChange}
                    name="userType"
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
