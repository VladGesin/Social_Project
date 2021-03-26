import React from "react";
import style from "./Contact.module.scss";
import ContactRow from "./ContactRow";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
const dummyData = [
   {
      id: "1",
      firstName: "ישראל",
      lastName: "ישראלי",
      role: "מנהל",
      email: "israel@gmail.com",
      phone: "0542452525",
   },
   {
      id: "2",
      firstName: "ישראל",
      lastName: "ישראלי",
      role: "מנהל",
      email: "israel@gmail.com",
      phone: "0542452525",
   },
   {
      id: "3",
      firstName: "ישראל",
      lastName: "ישראלי",
      role: "מנהל",
      email: "israel@gmail.com",
      phone: "0542452525",
   },
   {
      id: "4",
      firstName: "ישראל",
      lastName: "ישראלי",
      role: "מנהל",
      email: "israel@gmail.com",
      phone: "0542452525",
   },
   {
      id: "5",
      firstName: "ישראל",
      lastName: "ישראלי",
      role: "מנהל",
      email: "israel@gmail.com",
      phone: "0542452525",
   },
   {
      id: "6",
      firstName: "ישראל",
      lastName: "ישראלי",
      role: "מנהל",
      email: "israel@gmail.com",
      phone: "0542452525",
   },
   {
      id: "7",
      firstName: "ישראל",
      lastName: "ישראלי",
      role: "מנהל",
      email: "israel@gmail.com",
      phone: "0542452525",
   },
   {
      id: "7",
      firstName: "ישראל",
      lastName: "ישראלי",
      role: "מנהל",
      email: "israel@gmail.com",
      phone: "0542452525",
   },
   // {
   //    id: "8",
   //    firstName: "ישראל",
   //    lastName: "ישראלי",
   //    role: "מנהל",
   //    email: "israel@gmail.com",
   //    phone: "0542452525",
   // },
   // {
   //    id: "9",
   //    firstName: "ישראל",
   //    lastName: "ישראלי",
   //    role: "מנהל",
   //    email: "israel@gmail.com",
   //    phone: "0542452525",
   // },
   // {
   //    id: "10",
   //    firstName: "ישראל",
   //    lastName: "ישראלי",
   //    role: "מנהל",
   //    email: "israel@gmail.com",
   //    phone: "0542452525",
   // },
   // {
   //    id: "11",
   //    firstName: "ישראל",
   //    lastName: "ישראלי",
   //    role: "מנהל",
   //    email: "israel@gmail.com",
   //    phone: "0542452525",
   // },
];

const Contact = () => {
   return (
      <Accordion defaultActiveKey="0">
         {dummyData.map((c) => {
            return (
               <>
                  <div className={style.row}>
                     <h6>
                        {c.firstName} {c.lastName}
                     </h6>
                     <h6>{c.phone}</h6>
                     <Accordion.Toggle as="span" eventKey={c.id}>
                        <i className="fas fa-chevron-down"></i>
                     </Accordion.Toggle>
                  </div>
                  <Accordion.Collapse eventKey={c.id}>
                     <Card.Body>
                        <div className={style.container}>
                           <div className={style.details}>
                              <p>תפקיד : {c.role}</p>
                              <p>דוא"ל : {c.email}</p>
                           </div>
                           <div className={style.actions}>
                              <Button variant="danger">הסר</Button>{" "}
                              <Button variant="primary">ערוך</Button>{" "}
                           </div>
                        </div>
                     </Card.Body>
                  </Accordion.Collapse>
               </>
            );
         })}
      </Accordion>
   );
};

export default Contact;

//    <div className={style.container}>
//          {/* <div className={style.header}>
//           <h3>אנשי קשר</h3>
//           <div className={style.addContact}>
//              <i class="fas fa-user-plus"></i>
//           </div>
//        </div> */}
//        <div className={style.table}>
//        {dummyData.map((contact) => (
//           <ContactRow rowData={contact} />
//        ))}
//     </div>
//  </div>
