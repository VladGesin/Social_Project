import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import validator from 'validator';

function isValidIsraeliID(id) {
  var id = String(id).trim();
  if (id.length > 9 || id.length < 5 || isNaN(id)) return false;
  // Pad string with zeros up to 9 digits445
    id = id.length < 9 ? ("00000000" + id).slice(-9) : id;
    return Array
            .from(id, Number)
          .reduce((counter, digit, i) => {
          const step = digit * ((i % 2) + 1);
                return counter + (step > 9 ? step - 9 : step);
          }) % 10 === 0;
}
  export class Validation extends Component {
  
    handleInputID = e => {
      this.inputId = e.target.value;
    }
    handleInputPassword = e => {
      this.inputPassword = e.target.value;
    }
    handleInputEmail = e => {
      this.inputEmail = e.target.value;
    }

    isValidId(inputId){
      
      let isValid = false;
      let message = '';
      if (inputId == "" || inputId == null) {
        message = 'ת"ז ריקה, אנא מלא 9 ספרות חוקיות';
      }
      else if (!/^[0-9]+$/.test(inputId)) 
      {
        message = 'ת"ז לא יכולה להכיל תווים, רק מספרים';
      }
      else if (!validator.isLength(inputId, { min: 9 })) 
      {
        message = 'ת"ז מכילה לפחות 9 ספרות';
      }
      else if (isValidIsraeliID(this.inputId) != false)
      {
        isValid = true;
      }
      else  
      {
        message = 'ת"ז לא תקינה';
      }
      if(!isValid)
      {
        alert(message);
      }
      return isValid;

    }

    isValidPassword(inputPassword) {
      let isValid = false;
      let message = '';
      var regularExpression = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&])$";
      
      if (inputPassword == "" || inputPassword == null) {
        message ='סיסמתך לא יכולה להיות ריקה';
      } 
      else if (!validator.isLength(inputPassword, { min: 6 })) 
      {
        message ='סיסמתך חייבת להיות לפחות 6 תווים';
      }
      else if (inputPassword != regularExpression) 
      {
        message ='סיסמתך חייבת להכיל לפחות אות אחת גדולה, אות אחת קטנה ותו מיוחד';
        }
      else
      {
      alert('!סיסמא תקינה');
      isValid = true;
      }
      if(!isValid)
      {
        alert(message);
      }
      return isValid;
    }

    isValidEmail(inputEmail) {
      let isValid = false;
      let message = '';
      if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.inputEmail)){
      message= "כתובת מייל תקינה";
      }
      else {
          message="כתובת מייל לא תקינה, נא הזן שנית";
       }
      if(!isValid){
        alert(message);
      }
      return isValid;
  }

}
export default Validation;