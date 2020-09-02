import React, { Fragment } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function CommDescription() {
  return (
    <Fragment>
      <Card className="text-right h-auto">
        <Card.Header as="h5">ועדה מס' 1</Card.Header>
        <Card.Body>
          <Card.Title>מידע על ועדה מס' 1</Card.Title>
          <Card.Text>פירוט רחב על כלל המידע הנוגע לועדה</Card.Text>
          <Button variant="primary"> אופציונלי </Button>
        </Card.Body>
      </Card>
    </Fragment>
  );
}

export default CommDescription;
