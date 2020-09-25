import React, { Fragment } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './GoodWord.css';

const GoodWord = () => {
  return (
    <Fragment>
      <Card className="text-right">
        <Card.Header as="h5">מבזקים</Card.Header>
        <Card.Body>
          <Card.Title>כותרת המבזק</Card.Title>
          <Card.Text>
            מידע שייצוג במבזק מידע שייצוג במבזק מידע שייצוג במבזק מידע שייצוג
          </Card.Text>
          <Button variant="primary float-left"> אופציונלי </Button>
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default GoodWord;
