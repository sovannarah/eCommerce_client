import React from 'react';
import axios from 'axios';
import '../style/css/account.css';
const ip = 'http://127.0.0.1:8000';
// const ip = 'http://10.34.7.0:8000';


class Account extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userData : {},
            address: {
                street: '', 
                pc: ''
            }
        }

        this.updateUser = this.updateUser.bind(this);
        this.changeMail = this.changeMail.bind(this);
        this.changeStreet = this.changeStreet.bind(this);
        this.changePC = this.changePC.bind(this);
    }

    async componentDidMount() {
        await axios.get(ip + "/user", {headers: {token: localStorage.getItem('token')}})
        .then(res => {
            console.log(res.data)
            this.setState({ userData : res.data });
        })

        await axios.get(ip + "/address", {headers: {token: localStorage.getItem('token')}})
        .then(res => {
            console.log("=====ADDRESS=====");
            console.log(res.data)
            if (res.data !== null) {
                this.setState({ address: res.data })
            } else {
                this.setState({ address: {street : '', pc : ''} })
            }
        })
    }

    updateUser() {
        console.log(this.state.address)
        axios.post(ip + "/user", this.state.userData, {headers: {token: localStorage.getItem('token')}})
        .then(res => {
            console.log(res.data)
        })
        axios.post(ip + "/address", this.state.address, {headers: {token: localStorage.getItem('token')}})
        .then(res => {
            console.log(res.data)
        })
    }

    changeMail(e) {
        this.setState({userData: {email: e.target.value}})
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
            <section className="d-flex justify-content-center mb-5">
                <div className="d-flex flex-column bg-grey col-3 justify-content-center p-5 orund" style={{marginTop: 130}}>
                    <label>Email: <br />
                        <input 
                        name="email" 
                        className="ipt-upd"
                        value={user.email || ''} 
                        onChange={this.changeMail}/>
                    </label>
                    <label>Street: <br />
                        <input 
                        name="street" 
                        className="ipt-upd"
                        value={adress === null ? '' : adress.street || ''} 
                        onChange={this.changeStreet}/>
                    </label>
                    <label>PC: <br />
                        <input 
                        name="pc" 
                        className="ipt-upd"
                        value={adress === null ? '' : adress.pc || ''} 
                        onChange={this.changePC}/>
                    </label>
                    <input 
                    type="submit" 
                    className="btn-mainly mt-5" 
                    onClick={this.updateUser} />
                </div>
            </section>
        );
    }
}

export default Account;