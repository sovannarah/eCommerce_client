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
import { addToCart } from './Cart';



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
            categories: [],
            catsearch: []
        }
        this.ip = 'http://10.34.6.23:8000'

        this.displaySearch = this.displaySearch.bind(this);
        this.displayUser = this.displayUser.bind(this);
        this.displayCart = this.displayCart.bind(this);
        this.handleSearchCheckbox = this.handleSearchCheckbox.bind(this);

    }

    handleChange = () => {
        this.setState({
            put: this.search.value
        }, () => {
            if (this.state.put && this.state.put.length > 1) {
                if (this.state.put.length % 2 === 0) {
                    this.displaySearchBar()
                } else if (!this.state.put) {

                }
            }
        })

    }
    handleValue = (event) => {
        this.setState({
            value: event.target.value
        })
    }

    displaySearchBar = () => {
        // title=....&category[]=1&category[]=2&category[]=3....
        axios.get(this.ip + '/search?' + this.state.value + '=' + this.state.put)
            .then(({ data }) => {
                this.setState({ results: data })
            })
    }

    displayCheckbox = () => {

    }

    componentDidMount() {
        /**
         * @param get all the categories
         */
        axios.get(this.ip + '/category')
            .then(
                (res) => {
                    // console.log('========== Get category menu ===========')
                    // console.log(res.data);
                    this.setState({ categories: res.data });
                },
                (err) => {
                    console.log(err);
                })
    }

    componentWillMount() {
        // this.displaySearchBar();
    }

    handleSearchCheckbox(event) {
        console.log(event.target.id);
        if (this.state.catsearch.indexOf(event.target.id) !== -1) {
            console.log(`unset ${event.target.id}`);
            let copy = this.state.catsearch;
            copy = copy.slice(this.state.catsearch.indexOf(event.target.id), 1);
            this.setState({ catsearch: copy });
        }
        else {
            console.log(`set ${event.target.id}`);
            let copy = this.state.catsearch;
            copy.push(event.target.id);
            this.setState({ catsearch: copy });
        }
        console.log(this.state.catsearch);
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
        this.setState({ user: true })
        this.setState({ search: true })
        this.setState({ cart: !this.state.cart })
    }

    toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        this.setState({ ...this.state, [side]: open });
    };

    render() {
        // console.log(this.state.categories);

        const userToken = localStorage.getItem('token');
        return (
            <header className="container-fluid">
                <Drawer className="" open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                    <Menu />
                </Drawer>
                <div id="ctn-header" className="h-100 d-flex justify-content-between">
                    <div id="ctn-icon-menu" className="d-flex justify-content-between">
                        <button id="button-menu" onClick={this.toggleDrawer('left', true)}>
                            <img id="icone-menu" className="mt-auto mb-auto" src={IconMenu} />
                        </button>
                    </div>
                    <Link to="/" id="ctn-logo" className="d-flex mt-2">
                        <img src={Logo} />
                    </Link>
                    <ul className="d-flex justify-content-between mt-auto h-100">
                        <li>
                            <button onClick={this.displaySearch}>
                                <img src={IconeSearch}></img>
                            </button>
                        </li>
                        <li >
                            <button onClick={this.displayUser}>
                                <img src={IconeUser}></img>
                            </button >


                        </li>
                        <li>
                            <button onClick={this.displayCart}>
                                <img src={IconeCart}></img>
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
                        <select value={this.state.value} onChange={this.handleValue}>
                            <option>Select</option>
                            <option value="title">Title</option>
                            <option value="description">Description</option>
                        </select>
                        <div className="category-box">
                            {this.state.categories.map(category => (
                                <>
                                    <label for={category.id}>{category.name}</label>
                                    <input 
                                        type="checkbox"
                                        name={category.name}
                                        value={category.id}
                                        id={category.id}
                                        onChange={this.handleSearchCheckbox}
                                    />
                                </>
                            ))}
                        </div>
                        <input id="search-barre" className="mt-auto mb-auto mr-5" ref={input => this.search = input} onChange={this.handleChange} type="text" placeholder="Search" />
                        <div className="results-search">
                            {this.state.results.length >= 1 ? this.state.results.map((elem, i) => (
                                <li key={i}>
                                    <Link to={"/article/" + elem.id}>
                                        {this.state.value == "title" ? elem.title : this.state.value == "description" ? elem.description : ''}
                                    </Link>
                                </li>
                            )) : ""}
                        </div>
                    </div>
                </CSSTransition>
                <CSSTransition
                    in={this.state.user}
                    timeout={500}
                    classNames="display-user">
                    <UserCtrl user={userToken} />
                </CSSTransition>
                <CSSTransition
                    in={this.state.cart}
                    timeout={500}
                    classNames="display-cart"
                >
                    <div id="menu-cart" className="d-flex bg-dark open">
                        <Cart></Cart>
                    </div>

                </CSSTransition>
            </header>
        );
    }
}

export default Header;