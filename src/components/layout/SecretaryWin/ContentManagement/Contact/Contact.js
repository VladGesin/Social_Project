import React from "react";
import style from "./Contact.module.scss";
import ContactRow from "./ContactRow";

const dummyData = [
   {
      firstName: "ישראל",
      lastName: "ישראלי",
      role: "מנהל",
      email: "israel@gmail.com",
      phone: "0542452525",
   },
   {
      firstName: "ישראל",
      lastName: "ישראלי",
      role: "מנהל",
      email: "israel@gmail.com",
      phone: "0542452525",
   },
   {
      firstName: "ישראל",
      lastName: "ישראלי",
      role: "מנהל",
      email: "israel@gmail.com",
      phone: "0542452525",
   },
   {
      firstName: "ישראל",
      lastName: "ישראלי",
      role: "מנהל",
      email: "israel@gmail.com",
      phone: "0542452525",
   },
   {
      firstName: "ישראל",
      lastName: "ישראלי",
      role: "מנהל",
      email: "israel@gmail.com",
      phone: "0542452525",
   },
   {
      firstName: "ישראל",
      lastName: "ישראלי",
      role: "מנהל",
      email: "israel@gmail.com",
      phone: "0542452525",
   },
   {
      firstName: "ישראל",
      lastName: "ישראלי",
      role: "מנהל",
      email: "israel@gmail.com",
      phone: "0542452525",
   },
];
const Contact = () => {
   return (
      <div className={style.container}>
         <div className={style.header}>
            <h3>אנשי קשר</h3>
            <div className={style.addContact}>
               <i class="fas fa-user-plus"></i>
            </div>
         </div>
         <div className={style.table}>
            {dummyData.map((contact) => (
               <ContactRow rowData={contact} />
            ))}
         </div>
      </div>
   );
};

export default Contact;
