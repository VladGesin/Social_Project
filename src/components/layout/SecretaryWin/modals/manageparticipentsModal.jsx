import Modal from "react-bootstrap/Modal";
import React, { Button } from "react";
import Form from "react-bootstrap/Form";

import Table from "react-bootstrap/Table";
import Commiteerowmap from './commiteerowmap'

const listParticipent = [
    {
      index: "1",
      name: "ישראל ישראלי",
      Email: "esample@gmail.com",
      Usertype: "Participant",
    },
    {
      index: "2",
      name: "עדן ישראלי",
      Email: "Example@gmail.com",
      Usertype: "Admin",
    },
  ];

const ManageparticipentsModal = (props) => {
 return(
            <Modal
                onHide = {props.onHide}
                show = {props.show}
                size="lg"  
               aria-labelledby="Restart_Pass"
               dir="rtl"
            >
                <Modal.Header closeButton>
                  <Modal.Title id="ManageParticipent">
                    ניהול חברי ועדה{" "}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Table responsive="lg" dir="rtl">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>שם משתמש</th>
                        <th>אימייל</th>
                        <th>מחיקת משתמש</th>
                      </tr>
                    </thead>

                    <tbody>
                      {listParticipent.map((item) => (
                        <Commiteerowmap
                          key={item.name.toString()}
                          item={item}
                        />
                      ))}
                    </tbody>
                  </Table>
                </Modal.Body>
              </Modal>
              )
}

export default ManageparticipentsModal;