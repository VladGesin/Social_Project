import React, { Fragment, useState } from "react";
import {Card, Button} from "react-bootstrap";
import CommApealModal from "../commAppeal/commApealModal";
import CommAddMember from "../commAddMember/CommAddMember";
import { Form } from "react-bootstrap";
import api from "../../../../api";
import MsgBox from "../../SecretaryWin/MsgBox/MsgBox";

const CommDescription = (props) => {

   const [editMode, setEditMode] = useState(false);
   const [description, setDescription] = useState("");
   const [msg, setMsg] = useState({ msg: "" });

   const onDescChange = (e) => {
      setDescription(e.target.value);
   }

   const editDescription = async () => {     
      if(description.length < 200) 
      {
         await api.patch(`committees/editCommitteeDetails`, {
                  committeeName: props.commItem.name,
                  description: description
               })
               .then((res) => {      
                  console.log(res)                       
                  let resObj = res.data.data[0].committee;
                  let commObj = {
                     name: resObj.committee_name,
                     desc: resObj.committee_information
                  };
                  props.setCommItem(commObj);
                  setEditMode(false);
               })
      }
      else {
         setMsg({
            msg: "תיאור הועדה יכול להכיל עד 200 תווים!",
            type: "warning",
          });
      }
   };

   return (
      <Fragment>
         {msg.msg !== "" && (
        <MsgBox
          name={msg.name}
          msg={msg.msg}
          clear={() => {
            setMsg({ msg: "" });
          }}
          type={msg.type}
        />
      )}
         <Card className="text-right w-100">
            <Card.Header as="h2">{props.commItem.name}</Card.Header>
            <Card.Body>
               <Card.Title>
               {editMode && <Button variant="success" style={{marginRight: "1em"}} onClick={editDescription}>שמור</Button>}
               {editMode && <Button variant="danger" style={{marginRight: "1em"}} onClick={()=>setEditMode(false)}>ביטול</Button>}
               {props.isAllowed && <i className="fas fa-edit" title="עריכת נושא הועדה" aria-hidden="true" style={{marginRight: "1em"}} onClick={()=>setEditMode(true)}></i>}
                  קצת על הוועדה
               </Card.Title>
               {editMode? <textarea cols="100" rows="3" onChange={onDescChange} style={{direction:"rtl"}}>{props.commItem.desc}</textarea>
                           : <Card.Text>{props.commItem.desc}</Card.Text>}
               {!editMode && <CommApealModal />}
               {!editMode && <CommAddMember
                  commItem={props.commItem}
                  committeeData={props.committeeData}
                  setCommitteeData={props.setCommitteeData}
                  setReRender={props.setReRender}
                  isAllowed={props.isAllowed}
               />}
            </Card.Body>
         </Card>
      </Fragment>
   );
};

export default CommDescription;
