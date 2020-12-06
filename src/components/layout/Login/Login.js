import React, { Component, Fragment } from 'react';
import logo from '../../Icons/LoginLogo/loginlogoimg.png';
import style from "./Login.module.scss"
import { Validation } from "../Validation/Validation";
import Context from "../../../store/Context";

export class Login extends Component {
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
    } catch (error) {
       console.log(error);
    }
 };
 
  render() {
    return (
      <Fragment>
        <div className={style.login}>
        <div className="col-sm">
              <img src={logo} alt="logologin" ></img>
            </div>
        <div className={style.loginCard}>
        <h2>ברוכים הבאים</h2>
        <div className={style.inputContainer}>
          <input placeholder="תעודת זהות"
          onChange={(e) => this.handleInputID(e)}
          type="text"/>
          {!this.state.id.isValid && (
          <p className={style.p}>{this.state.id.msgId}</p>)}
          <span>כולל ספרת ביקורת</span>
            <span id="IDError"></span>
        </div>
        <div className={style.inputContainer}>
          <input type="password" 
           placeholder="סיסמה"
           onChange={(e) => this.handleInputPassword(e)} />
          {!this.state.password.isValid && (
           <p className={style.p}>{this.state.password.msgPass}</p>)}
        </div>
        <div className={style.btnContainer}>
        {!this.state.isValidIdAndPassword && (
                     <p className={style.p}>שם משתמש או סיסמה שגויים</p>
                  )}
        <button onClick={this.ValidetionInputIdAndPassword}>כניסה</button>
        
        </div>
        <span><a href="#"> שכחתי סיסמה</a></span>
        </div>
        </div>
      </Fragment>
    );
  }
}

export default Login;

