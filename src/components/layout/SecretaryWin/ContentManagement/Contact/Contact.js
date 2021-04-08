import React, { Fragment, useState, useEffect, useContext } from "react";
import style from "./Contact.module.scss";
import ContactRow from "./ContactRow";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import api from "../../../../../api";
import AddContact from "../../modals/AddContact/AddContact";
import Context from "../../../../../store/Context";
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
   const [contactData, setContactData] = useState([]);
   const [addContactIsOpen, setAddContactIsOpen] = useState(false);
   const [reRender, setReRender] = useState(true);
   const context = useContext(Context);

   useEffect(() => {
      (async () => {
         const contacts = await api.get("contacts");
         console.log(contacts.data);
         setContactData(contacts.data);
      })();
   }, [reRender]);
   return (
      <>
         <AddContact
            close={() => setAddContactIsOpen(false)}
            isOpen={addContactIsOpen}
            setReRender={setReRender}
            reRender={reRender}
         />
         <Card style={{ height: "50vh", overflowY: "auto" }}>
            <Card.Header className={style.header}>
               <h5>אנשי קשר</h5>
               {context.userState.userType == "admin" && (
                  <i
                     className="fas fa-plus-square"
                     onClick={() => setAddContactIsOpen(true)}
                  ></i>
               )}
            </Card.Header>
            <Card.Body>
               <Accordion defaultActiveKey="0">
                  {contactData.map((c) => {
                     return (
                        <Fragment key={c.contact_id}>
                           <div className={style.row}>
                              <h6>
                                 {c.first_name} {c.last_name}
                              </h6>
                              <h6>{c.phone}</h6>
                              <Accordion.Toggle
                                 as="span"
                                 eventKey={c.contact_id}
                              >
                                 <i className="fas fa-chevron-down"></i>
                              </Accordion.Toggle>
                           </div>
                           <Accordion.Collapse eventKey={c.contact_id}>
                              <Card.Body>
                                 <div className={style.container}>
                                    <div className={style.details}>
                                       <p>תפקיד : {c.role}</p>
                                       <p>דוא"ל : {c.email}</p>
                                    </div>
                                    <div className={style.actions}>
                                       {context.userState.userType !=
                                          "admin" && (
                                          <Button
                                             variant="danger"
                                             onClick={async () => {
                                                await api.delete(
                                                   `contacts/${c.contact_id}`
                                                );
                                                setReRender(!reRender);
                                             }}
                                          >
                                             הסר
                                          </Button>
                                       )}
                                       {/* <Button variant="primary">ערוך</Button>{" "} */}
                                    </div>
                                 </div>
                              </Card.Body>
                           </Accordion.Collapse>
                        </Fragment>
                     );
                  })}
               </Accordion>
            </Card.Body>
         </Card>
      </>
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
