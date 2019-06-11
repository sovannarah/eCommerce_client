import React from 'react';
import './App.css';
import Menu from './img/icon/icon-menu.png';
import Logo from './img/Utils-IMG/logo.png';
import Account from './img/icon/icon-user.png'
import Cart from './img/icon/icon-panier.png';

function App() {
  return (
    // <div className="App h-100">
      <header id="header" className="container-fluid d-flex justify-content-between">
        <div className="col-1 d-flex">
          <img className="icon-logo m-auto" src={ Menu } />
        </div>
        <div className="h-100 d-flex">
          <img className="h-75 m-auto" src={ Logo } />
        </div>
        <div className="ctn-acnt justify-content-between d-flex">
            <img className="icon-cart mt-auto mb-auto" src={ Account } />
            <img className="icon-cart mt-auto mb-auto" src={ Cart } />
        </div>
      </header>
    // </div>
  );
}

export default App;
