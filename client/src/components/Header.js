import React from 'react';
import Menu from '../img/icon/icon-menu.png';
import Logo from '../img/Utils-IMG/logo.png';
import Account from '../img/icon/icon-user.png'
import Cart from '../img/icon/icon-panier.png';

import '../style/css/header.css';

class Header extends React.Component {

    render() {
        return(
            <header id="header" className="d-flex justify-content-between">
                <div className="ctn-menu d-flex">
                    <img className="icon-menu m-auto" src={ Menu } />
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