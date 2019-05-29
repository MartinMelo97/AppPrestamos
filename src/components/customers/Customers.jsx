import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import './customers.scss'

import CustomerDetail from './CustomerDetail'

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
            }
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
                </Switch>
            </div>
        )
    }
}

export default Customers