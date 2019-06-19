import React from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import UserCtrl from './userCtrl';
import IconMenu from '../images/icone/icone-menu.png';
import Logo from '../images/icon/logo.png';
import IconeSearch from '../images/icon/icon-search.png';
import IconeUser from '../images/icon/icone-user.png';
import IconeCart from '../images/icone/icone-cart.png';
import '../style/css/header.css';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: true,
            user: true,
            cart: true,

        }

        this.displaySearch = this.displaySearch.bind(this);
        this.displayUser = this.displayUser.bind(this);
        this.displayCart = this.displayCart.bind(this);

    }


    displaySearch() {
        this.setState({user: true})
        this.setState({search: !this.state.search})
        this.setState({cart: true})
    }

    displayUser() {
        this.setState({user: !this.state.user})
        this.setState({search: true})
        this.setState({cart: true})
    }

    displayCart() {
        this.setState({user: true})
        this.setState({search: true})
        this.setState({cart: !this.state.cart})
    }

    openMenu() {
        document.getElementById("menu").classList.toggle("exit-menu")
    }

    

    render() {
        const userToken = localStorage.getItem('token');
        return (
            <header className="container-fluid">
                <div id="ctn-header" className="h-100 d-flex justify-content-between">
                    <div id="ctn-icon-menu"className="d-flex justify-content-between">
                        <button id="button-menu" onClick={this.openMenu}>
                            <img id="icone-menu" className="mt-auto mb-auto" src={ IconMenu } />
                        </button>
                    </div>
                    <Link to="/" id="ctn-logo" className="d-flex mt-2">
                        <img src={ Logo } />
                    </Link>
                    <ul className="d-flex justify-content-between mt-auto h-100">
                        <li>
                            <button onClick={this.displaySearch}>
                                <img src={ IconeSearch }></img>
                            </button>
                        </li>
                        <li >
                            <button onClick={this.displayUser}>
                                <img src={ IconeUser }></img>
                            </button >


                        </li>
                        <li>
                            <button onClick={this.displayCart}>
                                <img src={ IconeCart }></img>
                            </button>
                            <CSSTransition
                                in = {this.state.cart}
                                timeout={500}
                                classNames="display-cart"
                            >
                                <div id="menu-cart" className="d-flex bg-dark open">

                                </div>
                            </CSSTransition>
                        </li>
                    </ul>
                </div>
                <CSSTransition
                    in = {this.state.search}
                    timeout={500}
                    classNames="display-search"
                >
                    <div id="ctn-search-barre" className="d-flex justify-content-end w-100 open">
                        <input id="search-barre" className="mt-auto mb-auto mr-5" type="text"  placeholder="Search"/>
                    </div>
                </CSSTransition>
                <CSSTransition
                    in = {this.state.user}
                    timeout={500}
                    classNames="display-user"
                >
                    <UserCtrl user={userToken}/>
                </CSSTransition>
            </header>
        );
    }
}

export default Header;