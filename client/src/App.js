import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Description from './components/Description';



function App() {

    const descriptionComponent = <Description/>

    return (
        <div className="h-100">
            <Header/>
            <section className="stn-app d-flex">
                {descriptionComponent}
                <Footer/>
                <Home onOpen={descriptionComponent.open}/>
            </section>
        </div>
    );
}

export default App;
