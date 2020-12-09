import React, { useState, useEffect } from "react";
import Table from "../../Table/Table";
import SortRow from "../../Table/SortRow/SortRow";
import style from "./GoodWord.module.scss";

import GoodWordDetails from "../../modals/GoodWordDetails/GoodWordDetails";
import ChangeStateGoodWord from "../../modals/ChangeStateGoodWord/ChangeStateGoodWord";
import api from "../../../../../api";

const columns = [
   { title: "נשלח לועדה", variableName: "committee_name" },
   { title: "מספר סידורי", variableName: "serial_id" },
   { title: "שם השולח", variableName: "full_name" },
   { title: "סטטוס", variableName: "state" },
   { title: "תאריך", variableName: "time" },
];

const GoodWord = ({ msg, setMsg }) => {
   const [data, setData] = useState([]);
   const [currentGoodWord, setCurrentGoodWord] = useState({});
   const [isViewModelOpen, setIsViewModelOpen] = useState(false);
   const [isChangeStatusOpen, setIsChangeStatusOpen] = useState(false);
   const [flag, setFlag] = useState(false);
   useEffect(() => {
      (async () => {
         const allGoodWords = await api.get("goodWord");
         for (let goodWord of allGoodWords.data) {
            const user = await api.get(`user/${goodWord.sender_id}`);
            goodWord.full_name = `${user.data[0].firstName} ${user.data[0].lastName}`;
            goodWord.time = new Date(goodWord.time).toLocaleDateString();
            goodWord.phone = user.data[0].phoneNumber;
            goodWord.email = user.data[0].email;
            goodWord.state =
               goodWord.state === null
                  ? "טרם טופל"
                  : goodWord.state === true
                  ? "אושר"
                  : "נדחה";
         }

         setData(
            allGoodWords.data.sort((a, b) => {
               return a.committee_name > b.committee_name
                  ? 1
                  : a.committee_name < b.committee_name
                  ? -1
                  : 0;
            })
         );
      })();
   }, [flag]);

   const rowAction = {
      appealData: {
         name: "צפייה",
         icon: "far fa-file-alt",
         isOpen: false,
         onClick: (data) => {
            setIsViewModelOpen(true);
            setCurrentGoodWord(data);
         },
      },
      state: {
         name: "עריכת סטאטוס",
         icon: "fas fa-pen",
         isOpen: false,
         onClick: (data) => {
            setIsChangeStatusOpen(true);
            setCurrentGoodWord(data);
         },
      },
   };

   return (
      <>
         <GoodWordDetails
            close={() => setIsViewModelOpen(false)}
            isOpen={isViewModelOpen}
            setMsg={setMsg}
            data={currentGoodWord}
            setMsg={setMsg}
         />
         <ChangeStateGoodWord
            close={() => setIsChangeStatusOpen(false)}
            isOpen={isChangeStatusOpen}
            setMsg={setMsg}
            data={currentGoodWord}
            reRender={() => {
               setFlag((cur) => !cur);
            }}
         />
         <div className={style.table}>
            <Table
               data={data}
               columns={columns}
               actions={rowAction}
               sortRow={
                  <SortRow
                     data={data}
                     setData={setData}
                     sortByOptions={columns}
                  />
               }
            ></Table>
         </div>
      </>
   );
};

export default GoodWord;
