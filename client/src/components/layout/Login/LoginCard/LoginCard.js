import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export class LoginCard extends Component {
  render() {
    return (
      <Fragment>
        <Form className="text-right">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>תעודת זהות</Form.Label>
            <Form.Control type="email" placeholder="123456789" />
            <Form.Text className="text-muted">
              אתר זה לא ישתף את פרטיך לעולם
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>סיסמא</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="השאר אותי מחובר" />
          </Form.Group>
          <Link to="/MainWin">
            <Button variant="primary" type="submit" onClick={() => {}}>
              כניסה
            </Button>
          </Link>
        </Form>
      </Fragment>
    );
  }
}

export default LoginCard;
