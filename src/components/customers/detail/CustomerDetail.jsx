import React, { Component } from 'react'
import './customer_detail.scss'

class CustomerDetail extends Component{
    constructor(props){
        super(props)
        this.state = {
            customer:{
                name: 'Alicia',
                active: 2,
                email: 'test@gmail.com',
                direction: 'Col. Centro #20',
                phoneNumber: '772 123 9823'
            }
        }
    }

    render(){
        return(
            <div className="detail">
                <div className="head">
                    <p className="client-name">{this.state.customer.name}</p>
                    <span>Info</span>
                </div>
                <div className="client-data">
                    <p>Activos: <span>{this.state.customer.active}</span></p>
                    <p>{this.state.customer.email}</p>
                    <p>{this.state.customer.direction}</p>
                    <p>{this.state.customer.phoneNumber}</p>
                </div>
                <button className="edit-button">Editar</button>
            </div>
        )
    }
}

export default CustomerDetail