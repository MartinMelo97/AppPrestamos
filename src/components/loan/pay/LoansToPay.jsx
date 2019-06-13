import React, { Component } from 'react'
import './loans_to_pay.scss'

class LoansToPay extends Component {
    constructor(props){
        super(props)
        this.state = {
            customer:{
                name: 'Alicia',
                payNumber: 1,
            },
            active: false
        }
    }

    changeActive = () =>{
        let button = document.getElementsByClassName('button-style-two')[0]
        let container = document.getElementsByClassName('ghost-container')[0]
        let { active } = this.state

        button.className = active ? "button-style-two not-active" : "button-style-two active"
        container.className = active ? "ghost-container not-active" : "ghost-container active"
        active = !active

        this.setState({ active })
    }

    render(){
        return(
            <div className="pay-loan-container">
                <p className="pay-loan-title">
                { this.state.customer != null ?
                this.state.customer.name
                : 
                null}
                    <span className="pay-loan-subtitle">
                        Pago #{ this.state.customer != null ?
                                this.state.customer.payNumber
                                : 
                                null}
                    </span>
                </p>
                <div className="buttons-container">
                    <button className="button-style-one">Pagar</button>
                    <span>Ó</span>
                    <button 
                    className="button-style-two not-active"
                    onClick={ () => this.changeActive() }
                    >Parcial</button>
                    <div className="ghost-container not-active">
                        <input type="number" placeholder="$"/>
                        <button className="button-add">Agregar</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoansToPay