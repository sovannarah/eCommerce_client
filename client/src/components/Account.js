import React from 'react';
import axios from 'axios';

// const ip = 'http://127.0.0.1:8000';
const ip = 'http://10.34.7.0:8000';
class Account extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            userData : {},
            address: {}
        }
        // axios.get(ip + "/user", {headers: {token: localStorage.getItem('token')}})
        // .then(res => {
        //     this.setState({ userData : res.data });
        // })

        axios.get(ip + "/address", {headers: {token: localStorage.getItem('token')}})
        .then(res => {
            console.log("=====ADDRESS=====");
            console.log(res.data)
            this.setState({ address: res.data })
        })

        this.updateUser = this.updateUser.bind(this);
        this.changeMail = this.changeMail.bind(this);
        this.changeStreet = this.changeStreet.bind(this);
        this.changePC = this.changePC.bind(this);
    }

    updateUser() {
        // axios.post(ip + "/user", this.state.userData, {headers: {token: localStorage.getItem('token')}})
        // .then(res => {
        //     console.log(res.data)
        // })
        // axios.post(ip + "/address", this.state.address, {headers: {token: localStorage.getItem('token')}})
        // .then(res => {
        //     console.log(res.data)
        // })
    }

    changeMail(e) {
        this.setState({ userData : {email : e.target.value} })
    }

    changeStreet(e) {
        this.setState({ address: {street: e.target.value , pc: this.state.address.pc} })
    }

    changePC(e) {
        this.setState({ address: {street: this.state.address.street, pc: e.target.value}})
    }

    render() {
        let user = this.state.userData;
        let adress = this.state.address;
        return (
            <section>
                <label>Email
                    <input name="email" value={user.email || ''} onChange={this.changeMail}/>
                </label>
                <label>Street
                    <input name="street" value={adress.street || ''} onChange={this.changeStreet}/>
                </label>
                <label>PC
                    <input name="cp" value={adress.pc || ''} onChange={this.changePC}/>
                </label>
                <input type="submit" onClick={this.updateUser} />
            </section>
        );
    }
}

export default Account;