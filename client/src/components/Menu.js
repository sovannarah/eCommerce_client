import React from 'react';
import Menui from '../images/icon/icon-menu-black.png';
import { Link } from 'react-router-dom';
import '../style/css/menu.css';
import axios from 'axios';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            data: {},
            showMenu: false
        }
        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }
    async componentDidMount() {
        /**
         * @param get all the categories
         */
        await axios.get('http://10.34.7.0:8001/category')
            .then(
                (res) => {
                    this.state.data = res.data[0];

                    // console.log(this.state.data);
                },
                (err) => {
                    console.log(err);
                })
    }
    showMenu(event) {
        /**
         * @param show menu on click
         */
        event.preventDefault();
        this.setState({ showMenu: true }, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }
    closeMenu() {
        /**
         * @param close the menu
         */
        this.setState({ showMenu: false }, () => {
            document.removeEventListener('click', this.closeMenu);
        });
    }

    recursive() {

    }

    render() {
        console.log(this.state.data);
        return (
            <div id="menu" className="wrapper col-12">
                {
                    this.state.showMenu
                        ? (
                            <div className="wrapper">
                                {Object.keys(this.state.data).map((elem) => (
                                    <ul key={elem}>
                                        <Link to="AllArticles">
                                            <li>{this.state.data[elem].name}
                                                <ul key={elem.id}>
                                                    <li>{elem.name}</li>

                                                </ul>
                                            </li>
                                        </Link>
                                    </ul>
                                ))}
                            </div>
                        )
                        : (null)
                }
            </div>
        );
    }
}

export default Menu;