import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Validation} from "../../Validation/Validation";


export class LoginCard extends Component {

  handleInputID = e => {
    this.inputId = e.target.value;
  }
  handleInputPassword = e => {
    this.inputPassword = e.target.value;
  }
  ValidetionInputIdAndPassword = () => {
     let validator = new Validation();
     let isValidId = validator.isValidId(this.inputId);
     let isValidPassword = validator.isValidPassword(this.inputPassword);
    if(isValidId && isValidPassword)
    {
     this.checkUserDetails();
    }
  }
  checkUserDetails = async () => {
    try{
      const response = await fetch('http://localhost:8080/loginManager/login', {
      headers:{
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        password: this.inputPassword,
        userID: this.inputId
        })
      });
      console.log(response);
      console.log(this.inputId, this.inputPassword); 
      const token = await response.json();
      console.log(token);
    }
    catch(error){
      console.log(error);
    }
}

  render(){
    return (
      <Fragment>
        <Form className="text-right">
          <Form.Group controlId="formBasicID">
            <Form.Label>תעודת זהות</Form.Label>
            <Form.Control  placeholder='ת"ז המכילה ספרות 0-9 כולל ספרת ביקורת' onChange={e => this.handleInputID(e)}  type="text" /> 
            <span id="IDError"></span>
            <Form.Text className="text-muted">
              אתר זה לא ישתף את פרטיך לעולם
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>סיסמא</Form.Label>
            <Form.Control type="password" placeholder="הקלד את סיסמתך"  onChange={e => this.handleInputPassword(e)} />
            <span id="passError"></span>
            <Form.Text className="text-muted">
            דרישות לסיסמא :
            *לא תכיל שם פרטי / משפחה  
            *אורך 6 תווים לפחות 
            *תכיל לפחות ספרה אחת, לפחות אות גדולה ואות קטנה באנגלית ותו מיוחד
            *תוקף הסיסמא 180 ימים 
            </Form.Text>
          </Form.Group> 
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="השאר אותי מחובר" />
          </Form.Group>
          <Link to="/MainWin">
            <button variant="primary" type="submit" onClick={this.ValidetionInputIdAndPassword} >
              כניסה
            </button>
          </Link>
         </Form>
      </Fragment> 
    );
  }
}
// 
export default LoginCard;
