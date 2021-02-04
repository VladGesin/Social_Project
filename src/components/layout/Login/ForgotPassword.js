import React, { Component, Fragment } from 'react';
import style from './Login.module.scss';
import { Validation } from '../Validation/Validation';
import Context from '../../../store/Context';
import {StaticRouter as Router,Route} from 'react-router-dom'

export class ForgotPassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isValidIdAndEmail: true,
			id: {
				isValid: true,
				msg: ''
			}
		};
	}

	static contextType = Context;
	componentDidMount() {
		if (this.context.userState.isAuth) {
		   this.props.history.push("/Social_Project/MainWin");
		}
	 }
	 componentDidUpdate() {
		if (this.context.userState.isAuth) {
		   this.props.history.push("/Social_Project/MainWin");
		}
	 }

	handleInputID = (e) => {
		this.inputId = e.target.value;
	};
	ValidetionInputIdAndEmail = (e) => {
		e.preventDefault();

		let validator = new Validation();
		let [ isValidId, msgId ] = validator.isValidId(this.inputId);
		this.setState({
			id: {
				isValid: isValidId,
				msgId
			}
		});

		if (isValidId) {

			this.checkUserDetails();
		}
	};
	invalidCredentials = () => {
		this.setState({ isValidIdAndPassword: false });
	};

	checkUserDetails = async () => {
		try {
			 //  const response = await fetch(
         //     "https://www.hitprojectscenter.com/Social-api//loginManager/passwordExceeded/",
         //     {
         //        headers: {
         //           "Content-Type": "application/json",
         //        },
         //        method: "POST",
         //        body: JSON.stringify({
         //           userID: this.inputId,
         //        }),
         //     }
         //  );
         //  console.log(response);
         //  console.log(this.inputId);
         //  const token = await response.json();
		 //  console.log(daysSinceLastPasswordChange);
			this.context.ForgotPassword(this.inputId, this.inputEmail, this.invalidCredentials);
			sessionStorage.setItem(
				'tempUser',
				JSON.stringify({
					id: this.inputId,
					password: this.inputEmail
				})
			);
		} catch (error) {
			console.log(error);
		}
	};

	render() {
		return (
				<div>
				<form onSubmit={this.onKeyUp}  className={style.login}>
					<div className={style.PassCard}>
						<h2>איפוס סיסמה</h2>
						<div className={style.inputContainer}>
							<p>יש להזין תעודת זהות על מנת לקבל מייל לאיפוס סיסמה</p>
							<p> </p>
							<input
							    placeholder="תעודת זהות"
							    onChange={(e) => this.handleInputID(e)}
							    type="text" />
							<p>כולל ספרת ביקורת</p>
							{!this.state.id.isValid && <p className={style.p}>{this.state.id.msgId}</p>}
							<span id="IDError" />
						</div>
						<div className={style.inputContainer}>
						<div className={style.btnContainer}>
							{!this.state.isValidIdAndEmail && <p className={style.p}>ת"ז שגויה</p>}
							<button onClick={this.ValidetionInputIdAndEmail}> שליחת אימייל</button></div>
						</div>
					</div>
				 </form>
				</div>
		);
	}
}

export default ForgotPassword;
