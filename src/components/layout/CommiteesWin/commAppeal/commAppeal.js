import React, { Fragment } from "react";
import { Form, Col, Button, Card, Collapse } from "react-bootstrap";
import { useState } from 'react';

function CommAppeal() {
    const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        variant="primary float-right"
      >
        פנייה לוועדה
      </Button>
      <Collapse in={open}>
        <div id="example-collapse-text">
        <Card className="text-right h-auto">
        <Card.Header as="h5" dir="rtl">
          פנייה לועדה:
        </Card.Header>
        <Card.Body>
          <Form dir="rtl">
            <Form.Row>
              <Form.Group as={Col} controlId="formGridAppealTo">
                <Form.Label>פנייה אל:</Form.Label>
                <Form.Control as="select" defaultValue="בחר">
                  <option>ועדה א'</option>
                  <option>וועדה ב'</option>
                </Form.Control>
              </Form.Group>

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
                  <option>לא דחוף</option>
                  <option>דחוף</option>
                  <option>דחוף מאוד</option>
                  <option>קריטי</option>
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

              <Form.Group as={Col} controlId="formGridContactMail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridAppealKeywords">
              <Form.Label>מילות מפתח:</Form.Label>
              <Form.Control placeholder="מילות מפתח" />
            </Form.Group>

            <Button variant="primary" type="submit">
              שלח
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header as="h5" dir="rtl" className="text-right">
          צפייה בפנייה קודמת:
        </Card.Header>
        <Card.Body>
          <Form dir="rtl" className="text-right">
            <Form.Group controlId="formGridAppealKeywords">
              <Form.Label>מספר פנייה:</Form.Label>
              <Form.Control placeholder="מספר פנייה..." />
              <Button variant="primary float-right" type="submit">
                פתח
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
        </div>
      </Collapse>
    </Fragment>
  );
}

export default CommAppeal;
