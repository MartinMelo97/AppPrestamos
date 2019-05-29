import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import './customers.scss'

import NotFound from '../common/not_found/NotFound'

import CustomerDetail from './CustomerDetail'
import NewCustomer from './NewCustomer'

class Customers extends Component{
    constructor(props){
        super(props)
        this.state = {
            customer:{
                name:'Alicia',
                active:2,
                email:'test@gmail.com',
                direction:'Col. Centro #20',
                phoneNumber:'772 123 9823'
            },
            topics : [
                'Nombre',
                'Apellidos',
                'Dirección',
                'Correo',
                'Teléfono'
            ]
        }
    }

    render(){
        return(
            <div>
                <Switch>
                    <Route
                        exact path="/clientes/detalle/"
                        render = {()=><CustomerDetail customer = { this.state.customer }/>}
                    />
                    <Route
                        exact path="/clientes/nuevo/"
                        render = {()=><NewCustomer topics = { this.state.topics }/>}
                    />
                    <Route component={NotFound}/>
                </Switch>
            </div>
        )
    }
}

export default Customers