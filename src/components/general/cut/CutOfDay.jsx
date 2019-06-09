import React, { Component } from 'react'
import './cut_of_day.scss'

class CutOfDay extends Component {
    constructor(props){
        super(props)
        this.state = {
            customers:[

            ],
            total: 0
        }
    }

    updateTotal = () =>{
        let { total, customers } = this.state

        if( customers.length > 0 ){
            total = 0
            for(let i = 0; i < customers.length; i++){
                total += customers[i].value
            }

            this.setState({ total })
        }
    }

    componentDidMount = () =>{
        this.updateTotal()
    }

    render(){
        return(
            <div className="cut-day-container">
                <div className="part-one">
                    <p>Corte de Hoy</p>
                    <div className="list-loans-container">
                        {this.state.customers.length > 0 ?
                        this.state.customers.map((customer, i)=>(
                            <div className="customer-value-container">
                                <span className="customer-name">{customer.name}</span>
                                <span className="customer-value">{ `$${customer.value}` }</span>
                            </div>
                        ))
                        :
                        null}
                    </div>
                </div>
                <div className="part-two">
                    <span>Total</span>
                    <span>{ `$${this.state.total}` }</span>
                </div>
            </div>
        )
    }
}

export default CutOfDay