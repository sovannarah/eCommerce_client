import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Routeur from './Routeur';
import Footer from './components/Footer';
import './App.css';

class App extends React.Component {


    constructor(props) {
        super(props);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    handleClickOutside(e) {
        let except = ['menu-user', 'menu-cart', 'ctn-search-barre'];
        let exceptClass = ['user', 'cart', 'search'];
        except.forEach(element => {
            if(e.target.matches(`#${element} *`) === false) {
                exceptClass.forEach(ele => {
                    document.getElementById(element).classList.remove(`display-${ele}-exit-done`); 
                });
            } 
        });
    }

    render() {
        return (
            <div onClick={this.handleClickOutside} id="main-div" className="">
                <BrowserRouter>
                    <Header />
                    <div id="margin"></div>
                    <Routeur />
                    <Footer /> 
                </BrowserRouter>
            </div>
        );
    }
}

export default App;