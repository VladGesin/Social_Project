import React, { Component} from 'react';
import logo from '../../Icons/LoginLogo/loginlogoimg.png';
import style from './Login.module.scss';
import { Validation } from '../Validation/Validation';
import Context from '../../../store/Context';
import { Link } from 'react-router-dom';

export class Login extends Component {
	

	constructor(props) {
		super(props);
		this.state = {
			isValidIdAndPassword: true,
			id: {
				isValid: true,
				msg: ''
			},
			password: {
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
			 //  const response = await fetch(
         //     "https://www.hitprojectscenter.com/Social-api/loginManager/passwordExceeded/",
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
		//  if(daysSinceLastPasswordChange == 180 || daysSinceLastPasswordChange <= 175){}
		//  if(daysSinceLastPasswordChange <= 0 && daysSinceLastPasswordChange >= 175){}
			this.context.login(this.inputId, this.inputPassword, this.invalidCredentials);
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
					<form onSubmit={this.onKeyUp}  className={style.login}>
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
							<Link to="/Social_Project/ForgotPassword"><p> שכחתי סיסמה </p></Link></div>
						</div>	 
					</div>
				 </form>
				</div>
			
				
		);
	}
}

export default Login;
