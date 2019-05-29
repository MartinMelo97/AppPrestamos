import React from 'react';
import Login from './Login'
import Principal from './Principal'
import NumberPayments from './NumberPayments'
import Calendar from './Calendar'
import Header from './components/common/header/Header'

import Customers from './components/customers/Customers'

import NotFound from './components/common/not_found/NotFound'

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
      <Switch>
        <Route path="/clientes/" component={ Customers } />
        <Route component={ NotFound } />
      </Switch>
    </div>
  );
}

export default App;
