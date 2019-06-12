import React from 'react';
import Menui from '../img/icon/icon-menu.png';
import Logo from '../img/Utils-IMG/logo.png';
import Account from '../img/icon/icon-user.png'
import Cart from '../img/icon/icon-panier.png';
import Menu from './Menu';
import '../style/css/header.css';

class Header extends React.Component {


    handleClick() {
        const wrapper = document.getElementById('Menu');
        wrapper.classList.remove('close')
    }

    render() {
        return(
            <header id="header" className="d-flex justify-content-between">
                <Menu/>
                <div className="ctn-menu d-flex">
                    <button onClick={this.handleClick.bind(this)}>
                        <img className="icon-menu m-auto" src={ Menui } />
                    </button>
                </div>
                <div className="h-100 ctn-logo d-flex">
                    <img className="h-75 m-auto" src={ Logo } />
                </div>
                <div className="ctn-acnt justify-content-between d-flex">
                    <img className="icon-cart mt-auto mb-auto" src={ Account } />
                    <img className="icon-cart mt-auto mb-auto" src={ Cart } />
                </div>
            </header>
        );
    }

}

export default Header;