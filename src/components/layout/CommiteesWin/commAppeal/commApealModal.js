import React, { Fragment } from "react";
import { Form, Col, Button, Card } from "react-bootstrap";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";

const CommApealModal = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Fragment>
      <Button variant="primary float-left" onClick={handleShow} dir="rtl">
        פניה לוועדה
      </Button>
      <Modal show={show} onHide={handleClose} size="lg" dir="rtl">
        <Card className="text-right h-auto">
          <Card.Header as="h5" dir="rtl">
          פניה ל{props.name}
          </Card.Header>
          <Card.Body>
            <Form dir="rtl">
              <Form.Row>
                  <Form.Group as={Col} controlId="formGridAppeaKind">
                  <Form.Label>סוג הפנייה:</Form.Label>
                  <Form.Control as="select" defaultValue="בחר">
                    <option>בקשה</option>
                    <option>הצעה</option>
                    <option>תלונה</option>
                    <option>דיווח</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridAppealUrgent">
                  <Form.Label>דחיפות:</Form.Label>
                  <Form.Control as="select" defaultValue="בחר">
                    <option>רגיל</option>
                    <option>דחוף</option>
                    <option>דחוף ביותר</option>
                    <option>בהול</option>
                  </Form.Control>
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="formGridAppealSubject">
                <Form.Label>נושא הפנייה:</Form.Label>
                <Form.Control placeholder="נושא הפנייה" />
              </Form.Group>

              <Form.Group controlId="formGridAppealDetails">
                <Form.Label>פרטי הפנייה:</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="פירוט הפנייה כולל את כל גוף הפנייה ותוכן אליו תרצה/י שיתייחסו בפנייה. נא לכתוב כמה שיותר פרטים וכמה שיותר ברור על מנת שנוכל לסייע במהירות "
                />
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridName">
                  <Form.Label>שם איש קשר:</Form.Label>
                  <Form.Control />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPhone">
                  <Form.Label>טלפון ליצירת קשר:</Form.Label>
                  <Form.Control />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPhone">
                <Form.Label />
                  <Form.Control as="select" defaultValue="בחר">
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
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="name@example.com" />
                </Form.Group>
              </Form.Row>

              <Button variant="primary" type="submit">
                שליחה
              </Button>
              <Button variant="secondary" onClick={handleClose}>
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
