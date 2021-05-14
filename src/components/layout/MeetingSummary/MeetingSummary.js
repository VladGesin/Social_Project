import React from "react";
import Modal from "react-bootstrap/Modal";
import style from "./MeetingSummary.module.scss";
import { Form, Col, Button, Card } from "react-bootstrap";

const MeetingSummary = () => {
   return (
      <div className={style.container}>
         <div className={style.topMenu}>
            <Button variant="success" dir="rtl">
               העלת סיכום שיחה
            </Button>

            <select className={style.drop}>
               <option>סיכום שיחות</option>
               <option>שיחות ממתינות לאישור</option>
            </select>
         </div>
         <Modal show={true} onHide={() => {}} size="lg" dir="rtl">
            <Card
               className="text-right h-auto container"
               height="fit-content !important"
            >
               <Card.Header as="h5" dir="rtl">
                  הוספת חבר ועדה
               </Card.Header>
               <Card.Body>
                  <Form dir="rtl">
                     <Form.Row>
                        <Form.Group as={Col} controlId="formGridContactMail">
                           <Form.Label>
                              דואר אלקטרוני<span className="validate">*</span>
                           </Form.Label>
                           <Form.Control
                              type="email"
                              placeholder="name@example.com"
                              value=""
                              name="email"
                              dir="ltr"
                           />
                        </Form.Group>
                     </Form.Row>
                     <Button variant="success" type="submit">
                        הוסף
                     </Button>
                     <Button
                        variant="secondary"
                        // onClick={handleClose}
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
                  <Card.Header style={{ textAlign: "right" }}>
                     שם הועדה
                  </Card.Header>
                  <Card.Body>
                     <Card.Title style={{ textAlign: "right" }}>
                        כותרת סיכום הוועדה{" "}
                        <p
                           className="text-muted"
                           style={{ fontSize: "0.8rem" }}
                        >
                           14/05/21
                        </p>
                     </Card.Title>
                     <Card.Text style={{ textAlign: "right" }}>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
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
