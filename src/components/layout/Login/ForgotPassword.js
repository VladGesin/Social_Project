import React, { Component, Fragment } from 'react';
import style from './Login.module.scss';
import { Validation } from '../Validation/Validation';
import Context from '../../../store/Context';
import {StaticRouter as Router,Route} from 'react-router-dom'

export class ForgotPassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isValidIdAndPassword: true,
			id: {
				isValid: true,
				msg: ''
			},
			password1: {
				isValid: true,
				msg: ''
			},
			password2: {
				isValid: true,
				msg: ''
			}
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
		let [ isValidId, msgId ] = validator.isValidId(this.inputId);
		let [ isValidPassword1, msgPass1 ] = validator.isValidPassword(this.inputPassword);
		let [ isValidPassword2, msgPass2 ] = validator.isValidPassword(this.inputPassword);
		this.setState({
			id: {
				isValid: isValidId,
				msgId
			},
			password1: {
				isValid: isValidPassword1,
				msgPass1
			},
			password2: {
				isValid: isValidPassword2,
				msgPass2
			}
		});

		if (isValidId && isValidPassword1 && isValidPassword2 && isValidPassword1==isValidPassword2 ) {

			this.checkUserDetails();
		}
	};
	invalidCredentials = () => {
		this.setState({ isValidIdAndPassword: false });
	};
	checkUserDetails = async () => {
		try {
			this.context.ForgotPassword(this.inputId, this.inputPassword, this.invalidCredentials);
			sessionStorage.setItem(
				'tempUser',
				JSON.stringify({
					id: this.inputId,
					password: this.inputPassword
				})
			);
		} catch (error) {
			console.log(error);
		}
	};

	render() {
		return (
			<Router location="/ForgotPassword" context={this.staticContext}>
			<Fragment>
				<div className={style.login}>
					<div className={style.loginCard}>
						<h2>איפוס סיסמה</h2>
						<div className={style.inputContainer}>
							<input
							    placeholder="הזן תעודת זהות"
							    onChange={(e) => this.handleInputID(e)}
							    type="text" />
							<p>כולל ספרת ביקורת</p>
							{!this.state.id.isValid && <p className={style.p}>{this.state.id.msgId}</p>}
							<span id="IDError" />
						</div>
						<div className={style.inputContainer}>
							<input
								id="login"
								type="password"
								placeholder="הסיסמה החדשה"
								onChange={(e) => this.handleInputPassword(e)}
							/>
							{!this.state.password1.isValid && <p className={style.p}>{this.state.password.msgPass}</p>}
						</div>
						<div className={style.inputContainer}>
							<input
								id="login"
								type="password"
								placeholder="שוב הסיסמה החדשה"
								onChange={(e) => this.handleInputPassword(e)}
							/>
							{!this.state.password2.isValid && <p className={style.p}>{this.state.password.msgPass}</p>}
						</div>
						<div className={style.btnContainer}>
							{!this.state.isValidIdAndPassword && <p className={style.p}>שם משתמש או סיסמה שגויים</p>}
							<button onClick={this.ValidetionInputIdAndPassword}> שמירת פרטים וכניסה</button>
						</div>
					</div>
				</div>
			</Fragment>
			</Router>
		);
	}
}

export default ForgotPassword;
