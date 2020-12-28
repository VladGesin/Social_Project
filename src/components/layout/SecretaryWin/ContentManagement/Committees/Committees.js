import React, { useState, useEffect } from "react";
import Table from "../../Table/Table";
import SortRow from "../../Table/SortRow/SortRow";
import style from "./Committees.module.scss";
import AppealDetails from "../../modals/AppealDetailes/AppealDetails";
import ContactDetails from "../../modals/ContactDetails/ContactDetails";
import MarkAsSpam from "../../modals/MarkAsSpam/MarkAsSpam";
import AppealReply from "../../modals/AppealReply/AppealReply";
import api from "../../../../../api";
import { Spin, Menu, Dropdown, Button } from "antd";

const columns = [
   { title: "מספר פנייה", variableName: "inbox_id" },
   { title: "שם הפונה", variableName: "contact_full_name" },
   { title: "נושא הפנייה", variableName: "subject" },
   {
      title: "סטטוס",
      variableName: "is_open",
      color: {
         spam: "red",
      },
   },
   { title: "תאריך", variableName: "inbox_sending_time" },
];

const Committees = ({ setMsg }) => {
   const [committeesNames, setCommitteesNames] = useState([]);
   const [appealDetailsIsOpen, setAppealDetailsIsOpen] = useState(false);
   const [contactDetailsIsOpen, setContactDetailsIsOpen] = useState(false);
   const [markAsSpamIsOpen, setMarkAsSpamIsOpen] = useState(false);
   const [appealReplyIsOpen, setAppealReplyIsOpen] = useState(false);
   const [selectedCommittee, setSelectedCommittee] = useState();
   const [appeals, setAppeals] = useState([]);
   const [currentAppeal, setCurrentAppeal] = useState();
   const [isLoading, setIsLoading] = useState(true);

   const rowAction = {
      setCurrentData: setCurrentAppeal,

      appealData: {
         name: "צפייה",
         icon: "far fa-file-alt",
         isOpen: false,
         onClick: (data) => {
            setAppealDetailsIsOpen(true);
            setCurrentAppeal(data);
         },
      },
      appealUser: {
         name: "צפייה בפרטי איש קשר",
         icon: "far fa-id-badge",
         isOpen: false,
         onClick: (data) => {
            setContactDetailsIsOpen(true);
            setCurrentAppeal(data);
         },
      },
      spam: {
         name: "סימון כספאם",
         icon: "fas fa-minus-circle",
         isOpen: false,
         onClick: (data) => {
            setMarkAsSpamIsOpen(true);
            setCurrentAppeal(data);
         },
      },
      replay: {
         name: "הגב",
         icon: "fas fa-reply",
         isOpen: false,
         onClick: (data) => {
            setAppealReplyIsOpen(true);
            setCurrentAppeal(data);
         },
      },
   };
   useEffect(() => {
      (async () => {
         const committees = await api.get("committees");
         setCommitteesNames(committees.data);
         setSelectedCommittee(committees.data[0].name);
      })();
   }, []);
   const getAppealsForCommittee = async () => {
      const res = await api.get(
         `inbox/getByCommitteeName/${selectedCommittee}`
      );
      const appealsWithStatusAndDate = res.data.map((cur) => {
         cur.is_open = cur.is_open == true ? "פתוח" : "סגור";
         cur.is_open = cur.is_spam ? "ספאם" : cur.is_open;

         cur.inbox_sending_time = cur.inbox_sending_time.split("T")[0];
         return cur;
      });
      setAppeals(appealsWithStatusAndDate);
      console.log(appealsWithStatusAndDate);
   };
   useEffect(() => {
      getAppealsForCommittee();
      setIsLoading(false);
   }, [selectedCommittee]);

   const menu = (committeesNames) => {
      const drop = (
         <Menu className={style.options}>
            {committeesNames.map((c) => (
               <Menu.Item onClick={() => setSelectedCommittee(c.name)}>
                  {c.name}
               </Menu.Item>
            ))}
         </Menu>
      );
      return drop;
   };

   return (
      <>
         <AppealDetails
            close={() => setAppealDetailsIsOpen(false)}
            isOpen={appealDetailsIsOpen}
            setMsg={setMsg}
            data={currentAppeal}
         />
         <ContactDetails
            close={() => setContactDetailsIsOpen(false)}
            isOpen={contactDetailsIsOpen}
            setMsg={setMsg}
            data={currentAppeal}
         />
         <MarkAsSpam
            close={() => setMarkAsSpamIsOpen(false)}
            isOpen={markAsSpamIsOpen}
            setMsg={setMsg}
            data={currentAppeal}
            getAppealsForCommittee={getAppealsForCommittee}
            setMsg={setMsg}
         />
         <AppealReply
            close={() => setAppealReplyIsOpen(false)}
            isOpen={appealReplyIsOpen}
            setMsg={setMsg}
            data={currentAppeal}
            getAppealsForCommittee={getAppealsForCommittee}
         />
         <div className={style.table}>
            {isLoading ? (
               <div className={style.spinner}>
                  <Spin size="large" />
               </div>
            ) : (
               <Table
                  data={appeals}
                  columns={columns}
                  actions={rowAction}
                  sortRow={
                     <SortRow
                        data={appeals}
                        setData={setAppeals}
                        sortByOptions={columns}
                     />
                  }
               >
                  <div className={style.selectContainer}>
                     <Dropdown
                        overlay={() => menu(committeesNames)}
                        placement="bottomCenter"
                     >
                        <Button>
                           {selectedCommittee}
                           <i className="fas fa-chevron-down"></i>
                        </Button>
                     </Dropdown>
                     {/* <select>
                     {committeesNames.map((c) => (
                        <option> {c.name}</option>
                     ))}
                  </select> */}
                  </div>
               </Table>
            )}
         </div>
      </>
   );
};

export default Committees;
