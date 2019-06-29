import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Routeur from './Routeur';
import './App.css';

class App extends React.Component {

    render() {
        return (
            <div id="main-div" className="h-100">
                <BrowserRouter>
                    <Header />
                    <div id="margin"></div>
                    <Routeur />
                </BrowserRouter>
            </div>
        );
    }
}

export default App;