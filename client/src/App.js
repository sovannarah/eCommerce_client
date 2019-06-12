import React from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import './App.css';


import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Articles from './components/Articles';
import Register from './components/Register';
import Login from './components/Login';



function App() {


    return (
        <div className="h-100">
            <Header/>
            <section className="stn-app d-flex">
                <Footer/>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={ Home } />
                        <Route path="/articles" component={ Articles } />
                        <Route exact path="/login" component={ Login } />
                        <Route exact path="/register" component={ Register } />
                    </Switch>
                </BrowserRouter>
            </section>
        </div>
    );
}

export default App;
