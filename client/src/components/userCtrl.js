import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
let ip='http://10.34.7.68:8000';

class UserCtrl extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.login = this.login.bind(this);
        this.disconnect = this.disconnect.bind(this);
    }

    changeEmail(e) {
        this.setState({email: e.target.value});
    }

    changePassword(e) {
        this.setState({password: e.target.value});
    }

    login(e) {
        e.preventDefault();
        axios.post(ip + '/login', {email: this.state.email, password: this.state.password})
            .then(res=> {
                const user = res.data;
                console.log(res.data);
                if(user.token) {
                    localStorage.setItem('token' , user.token);
                    localStorage.setItem('email', user.email);
                }
            })
    }

    disconnect() {
        localStorage.clear();
    }

    render() {

        if(this.props.user) {
            return (
                <div id="menu-user" className="d-flex flex-column justify-content-around bg-light open">
                    <Link to="/admin">My Account</Link>
                    <button onClick={this.disconnect}>Disconnect</button>
                </div>
            )
        } else {
            return (
                <div id="menu-user" className="d-flex flex-column justify-content-around bg-light open">
                    <input id="input-username" className="col-12" onChange={this.changeEmail} type="text"></input>
                    <input id="input-password" className="col-12" onChange={this.changePassword} type="password"></input>
                    <input id="connect-button" onClick={this.login} value="Connection" className="btn-default" type="submit" />
                    <p>Not registered? <Link to="/register">Sign In</Link></p>
                </div>
            );
        }
    }
}

export default UserCtrl;