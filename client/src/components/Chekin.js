import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../style/css/checkin.css';

let ip = 'http://127.0.0.1:8000';

class Checkin extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.login = this.login.bind(this);
        this.ip = 'http://127.0.0.1:8000'
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
                console.log(res.data);
                if (user.token) {
                    localStorage.setItem('token', user.token);
                    localStorage.setItem('email', user.email);
                    window.location.replace('/payment');
                }
            })
    }

    render() {
        if (localStorage.getItem("token")) {
            window.location.replace("/payment")
        } else {
            return (
                <section id="ctn-cartPage" className=" min-vh-100 flex-column container-fluid d-flex">
                    <div id="ctn-cart" className="rounded min-vh-50 col-lg-8 p-3 d-flex bg-grey m-auto">
                        <div className="col-6 d-flex flex-column border-right">
                            <h1 className="ml-auto mr-auto text-secondary">Customer Save</h1>
                            <div className="d-flex flex-column ml-auto col-10 mr-auto h-50  justify-content-around">
                                <label className="text-light d-flex flex-column">Email
                                    <input id="outlined-name"
                                           className="mt-3"
                                           onChange={this.changeEmail}
                                           type="text"/>
                                </label>
                                <label className="text-light d-flex flex-column">Password
                                    <input id="outlined-name"
                                           className="mt-3"
                                           onChange={this.changePassword}
                                           type="password"
                                    />
                                </label>
                                <input id="connect-button"
                                       onClick={this.login}
                                       value="Connection"
                                       className="btn-mainly ml-auto mr-auto"
                                       type="submit"
                                />
                            </div>
                        </div>
                        <div className="col-6 d-flex flex-column">
                            <h1 className=" ml-auto mr-auto text-secondary">Customer Invites</h1>
                            <div className="m-auto">
                                <Link to="/payment">
                                    <button className="btn-mainly">Payment</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            );
        }
    }

}

export default Checkin;