
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Home from './components/Home';
import Articles from './components/Articles';

const Routeur = () => (
    <Route render={({ location }) => (
          <Switch location={ location }>
            <Route exact path='/' component={Home}/>
            <Route path='/articles' component={Articles}/>
          </Switch>
    )}/>
)

export default Routeur;