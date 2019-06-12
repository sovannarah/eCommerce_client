import React from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import './App.css';


import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Articles from './components/Articles';
import Description from './components/Description';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.description = React.createRef();
    }

    render() {
        return (
            <div className="h-100" >
                < Header />
                <section className="stn-app d-flex">
                    <Description ref={this.description} />
                    <Footer />
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/" render={props => <Home {...props} onOpen={item => this.description.current.open(item)} />} />
                            <Route path="/articles" component={Articles} />
                        </Switch>
                    </BrowserRouter>
                </section>
            </div>
        );
    }
}

export default App;
