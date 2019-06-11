import React, { Component } from 'react'
import './loans_to_pay.scss'

class LoansToPay extends Component {
    constructor(props){
        super(props)
        this.state = {
            customer:{
                name: 'Alicia',
                payNumber: 1,
            }
        }
    }

    render(){
        return(
            <div className="pay-loan-container">
                <p className="pay-loan-title">
                { this.state.customer != null ?
                customer.name
                : 
                null}
                </p>
                <span className="pay-loan-subtitle">
                    Pago #{ this.state.customer != null ?
                            customer.payNumber
                            : 
                            null}
                </span>
                <div className="buttons-container">
                    <button>Pagar</button>
                </div>
            </div>
        )
    }
}

export default LoansToPay