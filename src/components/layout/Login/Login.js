import React, { Component } from 'react';
import logo from '../../Icons/LoginLogo/loginlogoimg.png';
import style from './Login.module.scss';
import { Validation } from '../Validation/Validation';
import Context from '../../../store/Context';
import { Link } from 'react-router-dom';
import api from '../../../../src/api';

export class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isValidIdAndPassword: true,
			id: {
				isValid: true,
				msg: ''
			},
			isExpired: false,
			password: {
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
		let [ isValidPassword, msgPass ] = validator.isValidPassword(this.inputPassword);
		this.setState({
			id: {
				isValid: isValidId,
				msgId
			},
			password: {
				isValid: isValidPassword,
				msgPass
			}
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
			//  Get token if credentials are valid
			const res = await api.post('/loginManager/login/', {
				password: this.inputPassword,
				userID: this.inputId
			});
			const token = res.data.token[0].token;

			let response = await fetch('https://www.hitprojectscenter.com/Social-api/loginManager/passwordExceeded/', {
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({
					userID: this.inputId,
					password: this.inputPassword
				})
			});
			console.log(response);
			console.log(this.inputId);
			response = await response.json();
			const daysSinceLastPasswordChange = response[0].daysSinceLastPasswordChange;
			console.log(daysSinceLastPasswordChange);
			//תנאים הפוכים לצורך בדיקת כניסה לדף הבית
			//>=180
			if (daysSinceLastPasswordChange <= 180) {
				this.context.setIsExpired(true);
				this.context.login(this.inputId, this.inputPassword, this.invalidCredentials);
			}
			if (daysSinceLastPasswordChange >= 175 && daysSinceLastPasswordChange < 180) {
				this.context.setIsExpired(true);
				this.props.history.push('/Social_Project/ForgotPassword');
			} else {
				this.context.login(this.inputId, this.inputPassword, this.invalidCredentials);
			}
		} catch (error) {
			console.log(error);
		}
	};
	changeIsExpired = () => {
		this.context.setIsExpired(false);
		console.log(this.context.isExpired());
	};

	render() {
		return (
			<div>
				<form onSubmit={this.onKeyUp} className={style.login}>
					<div>
						<img src={logo} alt="logologin" />
					</div>
					<div className={style.loginCard}>
						<h2>ברוכים הבאים</h2>
						<div className={style.inputContainer}>
							<input placeholder="תעודת זהות" onChange={(e) => this.handleInputID(e)} type="text" />
							<p>כולל ספרת ביקורת</p>
							{!this.state.id.isValid && <p className={style.p}>{this.state.id.msgId}</p>}
							<div id="IDError" />
						</div>
						<div className={style.inputContainer}>
							<input type="password" placeholder="סיסמה" onChange={(e) => this.handleInputPassword(e)} />
							{!this.state.password.isValid && <p className={style.p}>{this.state.password.msgPass}</p>}
						</div>
						<div className={style.inputContainer}>
							<div className={style.btnContainer}>
								{!this.state.isValidIdAndPassword && <p className={style.p}>ת"ז או סיסמה שגויים</p>}
								<button onClick={this.ValidetionInputIdAndPassword}>כניסה</button>
								<Link onClick={this.changeIsExpired} to="/Social_Project/ForgotPassword">
									<p> שכחתי סיסמה </p>
								</Link>
							</div>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default Login;
