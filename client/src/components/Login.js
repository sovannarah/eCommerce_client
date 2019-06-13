import React from 'react';
import Menu from '../img/icon/icon-menu.png';
import Logo from '../img/Utils-IMG/logo.png';
import Account from '../img/icon/icon-user.png'
import Cart from '../img/icon/icon-panier.png';
import Cartt from '../img/icon/icon-black-panier.png';
import account from '../img/icon/icon.png';
import Smoke from '../img/icon/smoke.png';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';
// import axios from 'axios';

import '../style/css/login.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionToken: null,
            email: '',
            password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }
    componentDidMount() {
        this.setState({ isLoading: true });

        fetch("10.34.7.0:8001/login")
            .then(response => response.json())
            .then(data => this.setState({
                email: "",
                password: "",
                isLoading: false
            }))
            .catch(error => this.setState({ error, isLoading: false }));
    }

    handleSubmit(e) {
        e.preventDefault();
        this.oktaAuth.signIn({
            email: this.state.email,
            password: this.state.password
        })
            .then(res => this.setState({
                sessionToken: res.sessionToken
            }))
            .catch(err => {
                this.setState({ error: err.message });
                console.log(err.statusCode + ' error', err)
            });
    }
    handleEmailChange(e) {
        this.setState({ email: e.target.value });
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    render() {
        return (
            <div>
                <div className="login-img">
                    <img src={Smoke} />
                </div>
                <div className="login">
                    <div className="icon-login">
                        <img className="icon-cart mt-auto mb-auto" src={account} />
                        <img className="icon-cart mt-auto mb-auto" src={Cartt} />
                    </div>
                    <div className="title">
                        <h1>Login</h1>
                    </div>
                    <div className="form">
                        <form action="" method="post">
                            <div className="form-group">
                                <label for="email">Email:</label>
                                <input
                                    onChange={this.handleEmailChange}
                                    type="text"
                                    class="form-control"
                                    name="email"
                                />
                            </div>
                            <div className="form-group">
                                <label for="email">Password:</label>
                                <input
                                    onChange={this.handlePasswordChange}
                                    type="password"
                                    class="form-control"
                                    name="password"
                                />
                            </div>
                            <button className="btn btn-dark" type>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}

export default Login;