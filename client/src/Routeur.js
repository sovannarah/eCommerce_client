import React from 'react';
import Articles from './components/Articles';
import Article from './components/Article';
import Register from './components/Register';
import Admin from './components/Admin';
import Search from './components/Search';

import { Switch, Route } from 'react-router';
import Category from './components/Menu/AllMenu';   


import Home from './components/Home';

class Routeur extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={ Home } />
                <Route path="/articles" component={ Articles } />
                <Route path="/article/:id" component={ Article } />
                <Route path="/register" component={ Register } />
                <Route path="/admin" component={ Admin } />
                <Route path="/category" component={ Category } />
                <Route path="/search" component={ Search } />

            </Switch>
        )
    }
}

export default Routeur;