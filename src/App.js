import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login'
import Principal from './Principal'
import NumberPayments from './NumberPayments'
import Calendar from './Calendar'
import HamburgerMenu from './HamburgerMenu'
import Customers from './Customers'
import InfoCustomers from './InfoCustomers'
import Historial from './Historial'
import CorteDia from './CorteDia'
import ResumenGral from './ResumenGral'
import Prestamo from './Prestamo'
import { Switch, Route, NavLink } from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
