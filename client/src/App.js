import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Menu from './components/Menu';
import Routeur from './Routeur';
import './App.css';
import Menu from './components/Menu';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AllArticles from './components/Menu/AllArticles';

<<<<<<< HEAD
class App extends React.Component {

  render() {
    return (
      <div id="main-div" className="h-100">
        <BrowserRouter>
          <Menu />
          <Header />
          <div id="margin"></div>
          <Routeur />
        </BrowserRouter>
      </div>
    );
  }
=======

function App() {
    return (
        <div className="h-100">
            <Router>
                <Menu />
            </Router>
        </div>
    );
>>>>>>> menu
}


export default App;
