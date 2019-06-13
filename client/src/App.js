import React from 'react';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';


function App() {
  return (
    <div className="h-100">
      <Header />
      <Register />
    </div>
  );
}

export default App;
