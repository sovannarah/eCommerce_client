import React from 'react';
import IconMenu from '../images/icone/icone-menu.png';
import { Link } from 'react-router-dom';
import '../style/css/menu.css';

class Menu extends React.Component {

    closeMenu() {
        document.getElementById('menu').classList.toggle('exit-menu');
    }

    render() {
        return (
            <menu id="menu" className="col-lg-3">
                <div id="ctn-logo-menu" className="bg-primary d-flex justify-content-between">
                    <button id="button-menu" onClick={this.closeMenu}>
                        <img id="icone-menu" className="mt-auto mb-auto" src={IconMenu}></img>
                    </button>
                </div>
                <ul>
                    <li>
                        <Link to="/articles">All Articles</Link>
                    </li>
                </ul>
            </menu>
        );
    }
}

export default Menu;