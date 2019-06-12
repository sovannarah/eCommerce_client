import React from 'react';
import Menu from '../img/icon/icon-menu.png';
import Logo from '../img/Utils-IMG/logo.png';
import Account from '../img/icon/icon-user.png'
import Cart from '../img/icon/icon-panier.png';

import '../style/css/header.css';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isLoading: true}
    }

    componentDidMount() {
        return fetch('10.34.7.0:8000/register')
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    dataSource: responseJson.register,
                }, function () {

                });

            })
            .catch((error) => {
                console.error(error);
            });
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
        );
    }

}

export default Register;