import React, { Fragment, useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import InfoCardMap from '../commTable/infoCardMap';
import api from "../../../../api";
import { useParams } from "react-router-dom";


function CommTable(props) {
  const commName = useParams().type;
  const [committeeData, setCommitteeData] = useState([]);
  useEffect(()=>{
    const getCommittees = async ()=>{
      const res = await api.get(`committeeParticipants/${commName}`);
      const data = res.data.map((cur, i)=>{
    return {
      ...cur.user,
      committeePosition: cur.committeePosition,
      index: i+1
      
    }
  })
  setCommitteeData(data);
  }
    getCommittees()
  },[])

  const PplArrMap = committeeData.map((card, index) => (
    <InfoCardMap card={card} key={index} />
    //  <InfoCardMap card={card} key={card.name.toString} />
  ));
  return (
    <Fragment>
      <Card className="text-right h-auto w-100" style={{height: 'auto important!'}}>
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
    </Fragment>
  );
}

export default CommTable;
