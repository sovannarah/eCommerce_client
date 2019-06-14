import React from 'react';
import '../style/css/menu.css';
import {Link} from 'react-router-dom';

class Menu extends React.Component {

    handleClick() {
        const wrapper = document.getElementById('Menu');
        wrapper.classList.toggle('close');
    }

    render() {
        return (
            <div id="Menu" className="close">
                <div className="ctn-menu d-flex">
                    <button onClick={this.handleClick}>
                        <img className="icon-menu m-auto" src={Menui}/>
                    </button>
                </div>
                    <ul>
                        <li>
                            <Link to="/articles">
                                All Articles
                            </Link>
                        </li>
                    </ul>
                <div className="">

                </div>
            </div>
        );
    }
}

export default Menu;