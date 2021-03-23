import React, { Fragment } from 'react';
import Card from 'react-bootstrap/Card';
import CommApealModal from '../commAppeal/commApealModal';
import CommAddMember from '../commAddMember/CommAddMember';

const CommDescription = (props) => {
  return (
    <Fragment>   
      <Card className="text-right w-100">
        <Card.Header as="h2">{props.commItem.name}</Card.Header>
        <Card.Body>
          <Card.Title>קצת על הוועדה</Card.Title>
          <Card.Text>{props.commItem.desc}</Card.Text>
          <CommApealModal />
          <CommAddMember commItem={props.commItem} committeeData={props.committeeData} setCommitteeData={props.setCommitteeData}/>
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default CommDescription;
