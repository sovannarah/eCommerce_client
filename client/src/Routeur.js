import React from 'react';
import Articles from './components/Articles';
import Article from './components/Article';
import Register from './components/Register';
import Admin from './components/AdminUpdate';
import AdminCreate from './components/Admin';
import { Switch, Route } from 'react-router';

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
            </Switch>
        )
    }
}

export default Routeur;