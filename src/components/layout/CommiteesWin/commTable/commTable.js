import React, { Fragment } from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import avatar from '../../../Icons/Avatars/avatar.png';

function CommTable() {
  return (
    <Fragment>
      <Card className="text-right h-auto">
        <Card.Header as="h5" dir="rtl">
          חברי הוועדה:
        </Card.Header>
        <Card.Body>
          <Card.Title>להלן טבלה עם פרטי חברי הוועדה:</Card.Title>
          <Card.Text>
            <Table responsive="sm" dir="rtl">
              <thead>
                <tr>
                  <th>#</th>
                  <th>שם:</th>
                  <th>תפקיד:</th>
                  <th>טלפון:</th>
                  <th>E-mail:</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                <img className="avatar" alt="avatar" src={avatar}></img>
                  <td>1</td>
                  <td>ישראל ישראלי</td>
                  <td>יו"ר הוועדה</td>
                  <td>052-111111</td>
                  <td>
                    <a href="mailto:israel_israeli@gmail.com">
                      israel_israeli@gmail.com
                    </a>
                  </td>
                </tr>
                <tr>
                <img className="avatar" alt="avatar" src={avatar}></img> 
                  <td>2</td>
                  <td>פלוני אלמוני</td>
                  <td>סגן יו"ר הוועדה</td>
                  <td>052-2222222</td>
                  <td>
                    <a href="mailto:ploni_almoni@gmail.com">
                      ploni_almoni@gmail.com
                    </a>
                  </td>
                </tr>
                <tr>
                <img className="avatar" alt="avatar" src={avatar}></img>
                  <td>3</td>
                  <td>ג'יין דו</td>
                  <td>גזברית</td>
                  <td>052-3333333</td>
                  <td>
                    <a href="mailto:Jane_Doe@gmail.com">Jane_Doe@gmail.com</a>
                  </td>
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
