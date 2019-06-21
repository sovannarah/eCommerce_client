import React from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import '../style/css/register.css';
let ip='http://10.34.6.23:8000';
class Register extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }

        this.changeMail = this.changeMail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.register = this.register.bind(this);
    }

    changeMail(e) {
        this.setState({email : e.target.value})
    }

    changePassword(e) {
        this.setState({password : e.target.value})
    }


    register(e) {
        e.preventDefault();
        axios.post(ip + '/register', this.state)
            .then(res=> {
                console.log(res.data)
            })
    }

    render() {
        return(
            <section id="stn-register" className="d-flex h-100">
                <form id="form-register" 
                method="post" 
                className="d-flex justify-content-around flex-column col-md-4 h-50 m-auto">
                    <label>Email<br />
                        <input
                            id="outlined-name"
                            className="w-100"
                            name="email"
                            type="email"
                            value={this.state.mail}
                            onChange={this.changeMail}
                            margin="normal"
                            variant="outlined"
                        />
                    </label>
                    <label>Password<br />
                        <input
                            id="outlined-name"
                            name="password"
                            className="w-100"
                            type="password"
                            value={this.state.password}
                            onChange={this.changePassword}
                            margin="normal"
                            variant="outlined"
                        />
                    </label>
                    <Fab id="button-register" 
                    onClick={this.register} 
                    type="submit" 
                    className="w-50 ml-auto mr-auto" 
                    variant="extended" 
                    color="secondary">
                        Sign In
                    </Fab>
                </form>
            </section>
        );
    }
}

export default Register;