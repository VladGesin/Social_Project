import React, { Fragment } from 'react';
import Card from 'react-bootstrap/Card';
import './InfoCard.css';
import CardText from '../InfoCard/cardText';

const InfoCard = (props) => {
  const header = props.header;
  const data = props.data;
  const listdata = data.map((news) => (
    // Correct! Key should be specified inside the array.
    <CardText key={news.toString()} value={news} />
  ));
  return (
    <Fragment>
      <Card className="text-right">
        <Card.Header as="h5">{header}</Card.Header>
        <Card.Body>
          <Card.Title>כותרת המבזק</Card.Title>
          {/* <Card.Text>
            מידע שייצוג במבזק מידע שייצוג במבזק מידע שייצוג במבזק מידע שייצוג
          </Card.Text> */}
          {listdata}
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default InfoCard;
