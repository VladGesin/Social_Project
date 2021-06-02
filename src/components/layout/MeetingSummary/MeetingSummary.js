import React, { useState, useContext, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import style from "./MeetingSummary.module.scss";
import { Form, Col, Button, Card } from "react-bootstrap";
import Context from "../../../store/Context";
import { v4 as uuidv4 } from 'uuid';

const MeetingSummary = () => {
  const [isModelOpen, setIsOpenModel] = useState(false);
  const context = useContext(Context);
  const [form, setForm] = useState({title:"", description: "", file: ""});
  const [selectedCommittee, setSelectedCommittee] = useState();
  const [selectedRadio, setSelectedRadio] = useState('waiting'); // waiting  , approved, denied
  const [filesList, setFilesList] = useState([{key: 1, approved: true, committeeName: 'א'}, {key: 2, approved: null, committeeName: 'א'}, {key: 3, approved: false, committeeName: 'א'}, {key: 4, approved: true, committeeName: 'ב'}, {key: 5, approved: null, committeeName: 'ב'},
  {key: 6, approved: undefined, committeeName: 'ב'}, {key: 7, approved: false, committeeName: 'ב'}, {key: 8, approved: false, committeeName: 'ב'}, {key: 9, approved: true ,committeeName: 'ב'}, {key: 10, approved: true, committeeName: 'ב'},
  {key: 11, approved: null, committeeName: 'ג'}, {key: 12, approved: true, committeeName: 'ג'}]);
  

  useEffect(() => {
    setFilesList(filesList.map(f => {return{
      ...f, approvedRadio: f.approved === true? 'approved' : f.approved === false? 'denied' : 'waiting'
    }}));
    const uniqueCommittees = getUniqueCommitteeNames();
    setSelectedCommittee(uniqueCommittees[0]);
    console.log(filesList)
  }, [])
  // Todo change card type according to user type
   // approved/ denied functions
   // filtering card list by committee
   // download file button

   const fileDownload = (file) => {
     // file download
     console.log('donwload')
     console.log(file)
   };

  const onSummaryDecision = (card, approved) => {
      // change specific card status with index = key 
      const isAccept = false;

  }; 

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

const onUploadSummarySubmit = async (e) => {
   e.preventDefault();
   if (form.title !== '' && form.description !== '' && form.file !== '') {
      // upload the summary
      const ext = form.file.get("myFile").name.split(".")[1];
      if (ext === 'doc' || ext === 'docx' || ext ==='pdf') {
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

const getUniqueCommitteeNames = () => {
  const committeeNames = filesList.map(f => f.committeeName);
  return Array.from(new Set(committeeNames));
};

const renderSelectMenu = () => {
  const uniqeCommittees = getUniqueCommitteeNames();
  return uniqeCommittees.map(f => <option key={uuidv4()}>{f}</option>);
};

const onSelectChange = (e) => {
  setSelectedCommittee(e.target.value);
};

const onRadioChange = (e) => {
  setSelectedRadio(e.target.value);
};

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
        <div className={style.filters}>
        <div className={style.radio}>
        <label>נדחה</label>
        <input type="radio" name="status" value='denied' onChange={onRadioChange} checked={selectedRadio === 'denied'}/>
        <label>אושר</label>
        <input type="radio" name="status" value='approved' onChange={onRadioChange} checked={selectedRadio === 'approved'}/>
        <label>ממתין לאישור</label>
        <input type="radio" name="status" value='waiting' onChange={onRadioChange} checked={selectedRadio === 'waiting'}/>
        </div>

        <select className={style.drop} onChange={onSelectChange} value={selectedCommittee}>
          {renderSelectMenu()}
        </select>
        </div>

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
              <Button variant="success" type="submit" onClick = {onUploadSummarySubmit}>
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
      {filesList.map((c) => ((c.committeeName === selectedCommittee && c.approvedRadio === selectedRadio) && 
      <div className={style.cardContainer} key={c.key}>
          <Card
            bg="Light"
            key={c.key}
            text="dark"
            style={{ width: "18rem" , height: "18rem"}}
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
              {c.approved? <i className="fas fa-check-circle"></i>: c.approved === null || c.approved == undefined? <i className="fas fa-spinner"></i> : <i className="fas fa-window-close"></i>}
              <span>{c.committeeName}</span>
            </Card.Header>
            <Card.Body>
              <Card.Title style={{ textAlign: "right", direction: "rtl" }}>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                כותרת סיכום הוועדה{" "}
                { c.approved && <div onClick={fileDownload(c)}>
                  <i className="fas fa-download"></i>
                </div>}
                </div>
                <p className="text-muted" style={{ fontSize: "0.8rem" }}>
                  14/05/21
                </p>
              </Card.Title>
              <Card.Text style={{ textAlign: "right" }}>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>
            {(c.approved === null || c.approved === undefined) && <div className={style.btnContainer} style={{display: "flex", justifyContent: "space-evenly" }}>
              <Button variant="danger" onClick={onSummaryDecision(c, false)}>דחה</Button>
              <Button variant="success" onClick={onSummaryDecision(c, true)}>אשר</Button>
            </div>}
          </Card>
        </div>
      ))}
    </div>
  );
};

export default MeetingSummary;
