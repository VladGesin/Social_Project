import React, { Component, Fragment } from 'react';
import style from './Login.module.scss';
import { Validation } from '../Validation/Validation';
import Context from '../../../store/Context';

export class PasswordReset extends Component {
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
	componentDidMount() {
		if (this.context.userState.isAuth) {
			this.props.history.push('/Social_Project/MainWin');
		}
	}
	componentDidUpdate() {
		if (this.context.userState.isAuth) {
			this.props.history.push('/Social_Project/MainWin');
		}
	}

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

		if (isValidId && isValidPassword1 && isValidPassword2 && isValidPassword1 == isValidPassword2) {
			this.checkUserDetails();
		}
	};
	invalidCredentials = () => {
		this.setState({ isValidIdAndPassword: false });
	};

	checkUserDetails = async () => {
		try {
			//  const response = await fetch(
			//     "https://www.hitprojectscenter.com/Social-api//users/:id",
			//     {
			//        headers: {
			//           "Content-Type": "application/json",
			//        },
			//        method: "PATCH",
			//        body: JSON.stringify({
			//           userID: this.inputId,
			//        }),
			//     }
			//  );
			//  console.log(response);
			//  console.log(this.inputId);
			//  const token = await response.json();
			//  console.log(daysSinceLastPasswordChange);
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
			<div>
				<form onSubmit={this.onKeyUp} className={style.login}>
					<div className={style.PassCard}>
						<h2>איפוס סיסמה</h2>
						<div className={style.inputContainer}>
							<input
								id="login"
								type="password"
								placeholder="סיסמה חדשה"
								onChange={(e) => this.handleInputPassword(e)}
							/>
							{!this.state.password1.isValid && (
								<p className={style.p}>{this.state.password1.msgPass1}</p>
							)}
						</div>
						<div className={style.inputContainer}>
							<input
								id="login"
								type="password"
								placeholder="אימות סיסמה"
								onChange={(e) => this.handleInputPassword(e)}
							/>
							{!this.state.password2.isValid && (
								<p className={style.p}>{this.state.password2.msgPass2}</p>
							)}
						</div>
						<div className={style.inputContainer}>
							<div className={style.btnContainer}>
								{!this.state.isValidIdAndPassword && <p className={style.p}>ת"ז או סיסמה שגויים</p>}
								<button onClick={this.ValidetionInputIdAndPassword}> איפוס סיסמה</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default PasswordReset;
