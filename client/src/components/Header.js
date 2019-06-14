import React from 'react';
import Menui from '../img/icon/icon-menu.png';
import Logo from '../img/Utils-IMG/logo.png';
import Account from '../img/icon/icon-user.png'
import Cart from '../img/icon/icon-panier.png';
import { Link } from 'react-router-dom'; 
import Login from './Login';
import Register from './Register';
import Menu from './Menu';
import '../style/css/header.css';

class Header extends React.Component {


    handleClick() {
        const wrapper = document.getElementById('Menu');
        wrapper.classList.remove('close')
    }

    render() {
        return (
            <header id="header" className="d-flex justify-content-between">
                <Menu/>
                <div className="ctn-menu d-flex">
                    <button onClick={this.handleClick.bind(this)}>
                        <img className="icon-menu m-auto" src={Menui}/>
                    </button>
                </div>
                <div className="h-100 ctn-logo d-flex">
                    <Link to="/">
                        <img className="h-75 m-auto" src={Logo}/>
                    </Link>
                </div>
                <div className="ctn-acnt justify-content-between d-flex">
                    <Link className="m-auto" to="/admin">
                        <img className="icon-cart mt-auto mb-auto" src={Account}/>
                    </Link>
                    <Link className="m-auto" to="/">
                        <img className="icon-cart mt-auto mb-auto" src={Cart}/>
                    </Link>
                </div>
            </header>
        );
    }

}

export default Header;