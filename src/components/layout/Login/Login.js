import React, { Component} from 'react';
import logo from '../../Icons/LoginLogo/loginlogoimg.png';
import style from './Login.module.scss';
import { Validation } from '../Validation/Validation';
import Context from '../../../store/Context';
import { Link,Switch,Route, Router, BrowserRouter } from 'react-router-dom';
// import ForgotPassword from "../Login/ForgotPassword"
// import { useHistory } from "react-router-dom";
// import { ReactDOM } from "react-dom";
// import App from '../../../App';
// import { Navbar, Nav, NavDropdown } from "react-bootstrap";
// import { NavLink } from "react-router-dom";
// import "./navbar.css";

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

	// OnClickForgotPassword = (e) => {
	// 	//e.preventDefault();
	// 	useHistory().push("/ForgotPassword");

	// };
	invalidCredentials = () => {
		this.setState({ isValidIdAndPassword: false });
	};
	checkUserDetails = async () => {
		try {
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
				// <Route></Route>
				<div className={style.login}>
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
						<div className={style.btnContainer}>
							{!this.state.isValidIdAndPassword && <p className={style.p}>שם משתמש או סיסמה שגויים</p>}
							<button onClick={this.ValidetionInputIdAndPassword}>כניסה</button>
						</div>
						<div>
							<Link to="/Social_Project/ForgotPassword"><div> שכחתי סיסמה </div></Link> 
						</div>
						{/* <Route path="\ForgotPassword" component={ForgotPassword}></Route> */}
					</div>
					{/* <BrowserRouter><render></render></BrowserRouter>	 */}
				</div>
				
				
		);
	}

	
}
// ReactDOM.render(<BrowserRouter><App></App></BrowserRouter>)

export default Login;
