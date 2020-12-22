import React, { Fragment, useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import InfoCardMap from '../commTable/infoCardMap';
import api from "../../../../api";
import { updateIndexedAccessTypeNode } from 'typescript';

function CommTable(props) {
  /*const PplArr = {
    card: [
      {
        index: 1,
        name: 'ישראל ישראלי',
        position: 'יו״ר וועדה',
        phone: '054222222',
        mail: 'gas@gfdv.com',
      },
      {
        index: 2,
        name: 'ילוני אלמוני',
        position: 'יו״ר וועדהגן יו"ר הוועדה',
        phone: '054222222',
        mail: 'HHHH@MMm.com',
      },
      {
        index: 3,
        name: 'גודי גודיד',
        position: 'מזכירת היו״ר',
        phone: '054222222',
        mail: 'cofi@xmxm.com',
      },
    ],
  };*/
  const [committeeData, setCommitteeData] = useState([]);
  useEffect(()=>{
    getCommittees()
  },[])
  const getCommittees = async ()=>{
        const res = await api.get(`committeeParticipants/${props.commItem.name}`);
        const data = res.data.map((cur, i)=>{
      return {
        ...cur.user,
        committeePosition: cur.committeePosition,
        index: i+1
        
      }
    })
    setCommitteeData(data);
        console.log(data)
    }

    
  

  const PplArrMap = committeeData.map((card, index) => (
    <InfoCardMap card={card}  />
    //  <InfoCardMap card={card} key={card.name.toString} />
  ));
  return (
    <Fragment>
      <Card className="text-right h-auto w-100">
        <Card.Header as="h5" dir="rtl">
          חברי הוועדה
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <Table responsive="sm" dir="rtl">
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
          </Card.Text>
        </Card.Body>
      </Card>
    </Fragment>
  );
}

export default CommTable;
