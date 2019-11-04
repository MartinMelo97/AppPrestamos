import React from 'react'
import { Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './auth'
import PrivateRoute from './routes/PrivateRoute'
import PublicRoute from './routes/PublicRoute'

import 'react-toastify/dist/ReactToastify.css'
import 'antd/dist/antd.css'

import Header from './components/common/header/Header'
import NotFound from './components/common/not_found/NotFound'

import Login from './components/login/Login'
import Register from './components/register'

import CustomerDetail from './components/customers/detail/CustomerDetail'
import CustomersLoans from './components/customers/loans/CustomersLoans'
import NewCustomer from './components/customers/new/NewCustomer'
import EditCustomer from './components/customers/edit'

import CutOfDay from './components/general/cut/CutOfDay'
import Record from './components/general/record/Record'
import GeneralSummary from './components/general/summary/GeneralSummary'
import Loans from './components/general/loans/Loans'

import LoansDetail from './components/loan/detail/LoansDetail'
import LoansList from './components/loan/list/LoansList'
import LoansToPay from './components/loan/pay/LoansToPay'
import NewLoan from './components/loan/new/NewLoan'

import ListOptions from './components/options/menu'
import ListAmins from './components/options/admins'
import DetailAmins from './components/options/admins/detail'
import EditAdmins from './components/options/admins/edit'
import RecordDetail from './components/general/record/Detail'
import ErrorAccount from './components/common/Error'
import RecordY from './components/general/record/RecordY'
import RecordUpdate from './components/general/record/RecordUpdate'

const App = () => {
  return (
    <AuthProvider>
    <div>
      <Header/>
      <ToastContainer />
      <Switch>
        <PublicRoute exact path="/" component={ Login }/>
        <PrivateRoute exact path="/registro" component={ Register }/>
        <PrivateRoute exact path="/historial/detalle" component={ RecordDetail }/>
        <PrivateRoute exact path="/general/historial/ayer" component={ RecordY }/>
        <PrivateRoute exact path="/general/historial/buscar" component={ RecordUpdate }/>
        <PrivateRoute exact path="/error" component={ ErrorAccount }/>
        <PrivateRoute exact path="/prestamos/lista/" component={ LoansList }/>
        <PrivateRoute exact path="/opciones/lista/" component={ ListOptions }/>
        <PrivateRoute exact path="/opciones/admins/" component={ ListAmins }/>
        <PrivateRoute exact path="/admins/editar/" component={ EditAdmins }/>
        <PrivateRoute exact path="/admins/detalle/" component={ DetailAmins }/>

        <PrivateRoute exact path="/clientes/detalle/" component={ CustomerDetail } />
        <PrivateRoute exact path="/clientes/prestamos/" component={ CustomersLoans } />
        <PrivateRoute exact path="/clientes/nuevo/" component={ NewCustomer } />
        <PrivateRoute exact path="/clientes/editar/" component={ EditCustomer } />

        <PrivateRoute exact path="/general/corte-dia/" component={ CutOfDay } />
        <PrivateRoute exact path="/general/historial/" component={ Record } />
        <PrivateRoute exact path="/general/resumen/" component={ GeneralSummary } />
        <PrivateRoute exact path="/general/prestamos/" component={ Loans } />

        <PrivateRoute exact path="/prestamos/detalle/" component={ LoansDetail } />
        <PrivateRoute exact path="/prestamos/lista/" component={ LoansList } />
        <PrivateRoute exact path="/prestamos/a-pagar/" component={ LoansToPay } />
        <PrivateRoute exact path="/prestamos/nuevo/" component={ NewLoan } />

        <PrivateRoute component={ NotFound } />
      </Switch>
    </div>
    </AuthProvider>
  )
}

export default App;
