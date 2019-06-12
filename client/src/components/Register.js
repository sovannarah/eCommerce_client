import React from 'react';
import Menu from '../img/icon/icon-menu.png';
import Logo from '../img/Utils-IMG/logo.png';
import Account from '../img/icon/icon-user.png'
import Cart from '../img/icon/icon-panier.png';
import axios from 'axios';
import '../style/css/header.css';

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isLoading: true };
		this.addr = "http:\/\/127.0.0.1:8000";
		this.change = this.change.bind(this);
		this.subscribef = this.subscribef.bind(this);
	}

	/**
	 * save the user info email, username, password
	 * @param event
	 */
	change(event)
	{
		if (event.target.name === 'email')
			this.setState({email: event.target.value});
		else if (event.target.name === 'username')
			this.setState({username: event.target.value});
		else if (event.target.name === 'password')
			this.setState({password: event.target.value});
	}

	/**
	 * send post request to th api
	 * @success: redirect to /login
	 * @error: say bad no redirect
	 * @param event
	 */
	subscribef(event)
	{
		event.preventDefault();
		axios.post("http:/\/127.0.0.1:8000/register", {email: this.state.email,
			password: this.state.password}).then(
			(response) =>
			{
				if (response.data.errors)
				{
					console.log(response.data.errors)
					this.state.error = response.data.errors;
				}
				else
					window.location.replace('/login');
			},
			(error) =>
			{
				console.log(error);
			}
		);
	}

	render() {
		return (
			<div className="login">
				<div className="title">
					<h1>Register</h1>
				</div>
				<div className="form">
					<form action="" method="post">
						<div className="form-group">
							<label htmlFor="email">Email:</label>
							<input
								type="email"
								className="form-control"
								name="email"
							onChange={this.change}/>
						</div>
						<div className="form-group">
							<label htmlFor="password">Password:</label>
							<input
								type="password"
								className="form-control"
								name="password"
								onChange={this.change}/>
						</div>
						<div className="form-group">
							<label htmlFor="username">User name:</label>
							<input
								type="text"
								className="form-control"
								name="username"
								onChange={this.change}/>
						</div>
						<button className="btn btn-dark" onClick={this.subscribef.bind(this)}>Subscribe</button>
					</form>
				</div>
			</div>
		);
	}

}

export default Register;