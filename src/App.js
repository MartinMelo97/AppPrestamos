import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import Header from './components/common/header/Header'
import NotFound from './components/common/not_found/NotFound'

import Login from './components/login/Login'

import CustomerDetail from './components/customers/detail/CustomerDetail'
import CustomersLoans from './components/customers/loans/CustomersLoans'
import NewCustomer from './components/customers/new/NewCustomer'

import CutOfDay from './components/general/cut/CutOfDay'
import Record from './components/general/record/Record'
import GeneralSummary from './components/general/summary/GeneralSummary'
import Today from './components/general/today/Today'

import LoansDetail from './components/loan/detail/LoansDetail'
import LoansList from './components/loan/list/LoansList'
import LoansToPay from './components/loan/pay/LoansToPay'
import NewLoan from './components/loan/new/NewLoan'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      user:null
    }
  }

  render(){
    return (
      this.state.user === null ?
      <Login />
      :
      <div>
        <Header/>
        <Switch>
  
          <Route exact path="/clientes/detalle/" component={ CustomerDetail } />
          <Route exact path="/clientes/prestamos/" component={ CustomersLoans } />
          <Route exact path="/clientes/nuevo/" component={ NewCustomer } />
  
          <Route exact path="/general/corte-dia/" component={ CutOfDay } />
          <Route exact path="/general/historial/" component={ Record } />
          <Route exact path="/general/resumen/" component={ GeneralSummary } />
          <Route exact path="/general/hoy/" component={ Today } />
  
          <Route exact path="/prestamos/detalle/" component={ LoansDetail } />
          <Route exact path="/prestamos/lista/" component={ LoansList } />
          <Route exact path="/prestamos/a-pagar/" component={ LoansToPay } />
          <Route exact path="/prestamos/nuevo/" component={ NewLoan } />
  
          <Route component={ NotFound } />
        </Switch>
      </div>
    )
  }
}

export default App;
