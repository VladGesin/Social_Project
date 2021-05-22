import React, { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import style from "./MeetingSummary.module.scss";
import { Form, Col, Button, Card } from "react-bootstrap";
import Context from "../../../store/Context";

const MeetingSummary = () => {
  const [isModelOpen, setIsOpenModel] = useState(false);
  const context = useContext(Context);
  const [form, setForm] = useState({title:"", description: "", file: ""});

   // Todo change card type according to user type
   // approved/ denied functions
   // filtering card list
   // download file button

  const onInputChange = (e) => {
   setForm({ ...form, [e.target.name]: e.target.value });
};

const onFileSelected = (e) => {
   const file = new FormData();
   file.append(
      "myFile",
      e.target.files[0],
      e.target.files[0].name
    );
   setForm({ ...form, file });
};

const handleClose = () => {
   setForm({
      title:"",
       description: "",
        file: ""
   });
   setIsOpenModel(false);
};

const onSummarySubmit = async (e) => {
   e.preventDefault();
   if (form.title !== '' && form.description !== '' && form.file !== '') {
      // upload the summary
      const ext = form.file.get("myFile").name.split(".")[1];
      if (ext === 'txt') {
         console.log('ok')
         const meetingSummaryReq = {
            title: form.title,
            description: form.description,
            createTime: Date(),
            approved: false,
            approvedUser: context.userState.id,
            file: form.file
         };
         // TODO send object with post
      }
      else {
         // Todo setMsg error
      }
   }   
}

  return (
    <div className={style.container}>
      <div className={style.topMenu}>
        <Button
          variant="success"
          dir="rtl"
          onClick={() => {
            setIsOpenModel(true);
          }}
        >
          העלת סיכום שיחה
        </Button>

        <select className={style.drop}>
          <option>סיכום שיחות</option>
          <option>שיחות ממתינות לאישור</option>
        </select>
      </div>
      <Modal
        show={isModelOpen}
        onHide={handleClose}
        size="lg"
        dir="rtl"
      >
        <Card
          className="text-right h-auto container"
          height="fit-content !important"
        >
          <Card.Header as="h5" dir="rtl">
            העלאת סיכום שיחה
          </Card.Header>
          <Card.Body>
            <Form dir="rtl">
              <Form.Row>
                <Form.Group as={Col} controlId="formGridContactMail">
                  <Form.Label>
                    נושא<span className="validate">*</span>
                  </Form.Label>
                  <Form.Control                    
                    placeholder="נושא סיכום הישיבה"
                    value= {form.title}
                    name="title"
                    dir="rtl"
                    onChange = {onInputChange}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridContactMail">
                  <Form.Label>
                    תיאור<span className="validate">*</span>
                  </Form.Label>
                  <Form.Control
                    placeholder="תיאור סיכום הישיבה"
                    value= {form.description}
                    name="description"
                    dir="rtl"
                    onChange = {onInputChange}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridContactMail">
                   <input type="file" onChange={onFileSelected}/>
                  {/* <Form.File label="בחר קובץ" custom /> */}
                  <Form.Label style={{marginRight: "2rem"}}>                     
                  </Form.Label>
                </Form.Group>
              </Form.Row>
              <Button variant="success" type="submit" onClick = {onSummarySubmit}>
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
      {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((c) => (
        <div className={style.cardContainer}>
          <Card
            bg="Light"
            key={1}
            text="dark"
            style={{ width: "18rem" }}
            className="mr-2 mb-2"
          >
            <Card.Header
              style={{
                textAlign: "right",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "2rem",
              }}
            >
              <i className="fas fa-check-circle"></i>
              <span>שם הועדה</span>
            </Card.Header>
            <Card.Body>
              <Card.Title style={{ textAlign: "right" }}>
                כותרת סיכום הוועדה{" "}
                <p className="text-muted" style={{ fontSize: "0.8rem" }}>
                  14/05/21
                </p>
              </Card.Title>
              <Card.Text style={{ textAlign: "right" }}>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>
            <div className={style.btnContainer}>
              <Button>הורד</Button>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default MeetingSummary;
