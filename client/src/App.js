import React from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import './App.css';


import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Articles from './components/Articles';
import Description from './components/Description';
<<<<<<< HEAD
import Register from './components/Register';
import Login from './components/Login';
=======
import Routeur from './Routeur';
>>>>>>> 98919a965b2cdd750b2d8e5dc9e4a15637725d61

class App extends React.Component {

  

    render() {
        return (
            <BrowserRouter>
            <div className="h-100" >
                < Header />
                <section className="stn-app d-flex">
<<<<<<< HEAD
                    <Description ref={this.description} />
                    <Footer />
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/" render={props => <Home {...props} onOpen={item => this.description.current.open(item)} />} />
                            <Route path="/articles" component={ Articles } />
                            <Route exact path="/login" component={ Login } />
                            <Route exact path="/register" component={ Register } />

                        </Switch>
                    </BrowserRouter>
=======
                    {/* <Footer /> */}
                    <Routeur />
>>>>>>> 98919a965b2cdd750b2d8e5dc9e4a15637725d61
                </section>
            </div>
            </BrowserRouter>
        );
    }
}

export default App;
