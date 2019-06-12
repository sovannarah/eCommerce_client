import React from 'react';
import '../style/css/menu.css';
import ReactCSSTranstionGroup from 'react-addons-css-transition-group';

import Menui from '../img/icon/icon-menu-black.png';
class Menu extends React.Component {

    handleClick() {
        const wrapper = document.getElementById('Menu');
        wrapper.classList.toggle('open');
    }

    render(){
        return(
            <div id="Menu">
                <div className="ctn-menu d-flex">
                    <button onClick={this.handleClick}>
                        <img className="icon-menu m-auto" src={ Menui } />
                    </button>
                </div>
                <div className="">
                
                </div>
            </div>
        );
    }
}

export default Menu;