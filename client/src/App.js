import React from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import './App.css';


import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Articles from './components/Articles';
import Description from './components/Description';
import Routeur from './Routeur';

class App extends React.Component {

  

    render() {
        return (
            <BrowserRouter>
            <div className="h-100" >
                < Header />
                <section className="stn-app d-flex">
                    {/* <Footer /> */}
                    <Routeur />
                </section>
            </div>
            </BrowserRouter>
        );
    }
}

export default App;
