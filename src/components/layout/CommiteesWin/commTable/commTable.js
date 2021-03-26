import React, { Fragment, useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import InfoCardMap from '../commTable/infoCardMap';
import api from "../../../../api";
import { useParams } from "react-router-dom";
import style from "../../SecretaryWin/modals/DeleteUserModal/DeleteUserModal.module.scss";
import Modal from "react-bootstrap/Modal";
import MsgBox from "../../SecretaryWin/MsgBox/MsgBox";

function CommTable(props) {
  const commName = useParams().type;
  const [deleteWindowIsOpen, setDeleteWindowIsOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState({});
  const [msg, setMsg] = useState({ msg: "" });
  // const [committeeData, setCommitteeData] = useState([]);
  // useEffect(()=>{
  //   const getCommittees = async ()=>{
  //     const res = await api.get(`committeeParticipants/${commName}`);

  //     console.log('commtable');
  //     console.log(res.data);

  //     const data = res.data.map((cur, i)=>{
  //   return {
  //     ...cur.user,
  //     committeePosition: cur.committeePosition,
  //     index: i+1
      
  //   }
  // })
  // setCommitteeData(data);
  // }
  //   getCommittees()
  // },[])

  // const editCommMember = async (member) => {
  //   debugger
  //   await api.patch(`committees/${commName}`, {
  //     userID: parseInt(member.userID),
  //     role: member.type
  //   }).then((res) => {
  //     console.log(res);
  //     props.setCommitteeData([...props.committeeData, res.data[0].user]);
  //   });  
  // };

  const deleteCommMember = async () => {
    await api.delete(`committees/'${commName}'`, 
    {
      userID: parseInt(memberToDelete.userID)
    }).then(() => {
      const newArrayAfterDelete = props.committeeData.filter(item => item.userID !== memberToDelete.userID);
      props.setCommitteeData(newArrayAfterDelete);
      close();
      setMsg({
        msg: "חבר הועדה נמחק בהצלחה",
        type: "delete",
      });
    });  
  }
  
  const close = () => {
    setDeleteWindowIsOpen(false)
  }

  const onDelete = (member) => {
    setDeleteWindowIsOpen(true);
    setMemberToDelete(member);
  }

  const PplArrMap = props.committeeData.map((card, index) => (
    <InfoCardMap card={card} key={index} onDelete={onDelete}/>
    //  <InfoCardMap card={card} key={card.name.toString} />
  ));
  return (
    <Fragment>
      <Modal
         show={deleteWindowIsOpen}
         onHide={close}
         contentClassName={style.deleteWindow}
         centered
         size="lg"
      >
         <h3 className={style.title}>
            האם למחוק את <span>{memberToDelete.firstName + " " + memberToDelete.lastName}</span> מהועדה ?
         </h3>

         <p>בלחיצה על כפתור "מחיקה" המשתמש ימחק מהועדה לצמיתות</p>
         <div className={style.btnContainer}>
            <button className={style.deleteBtn} onClick={deleteCommMember}>
               מחיקה
            </button>
            <button className={style.cancelBtn} onClick={close}>
               ביטול
            </button>
         </div>
      </Modal>
      <Card className="text-right h-auto w-100" height="fit-content !important">
        <Card.Header as="h5" dir="rtl">
          חברי הוועדה
        </Card.Header>
        <Card.Body>
         
            <Table responsive="sm" dir="rtl" hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>שם</th>
                  <th>תפקיד</th>
                  <th>טלפון</th>
                  <th>דואר אלקטרוני</th>
                </tr>
              </thead>
              <tbody>{PplArrMap}</tbody>
            </Table>
         
        </Card.Body>
      </Card>
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
    </Fragment>
    
  );
}

export default CommTable;
