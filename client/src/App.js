import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';

function App() {
  return (
    <div className="h-100">
      <Header />
      <section className="stn-app d-flex">
        <Footer />
        <Home />
      </section>
    </div>
  );
}

export default App;
