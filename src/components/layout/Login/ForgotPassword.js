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
	checkPasswordDetails = async () => {
			try{
			  const response = await fetch('http://localhost:8080//changePassword/:id.', {
			  headers:{
				'Content-Type': 'application/json'
			  },
			  method: 'POST',
			  body: JSON.stringify({
				password: this.inputEmail,
				userID: this.inputId
				})
			  });
			  console.log(response);
			  console.log(this.inputId, this.inputEmail); 
			  const token = await response.json();
			  console.log(token);
			  
			}
			catch(error){
			  console.log(error);
			}
		}
	checkUserDetails = async () => {
		try {
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
			<Router location="/ForgotPassword" context={this.staticContext}>
			<Fragment>
				<div className={style.login}>
					<div className={style.PassCard}>
						<h2>איפוס סיסמה</h2>
						<div className={style.inputContainer}>
							<p>יש להזין תעודת זהות על מנת לקבל מייל לאיפוס סיסמא</p>
							<p> </p>
							<input
							    placeholder="תעודת זהות"
							    onChange={(e) => this.handleInputID(e)}
							    type="text" />
							<p>כולל ספרת ביקורת</p>
							{!this.state.id.isValid && <p className={style.p}>{this.state.id.msgId}</p>}
							<span id="IDError" />
						</div>
						<div className={style.btnContainer}>
							{!this.state.isValidIdAndEmail && <p className={style.p}>ת"ז שגויה</p>}
							<button onClick={this.ValidetionInputIdAndEmail}> שליחת אימייל</button>
						</div>
					</div>
				</div>
			</Fragment>
			</Router>
		);
	}
}

export default ForgotPassword;
