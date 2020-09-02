import React, { Fragment } from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table'
//import Button from 'react-bootstrap/Button';


function CommTable() {
  return (
    <Fragment>
      <Card className="text-right">
        <Card.Header as="h5">חברי הוועדה:</Card.Header>
        <Card.Body>
          <Card.Title>להלן טבלה עם פרטי חברי הוועדה:</Card.Title>
          <Card.Text>
          <Table responsive="sm">
    <thead>
      <tr>
        <th>#</th>
        <th ClassName="text-rigt">שם:</th>
        <th ClassName="text-rigt">תפקיד:</th>
        <th ClassName="text-rigt">טלפון:</th>
        <th>E-mail:</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
      </tr>
      <tr>
        <td>3</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
      </tr>
    </tbody>
  </Table>
          </Card.Text>
        </Card.Body>
      </Card>
    </Fragment>
  );
}

export default CommTable;
