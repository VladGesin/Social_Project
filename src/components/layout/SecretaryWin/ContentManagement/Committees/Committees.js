import React, { useState, useEffect } from "react";
import Table from "../../Table/Table";
import SortRow from "../../Table/SortRow/SortRow";
import style from "./Committees.module.scss";
import AppealDetails from "../../modals/AppealDetailes/AppealDetails";
import ContactDetails from "../../modals/ContactDetails/ContactDetails";
import MarkAsSpam from "../../modals/MarkAsSpam/MarkAsSpam";
import AppealReply from "../../modals/AppealReply/AppealReply";
import api from "../../../../../api";
import { Menu, Dropdown, Button, Space } from "antd";

const columns = [
   { title: "מספר פנייה", variableName: "appealNumber" },
   { title: "שם הפונה", variableName: "appealName" },
   { title: "נושא הפנייה", variableName: "appealTitle" },
   { title: "סטטוס", variableName: "status" },
   { title: "תאריך", variableName: "appealDate" },
];

const Committees = ({ setMsg }) => {
   const [rows, setRows] = useState([
      {
         appealNumber: "111111",
         appealName: "פנייה 1",
         appealTitle: "נושא 1",
         status: "מאושר",
         appealDate: "10/10/2020",
      },
      {
         appealNumber: "222222",
         appealName: "פנייה 2",
         appealTitle: "נושא 2",
         status: "מאושר",
         appealDate: "1/10/2020",
      },
      {
         appealNumber: "33333",
         appealName: "פנייה 3",
         appealTitle: "נושא 3",
         status: "מאושר",
         appealDate: "2/10/2020",
      },
      {
         appealNumber: "44444",
         appealName: "פנייה 4",
         appealTitle: "נושא 4",
         status: "מאושר",
         appealDate: "3/10/2020",
      },
      {
         appealNumber: "55555",
         appealName: "פנייה 5",
         appealTitle: "נושא 5",
         status: "מאושר",
         appealDate: "5/10/2020",
      },
      {
         appealNumber: "66666",
         appealName: "פנייה 6",
         appealTitle: "נושא 6",
         status: "מאושר",
         appealDate: "6/10/2020",
      },
      {
         appealNumber: "7777",
         appealName: "פנייה 7",
         appealTitle: "נושא 7",
         status: "מאושר",
         appealDate: "7/10/2020",
      },
      {
         appealNumber: "88888",
         appealName: "פנייה 8",
         appealTitle: "נושא 8",
         status: "מאושר",
         appealDate: "8/10/2020",
      },
   ]);

   const [committeesNames, setCommitteesNames] = useState([]);
   const [appealDetailsIsOpen, setAppealDetailsIsOpen] = useState(false);
   const [contactDetailsIsOpen, setContactDetailsIsOpen] = useState(false);
   const [markAsSpamIsOpen, setMarkAsSpamIsOpen] = useState(false);
   const [appealReplyIsOpen, setAppealReplyIsOpen] = useState(false);
   const [selectedCommittee, setSelectedCommittee] = useState();
   const rowAction = {
      setCurrentData: "",

      appealData: {
         name: "צפייה",
         icon: "far fa-file-alt",
         isOpen: false,
         onClick: () => {
            setAppealDetailsIsOpen(true);
         },
      },
      appealUser: {
         name: "צפייה בפרטי איש קשר",
         icon: "far fa-id-badge",
         isOpen: false,
         onClick: () => {
            setContactDetailsIsOpen(true);
         },
      },
      spam: {
         name: "סימון כספאם",
         icon: "fas fa-minus-circle",
         isOpen: false,
         onClick: () => {
            setMarkAsSpamIsOpen(true);
         },
      },
      replay: {
         name: "הגב",
         icon: "fas fa-reply",
         isOpen: false,
         onClick: () => {
            setAppealReplyIsOpen(true);
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

   const menu = (committeesNames) => {
      console.log(committeesNames);
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
         />
         <ContactDetails
            close={() => setContactDetailsIsOpen(false)}
            isOpen={contactDetailsIsOpen}
            setMsg={setMsg}
         />
         <MarkAsSpam
            close={() => setMarkAsSpamIsOpen(false)}
            isOpen={markAsSpamIsOpen}
            setMsg={setMsg}
         />
         <AppealReply
            close={() => setAppealReplyIsOpen(false)}
            isOpen={appealReplyIsOpen}
            setMsg={setMsg}
         />
         <div className={style.table}>
            <Table
               data={rows}
               columns={columns}
               actions={rowAction}
               sortRow={
                  <SortRow
                     data={rows}
                     setData={setRows}
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
         </div>
      </>
   );
};

export default Committees;
