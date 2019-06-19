import React from 'react';
import Menui from '../img/icon.png';
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
        axios.get('http://10.34.6.23:8000/category')
            .then(
                (res) => {
                    // console.log(this.state.data);
                    this.state.data = res.data[0];
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

    render() {
        // console.log(this.state.data);
        return (
            <div id="menu" className="wrapper">
                <button className="menu" onClick={this.showMenu}>
                    <img src={Menui} />
                </button>
                {
                    this.state.showMenu
                        ? (
                            <div className="wrapper">
                                <ul>
                                    {Object.keys(this.state.data).map((elem, i) => (
                                        <li key={i}>
                                            <Link to={"/category/" + this.state.data[elem].id}>
                                                {this.state.data[elem].name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )
                        : (null)
                }
            </div>
        );
    }
}

export default Menu;