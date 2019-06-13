import React from 'react';
import Menu from '../img/icon/icon-menu.png';
import Logo from '../img/Utils-IMG/logo.png';
import Account from '../img/icon/icon-user.png'
import Cart from '../img/icon/icon-panier.png';
import Cartt from '../img/icon/icon-black-panier.png';
import account from '../img/icon/icon.png';
import Smoke from '../img/icon/smoke.png';

import '../style/css/login.css';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: true }
    }

    onClick = async () => {

        await fetch('10.34.7.0:8001/register', {
            method: "POST",
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => response.json()).then((responseJson) => {
            console.log(responseJson);
            //home();
        })
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
                        <h1>Register</h1>
                    </div>
                    <div className="form">
                        <form action="" method="post">
                            <div className="form-group">
                                <label for="email">Email:</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    name="email"
                                />
                            </div>
                            <div className="form-group">
                                <label for="email">Password:</label>
                                <input
                                    type="password"
                                    class="form-control"
                                    name="password"
                                />
                            </div>
                            <button className="btn btn-dark" type>Subscribe</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}

export default Register;