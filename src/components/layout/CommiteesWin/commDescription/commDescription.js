import React, { Fragment } from "react";
import Card from "react-bootstrap/Card";

function CommDescription() {
  return (
    <Fragment>
      <Card className="text-right h-auto">
        <Card.Header as="h2">ועדת חינוך</Card.Header>
        <Card.Body>
          <Card.Title>קצת על הוועדה</Card.Title>
          <Card.Text>פירוט רחב על כלל המידע הנוגע לועדה</Card.Text>
        </Card.Body>
      </Card>
    </Fragment>
  );
}

export default CommDescription;
