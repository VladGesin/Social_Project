import React from "react";
import {Row, Col, Container}  from 'react-bootstrap';
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
    <Container>
      <Row>
        <Col>#</Col>
        <Col>שם הועדה</Col>
        <Col>שם היו"ר</Col>
      </Row>
      <Row>
        <Col >{listArr.index}</Col>
        <Col>{listArr.commitee}</Col>
        <Col>{listArr.name}</Col>
      </Row>
      <Row>
        <Col >{listArr.index}</Col>
        <Col>{listArr.commitee}</Col>
        <Col>{listArr.name}</Col>
      </Row>
    </Container>
  );
};

/**
 * 
 * 
        <div>
                 <div class="row">
                    
                    </div>
                     <tr>
                         <li className='list-unstyled'>{props.item.index}</li>
                        <td>{props.item.commitee}</td>
                        <td>{props.item.name}</td>
                    <td></td></tr>
           </div> */
