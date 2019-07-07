import React from 'react';
import axios from 'axios';

//const ip = 'http://127.0.0.1:8000';
const ip = 'http://10.34.7.0:8000';


class Account extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userData: {},
        };
        axios.get(ip + "/user", {headers: {token: localStorage.getItem('token')}})
            .then(res => {
                this.setState({userData: res.data});
            });

        this.updateUser = this.updateUser.bind(this);
        this.changeMail = this.changeMail.bind(this);
    }

    updateUser() {
        axios.post(ip + "/user", this.state.userData, {headers: {token: localStorage.getItem('token')}})
            .then(res => {
                console.log(res.data)
            })
    }

    changeMail(e) {
        this.setState({userData: {email: e.target.value}})
    }

    render() {
        let user = this.state.userData;
        console.log(user)
        return (
            <section>
                {/* <label>Username
                    <input value={user.username}/>
                </label> */}
                <label>Email
                    <input name="email" value={user.email || ''} onChange={this.changeMail}/>
                </label>
                <input type="submit" onClick={this.updateUser}/>
            </section>
        );
    }
}

export default Account;