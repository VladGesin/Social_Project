import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Validation } from "../../Validation/Validation";
import Context from "../../../../store/Context";

export class LoginCard extends Component {
   constructor(props) {
      super(props);
      this.state = {
         isValidIdAndPassword: true,
         id: {
            isValid: true,
            msg: "",
         },
         password: {
            isValid: true,
            msg: "",
         },
      };
   }

   static contextType = Context;

   handleInputID = (e) => {
      this.inputId = e.target.value;
   };
   handleInputPassword = (e) => {
      this.inputPassword = e.target.value;
   };
   ValidetionInputIdAndPassword = (e) => {
      e.preventDefault();

      let validator = new Validation();
      let [isValidId, msgId] = validator.isValidId(this.inputId);
      let [isValidPassword, msgPass] = validator.isValidPassword(
         this.inputPassword
      );
      this.setState({
         id: {
            isValid: isValidId,
            msgId,
         },
         password: {
            isValid: isValidPassword,
            msgPass,
         },
      });

      if (isValidId && isValidPassword) {
         this.checkUserDetails();
      }
   };
   invalidCredentials = () => {
      this.setState({ isValidIdAndPassword: false });
   };
   checkUserDetails = async () => {
      try {
         this.context.login(
            this.inputId,
            this.inputPassword,
            this.invalidCredentials
         );
         sessionStorage.setItem(
            "tempUser",
            JSON.stringify({
               id: this.inputId,
               password: this.inputPassword,
            })
         );

         //  const response = await fetch(
         //     "http://localhost:8080/loginManager/login",
         //     {
         //        headers: {
         //           "Content-Type": "application/json",
         //        },
         //        method: "POST",
         //        body: JSON.stringify({
         //           password: this.inputPassword,
         //           userID: this.inputId,
         //        }),
         //     }
         //  );
         //  console.log(response);
         //  console.log(this.inputId, this.inputPassword);
         //  const token = await response.json();
         //  console.log(token);
      } catch (error) {
         console.log(error);
      }
   };

   render() {
      if (this.context.userState.isAuth) {
         return <Redirect to="/Social_Project/MainWin" />;
      } else {
         return (
            <Fragment>
               <Redirect to="/Social_Project" />
               <Form className="text-right">
                  <Form.Group controlId="formBasicID">
                     <Form.Control
                        placeholder='תעודת זהות'
                        onChange={(e) => this.handleInputID(e)}
                        type="text"
                        
                     />
                        <sapn> כולל ספרת ביקורת*</sapn>
                     {!this.state.id.isValid && (
                        <p style={{ color: "red" }}>{this.state.id.msgId}</p>
                     )}
                     <span id="IDError"></span>
                  </Form.Group>
                  {/* <Form.Text className="text-muted">
                        כולל ספרת ביקורת*
                     </Form.Text> */}
                  <Form.Group controlId="formBasicPassword">
                     <Form.Control
                        type="password"
                        placeholder="סיסמא"
                        onChange={(e) => this.handleInputPassword(e)}
                     />
                     {!this.state.password.isValid && (
                        <p style={{ color: "red" }}>
                           {this.state.password.msgPass}
                        </p>
                     )}
                     <span id="passError"></span>
                  </Form.Group>
                  {!this.state.isValidIdAndPassword && (
                     <p style={{ color: "red" }}>שם משתמש או סיסמא שגויים</p>
                  )}
                  <Button
                     variant="primary"
                     type="submit"
                     onClick={this.ValidetionInputIdAndPassword}
                  >
                     כניסה
                  </Button>
                  <p> שכחת <a href="#">?סיסמא</a>
            </p>  
               </Form>
            </Fragment>
         );
      }
   }
}
//
export default LoginCard;
