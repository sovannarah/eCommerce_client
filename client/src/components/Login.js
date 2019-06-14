import React from 'react';

import axios from 'axios';

import '../style/css/login.css';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.addr = "http:\//10.34.7.0:8001";
		this.state = { isLoading: true };
		this.loginFunc = this.loginFunc.bind(this);
		this.change = this.change.bind(this);
	}
	/**
	 * save the user info email, password in this state
	 * @param event
	 */
	change(event)
	{
		if (event.target.name === 'email')
			this.setState({email: event.target.value});
		else if (event.target.name === 'password')
			this.setState({password: event.target.value});
	}

	/**
	 * send axios request email password
	 * @succes redirect to /
	 * @error display the error
	 * @param event
	 */
	loginFunc(event)
	{
		event.preventDefault();
		axios.post(this.addr + "/login", {email: this.state.email,
			password: this.state.password}).then(
			(response) => {
				if (response.data.errors)
					this.error = response.data.errors;
				else
				{
					localStorage.setItem('token', response.data.token)
					window.location.replace("/");
				}
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
					<h1>Login</h1>
				</div>
				<div className="form">
					<form action="" method="post">
						<div className="form-group">
							<label htmlFor="email">Email:</label>
							<input
								type="text"
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
								onChange={this.change} />
						</div>
						<button className="btn btn-dark" onClick={this.loginFunc.bind(this)}>Login</button>
					</form>
				</div>
			</div>
		);
	}

}

export default Login;