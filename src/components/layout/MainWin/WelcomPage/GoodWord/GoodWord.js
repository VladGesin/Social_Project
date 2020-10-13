import React, { Fragment } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./GoodWord.css";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";


const GoodWord = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <Fragment >
      <Card className="text-right">
        <Card.Header as="h5">מילה טובה</Card.Header>
        <Card.Body>
          <Card.Title>כותרת המבזק</Card.Title>
          <Card.Text>
           מילה טובה תרוץ כאן
                      </Card.Text>

          <Button variant="primary" onClick={handleShow}>
            הכנס מילה טובה
          </Button>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} animation={false} className="text-right">
        <Modal.Header  dir="rtl">
          <Modal.Title >מילה טובה חדשה</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
             <form dir="rtl">
               <div class="form-group">
                <label for="exampleFormControlSelect1">לאיזה יו"ר ברצונך לשלוח מילה </label>
                <select class="form-control" id="exampleFormControlSelect1" >
                  <option>יו"ר 1</option>
                  <option>יו"ר 2</option>
                  <option>יו"ר 3</option>
                </select>
              </div>
                <div class="form-group">
                <label for="exampleFormControlTextarea1">אנא הכנס תוכן של מילה טובה :</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="10"></textarea>
              </div>
            </form>
          </div>
 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            סגור
          </Button>
          <Button variant="primary" onClick={handleClose}>
            שמור ושלח
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default GoodWord;
