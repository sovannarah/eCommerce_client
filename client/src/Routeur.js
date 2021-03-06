import React from 'react';
import Articles from './components/Articles';
import Article from './components/Article';
import Register from './components/Register';
import Admin from './components/AdminUpdate';
import AdminCreate from './components/Admin';
import Search from './components/Search';
import CartPage from './components/CartPage';
import Payment from './components/Payment';
import Checkin from './components/Chekin';
import Account from './components/Account';
import { Switch, Route } from 'react-router';
import Category from './components/Category';


import Home from './components/Home';

class Routeur extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={ Home } />
                <Route path="/articles" component={ Articles } />
                <Route path="/article/:id" component={ Article } />
                <Route path="/register" component={ Register } />
                <Route exact path="/admin" component={ Admin } />
                <Route exact path="/admin/create" component={ AdminCreate } />
                <Route path="/category/:id" component={ Category } />
                <Route path="/search" component={ Search } />
                <Route path="/cartPage" component={ CartPage } />
                <Route path="/payment" component={ Payment } />  
                <Route path="/checkin" component={ Checkin } /> 
                <Route path="/account" component={ Account } />
            </Switch>
        );
    }
}

export default Routeur;
