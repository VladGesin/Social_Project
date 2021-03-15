import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Committees from "../layout/SecretaryWin/ContentManagement/Committees/Committees";
import MsgBox from "../layout/SecretaryWin/MsgBox/MsgBox";
import style from "./CommInquiryManagement.module.scss";
const CommInquiryManagement = () => {
   const [msg, setMsg] = useState({ msg: "" });
   return (
      <Card
         className="text-right h-auto mx-auto "
         height="fit-content !important"
         style={{ width: "100rem" }}
      >
         <Card.Header>
            <h2 style={{ textAlign: "center" }}>ניהול פניות לועדה</h2>
         </Card.Header>
         <Card.Body>
            {msg.msg !== "" && (
               <div className={style.msgBoxContainer}>
                  <MsgBox
                     name={msg.name}
                     msg={msg.msg}
                     clear={() => {
                        setMsg({ msg: "" });
                     }}
                     type={msg.type}
                  />
               </div>
            )}
            <Committees setMsg={setMsg} />
         </Card.Body>
      </Card>
   );
};

export default CommInquiryManagement;
