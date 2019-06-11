import React from 'react';
import './App.css';
import Header from './components/Header';
import Description from './components/Description';

function App() {
    return (
        <div className="h-100">
            <Header/>
            <section className="stn-app d-flex">
                <Description/>
            </section>
        </div>
    );
}

export default App;
