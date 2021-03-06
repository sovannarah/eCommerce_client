import React from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import Drawer from '@material-ui/core/Drawer';
import Menu from '../components/Menu';
import axios from 'axios';
import UserCtrl from './userCtrl';
import Cart from './Cart'
import IconMenu from '../images/icon/icon-menu.png';
import Logo from '../images/icon/logo2.png';
import IconeSearch from '../images/icon/icon-loupe.png';
import IconeUser from '../images/icon/icon-user.png';
import IconeCart from '../images/icon/icon-panier.png';
import '../style/css/header.css';

//TODO set default to select to title;

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: true,
            user: true,
            cart: true,
            left: false,
            results: {},
            put: '',
            value: '',
            category: [],
            token: localStorage.getItem('token'),
            getCategory: [],
            adminPanel: null
        };
        this.ip = 'https://127.0.0.1:8000';


        this.displayScroll = this.displayScroll.bind(this);
        this.displaySearch = this.displaySearch.bind(this);
        this.displayUser = this.displayUser.bind(this);
        this.displayCart = this.displayCart.bind(this);
        this.parseCategory = this.parseCategory.bind(this);
        this.makeStr = this.makeStr.bind(this);
    }


    parseCategory(data) {
        let c = -1;
        while (data[++c]) {
            this.state.getCategory.push(data[c]);
            if (data[c].sub && data[c].sub.length > 0)
                this.parseCategory(data[c].sub);
        }

    }

    filterSearch = () => {
        this.setState({
            put: this.search.value
        }, () => {
            if (this.state.put && this.state.put.length > 1) {
                if (this.state.put.length % 2 === 0) {
                    this.itemSearch()
                } else if (!this.state.put) {
                    // console.log('not ok');
                }

            }
        })
    };

    handleSelect = (event) => {
        this.setState({
            value: event.target.value
        })
    };

    itemSearch = () => {
        this.makeStr(this.state.category).then(res => {
            axios.get(this.ip + '/search?' + this.state.value + '=' + this.state.put + res)
                .then(({ data }) => {
                    this.setState({ results: data })
                })
        });
    };

    makeStr(table) {
        return (new Promise((resolve) => {
            let c = -1;
            let str = "";
            while (table[++c])
                str = str + "&category[]=" + table[c];
            resolve(str);
        }));
    }

    componentDidMount() {
        /**
         * @param get all the categories
         */
        axios.get(this.ip + '/category')
            .then(
                (res) => {
                    this.parseCategory(res.data);
                },
                (err) => {
                    console.log(err);
                });

    }


    onChange = (e) => {
        let sCategory = this.state.category;
        if (e.target.checked === true)
            sCategory.push(e.target.id);
        else if (e.target.checked === false) {
            let tIndex = sCategory.indexOf(e.target.id);
            if (tIndex !== -1)
                sCategory.splice(tIndex, 1);
        }
        this.setState({ category: sCategory });
        this.itemSearch();
    };


    displayScroll(e) {
        e.preventDefault();
        document.getElementById('cho-cat').classList.toggle('dis')
    }

    displaySearch() {
        this.setState({ user: true })
        this.setState({ search: !this.state.search })
        this.setState({ cart: true })
    }

    displayUser() {
        this.setState({ user: !this.state.user })
        this.setState({ search: true })
        this.setState({ cart: true })
    }

    displayCart() {
        this.setState({ user: true });
        this.setState({ search: true });
        this.setState({ cart: !this.state.cart });
    }

    outsideCat() {
        document.getElementById("cho-cat").classList.remove('dis');
    }

    async handleShowCart() {
        let isLog = false;
        let token = localStorage.getItem('token');
        if (token) {
            await axios
                .get(
                    this.ip + '/user/checkuser',
                    {
                        "headers": {
                            "token": token
                        }
                    }
                )
                .then((res) => {
                    console.log(res.status);
                    if (res.status === 200)
                        isLog = true;
                })
                .catch((err) => {
                    console.log(err);
                })
        } else
            console.log("No token");

        if (isLog || window.confirm(
            "Vous n'etes pas connectes, voulez vous commander sans compte?\n" +
            "[OK] pour continuer\n[Cancel] pour annuler")
        )
            window.location.replace("/cartPage");
        else
            window.location.replace("/register");
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
                    <div id="ctn-icon-menu" className="d-flex justify-content-between">
                        <button id="button-menu" onClick={this.toggleDrawer('left', true)}>
                            <img id="icone-menu" className="mt-auto mb-auto" src={IconMenu} alt="" />
                        </button>
                    </div>
                    <Link to="/" id="ctn-logo" className="d-flex mt-2">
                        <img src={Logo} alt="" />
                    </Link>
                    <ul className="d-flex justify-content-between mt-auto h-100">
                        <li>
                            <button onClick={this.displaySearch}>
                                <img src={IconeSearch} alt="search" />
                            </button>
                        </li>
                        <li>
                            <button onClick={this.displayUser}>
                                <img src={IconeUser} alt="" />
                            </button>


                        </li>
                        <li>
                            <button onClick={this.displayCart}>
                                <img src={IconeCart} alt="" />
                            </button>
                            <CSSTransition
                                in={this.state.cart}
                                timeout={500}
                                classNames="display-cart">
                                <div id="menu-cart" className="d-flex bg-dark open">

                                </div>
                            </CSSTransition>
                        </li>
                    </ul>
                </div>
                <CSSTransition
                    in={this.state.search}
                    timeout={500}
                    classNames="display-search">
                    <div id="ctn-search-barre" className="d-flex justify-content-end w-100 open">
                        <div className="d-flex flex-column">
                            <div className="d-flex ntm">
                                <select className="mt-auto mb-auto" select={this.state.value}
                                        onChange={this.handleSelect}>
                                    <option>Select</option>
                                    <option select="title">title</option>
                                    <option select="description">description</option>
                                </select>
                                <div className="category-box h-100 d-flex">
                                    <ul id="cho-cat" className="sroll border bg-light mt-auto mb-auto">

                                        <li className="p-2 bg-light d-flex justify-content-between">
                                            <p>Categorie</p>
                                            <button className="btn-none mb-auto" onClick={this.displayScroll}>
                                                <img className="size-icn" src={require('../images/icon/chevron.png')} />
                                            </button>
                                        </li>
                                        <div className="cach">
                                            {this.state.getCategory.map((category, index) => (
                                                <li className="bg-light p-2 d-flex justify-content-between" key={index}>
                                                    <label className="bg-light mt-auto mb-auto"
                                                           htmlFor={category.id}>{category.name}</label>
                                                    <input
                                                        type="checkbox"
                                                        className="mt-auto mb-auto"
                                                        name={category.name}
                                                        select={category.id}
                                                        id={category.id}
                                                        onChange={this.onChange}
                                                    />
                                                </li>
                                            ))}
                                        </div>
                                    </ul>
                                </div>
                                <input id="search-barre" className="mt-auto mb-auto mr-5" ref={put => this.search = put}
                                       onChange={this.filterSearch} type="text" placeholder="Search"/>
                            </div>
                            <div className="results-search bg-light mr-5">
                                {this.state.results.length >= 1 ? this.state.results.map((elem, i) => (
                                    <li className="border pt-3 pb-3 w-100 pl-2" key={i}>
                                        <Link to={"/article/" + elem.id}>
                                            {elem.title}
                                            {this.state.value === "title" ? elem.title : this.state.value === "description" ? elem.description : ''}
                                        </Link>
                                    </li>
                                )) : ""}
                            </div>
                        </div>
                    </div>
                </CSSTransition>
                <CSSTransition
                    in={this.state.user}
                    timeout={500}
                    classNames="display-user">
                    <UserCtrl user={userToken}/>
                </CSSTransition>
                <CSSTransition
                    in={this.state.cart}
                    timeout={500}
                    classNames="display-cart"
                >
                    <div id="menu-cart" className="d-flex flex-column bg-dark open">
                        <Cart></Cart>
                        <button className="btn-mainly" onClick={this.handleShowCart.bind(this)}>Access to cart</button>
                    </div>

                </CSSTransition>
            </header>
        );
    }
}

export default Header;
