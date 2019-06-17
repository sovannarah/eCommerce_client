import React from 'react';
import './App.css';
import Menu from './components/Menu';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AllArticles from './components/Menu/AllArticles';


function App() {
    return (
        <div className="h-100">
            <Router>
                <Menu />
            </Router>
        </div>
    );
}


export default App;
