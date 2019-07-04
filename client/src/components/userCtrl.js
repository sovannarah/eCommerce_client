import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import FacebookLogin from 'react-facebook-login';

let ip = 'http://127.0.0.1:8000';

class UserCtrl extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.login = this.login.bind(this);
        this.disconnect = this.disconnect.bind(this);
        this.ip = 'http://127.0.0.1:8000';
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
            .then(res => {
                const user = res.data;
                console.log(user.token)
                if (user.token) {
                    for( let [key, value] of Object.entries(user)) {
                        localStorage.setItem(key, value);
                        window.location.replace('/');
                    }
                }
            })
    }

    disconnect() {
        localStorage.clear();
        window.location.replace('/')
    }

    render() {
        const responseFacebook = (response) => {
            if(response) {
                for( let [key, value] of Object.entries(response)) {
                    // console.log(key, value);
                    localStorage.setItem(key, value);
                    window.location.replace('/');
                }
            }
        }
        if (this.props.user || localStorage.getItem("userID")) {
            return (
                <div id="menu-user" className="d-flex flex-column justify-content-around bg-light open">
                    <Link to="/admin">Admin Space</Link>
                    <Link to="/account">My Account</Link>
                    <button className="btn-mainly ml-auto mr-auto" onClick={this.disconnect}>Disconnect</button>
                </div>

            )
        } else {
            return (
                <div id="menu-user" className="d-flex flex-column justify-content-around bg-light open">
                    <input id="input-username"
                           className="col-12"
                           onChange={this.changeEmail}
                           placeholder="Email  "
                           type="text"/>
                    <input id="input-password"
                           className="col-12"
                           onChange={this.changePassword}
                           type="password"
                           placeholder="password"
                    />
                    <input id="connect-button"
                           onClick={this.login}
                           value="Connection"
                           className="btn-default bg-mainly"
                           type="submit"
                    />
                    <FacebookLogin
                        appId="1117381818464159" //APP ID NOT CREATED YET
                        fields="name,email,picture"
                        callback={responseFacebook}
                        className="btn-facebook"
                    />
                    <p>Not registered? <Link to="/register">Sign In</Link></p>
                </div>
            );
        }
    }
}

export default UserCtrl;