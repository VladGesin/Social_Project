import React, { useState, Fragment } from "react";
import Accordion from "react-bootstrap/Accordion";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

import RestartModal from './modals/restartModal'
import NewuserModal from './modals/newuserModal'
import DeleteuserModal from './modals/deleteuserModal'
import DatacommiteesModal from "./modals/datacommiteesModal";
import ManageparticipentsModal from './modals/manageparticipentsModal'
import Commitemap from './modals/commitemap'


const SecreturyWin = () => {
  const [show, setShow] = useState(false);
  const [lgShow1, setLgShow1] = useState(false); //ניהול משתמשים - איפוס סיסמא
  const [lgShow2, setLgShow2] = useState(false); // ניהול משתמשים - יצירת משתמש חדש
  const [lgShow3, setLgShow3] = useState(false); //ניהול משתמשים - מחיקת משתמש
  const [lgShow4, setLgShow4] = useState(false); //ניהול משתמשים - מחיקת משתמשים
  const [lgShow5, setLgShow5] = useState(false); //ניהול משתמשים - סטטיסטיקות (כמות משתמשים שנכנסו וכו
  const [lgShow6, setLgShow6] = useState(false); // ועדות - ועדות בהן אני חבר
  const [showTest, setShowTest]= useState(false);


  
  return (
    <Fragment>
    <Accordion>
      <Card >
        <Card.Header>
          <Accordion.Toggle as={Button} eventKey="0" dir="rtl">
            ניהול משתמשים
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body >
            <Button onClick={() => setLgShow1(true)}>איפוס סיסמא</Button>{" "}
            <Button onClick={() => setLgShow2(true)}>יצירת משתמש חדש</Button>
            <p></p>
            <Button onClick={() => setLgShow3(true)}>מחיקת משתמש</Button>{" "}
            <Button onClick={() => setLgShow4(true)}>סטטיסטיקות</Button>
       
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} onClick ={()=>setShowTest(!showTest)}eventKey="1" dir="rtl">
            ועדות בהן אני חבר
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="1">
          <Card.Body>
            {showTest ? <Commitemap></Commitemap> : ''}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} eventKey="2" dir="rtl">
            {" "}
            ניהול הועדה שלי{" "}
          </Accordion.Toggle>
        </Card.Header>
        <Card.Body>
          <Accordion.Collapse eventKey="2">
          <Container responsive="lg" dir="rtl">
              <Row dir="rtl" >
                
                  <Col>#</Col>
                  <Col>שם הועדה</Col>
                  <Col>ניהול חברי הועדה</Col>
                  <Col>נתונים לצפייה</Col>
                
              </Row>
              <Row>
               
                  <Col>1</Col>
                  <Col>חינוך</Col>
                  <Col>
                    <Button onClick={() => setLgShow5(true)}>
                      לחץ לניהול חברי הועדה
                    </Button>
                  </Col>
                  <Col>
                    <Button onClick={() => setLgShow6(true)}>
                      לחץ לצפייה בנתונים
                    </Button>
                  </Col>
                </Row>
             </Container>
           
          </Accordion.Collapse>
        </Card.Body>
      </Card>
    </Accordion>
    <RestartModal show={lgShow1} onHide = {setLgShow1} ></RestartModal> 
    <NewuserModal show={lgShow2} onHide = {setLgShow2} ></NewuserModal>
    <DeleteuserModal show={lgShow3} onHide = {setLgShow3} ></DeleteuserModal>
    <DatacommiteesModal show={lgShow6} onHide = {setLgShow6} ></DatacommiteesModal>
    <ManageparticipentsModal show={lgShow5} onHide = {setLgShow5} ></ManageparticipentsModal>

  </Fragment>
  );
};

export default SecreturyWin;
