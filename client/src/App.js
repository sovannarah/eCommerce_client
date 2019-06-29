import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Routeur from './Routeur';
import Footer from './components/Footer';
import './App.css';

class App extends React.Component {

    render() {
        return (
            <div id="main-div" className="">
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