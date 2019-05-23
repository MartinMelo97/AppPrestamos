import React from 'react';
import Login from './Login'
import Principal from './Principal'
import NumberPayments from './NumberPayments'
import Calendar from './Calendar'
import HamburgerMenu from './HamburgerMenu'
import Header from './Header.jsx'
import DetalleCliente from './DetalleCliente'
import Customers from './Customers'
import InfoCustomers from './InfoCustomers'
import Historial from './Historial'
import CorteDia from './CorteDia'
import ResumenGral from './ResumenGral'
import Prestamo from './Prestamo'
import { Switch, Route, NavLink } from 'react-router-dom'


function App() {
  return (
    <div>
      <Header/>
      <DetalleCliente/>
    </div>
  );
}

export default App;
