import React from "react";
import { Container, Table}  from 'react-bootstrap';
import Commiteefriendmap from './commiteefriendmap'

const listArr = [
    {
      index: "1",
      commitee: "ועדת ספורט",
      name: "ישראל ישראל",
    },
    {
      index: "2",
      commitee: "ועדת חינוך",
      name: "יוני כץ",
    },
  ];


export default function  Commitemap (props) {
  return (
    <Container 
      dir="rtl"
      >
      <Table>
        <thead>
        <th>#</th>
        <th>שם הועדה</th>
        <th>שם היו"ר</th>
      </thead>
      <tbody>
      {listArr.map((item) => (
                        <Commiteefriendmap
                          key={item.name.toString()}
                          item={item}
                        />
                      ))}
      </tbody>
      </Table>
    </Container>
  );
};

