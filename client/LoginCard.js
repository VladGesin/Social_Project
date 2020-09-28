import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import validator from 'validator';

export class LoginCard extends Component {

  handleInputID = e => {
    let ID = e.target.value;
    if (validator.isEmpty(ID)) {
    document.getElementById("IDAmount").innerText = "ID can not be empty";
      //return 'ID is required';
    } else if (!validator.isLength(ID, { min: 9 })) {
      document.getElementById("IDAmount").innerText = 'ID should be minimum 9 characters';
    }
    else{
      document.getElementById("IDAmount").innerText = '';
    }
  }
  handleInputPassword = e => {
    let password = e.target.value;
    if (validator.isEmpty(password)) {
    document.getElementById("passAmount").innerText = "password cant be empty";
      //return 'Password is required';
    } else if (!validator.isLength(password, { min: 8 })) {
      document.getElementById("passAmount").innerText = 'Password should be minimum 8 characters';
    }
    else{
      document.getElementById("passAmount").innerText = '';
    }
  }
 


  render() {
    return (
      <Fragment>
        <Form className="text-right">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>תעודת זהות</Form.Label>
            <Form.Control type="id" placeholder="123456789" onChange={e => this.handleInputID(e)}  />
            <span id="IDAmount"></span>
            <Form.Text className="text-muted">
              אתר זה לא ישתף את פרטיך לעולם
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>סיסמא</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={e => this.handleInputPassword(e)} />
            <span id="passAmount"></span>
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


