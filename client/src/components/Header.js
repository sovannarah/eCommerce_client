import React from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import Drawer from '@material-ui/core/Drawer';
import Menu from '../components/Menu';
import UserCtrl from './userCtrl';
import IconMenu from '../images/icon/icon-menu.png';
import Logo from '../images/icon/logo2.png';
import IconeSearch from '../images/icon/icon-loupe.png';
import IconeUser from '../images/icon/icon-user.png';
import IconeCart from '../images/icon/icon-panier.png';
import '../style/css/header.css';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: true,
            user: true,
            cart: true,
            left: false
        }

        this.displaySearch = this.displaySearch.bind(this);
        this.displayUser = this.displayUser.bind(this);
        this.displayCart = this.displayCart.bind(this);

    }


    displaySearch() {
        this.setState({user: true})
        this.setState({search: !this.state.search})
        this.setState({cart: true})
        // document.getElementById("ctn-search-barre").classList.toggle("open");
    }

    displayUser() {
        this.setState({user: !this.state.user})
        this.setState({search: true})
        this.setState({cart: true})
        // document.getElementById("menu-user").classList.toggle("open");
    }

    displayCart() {
        this.setState({user: true})
        this.setState({search: true})
        this.setState({cart: !this.state.cart})
        // document.getElementById("menu-cart").classList.toggle("open");
    }

    toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        this.setState({ ...this.state, [side]: open });
      };

    render() {

        const userToken = localStorage.getItem('token');
        return (
            <header className="container-fluid">
                <Drawer className="" open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                    <Menu />
                </Drawer>
                <div id="ctn-header" className="h-100 d-flex justify-content-between">
                    <div id="ctn-icon-menu"className="d-flex justify-content-between">
                        <button id="button-menu" onClick={this.toggleDrawer('left', true)}>
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
                 <CSSTransition
                 in = {this.state.cart}
                 timeout={500}
                 classNames="display-cart"
             >
                 <div id="menu-cart" className="d-flex bg-dark open">

                 </div>
             </CSSTransition>
            </header>
        );
    }
}

export default Header;