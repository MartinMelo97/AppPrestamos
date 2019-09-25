import React, { Component } from 'react'
import './cut_of_day.scss'
import firebase from 'firebase'
class CutOfDay extends Component {
    constructor(props){
        super(props)
        this.state = {
            customers: [],
            total: 0
        }
    }
    componentDidMount = () => {
        firebase.firestore().collection('loan')
            .onSnapshot((dates)=>{
            let names = []
            dates.forEach(date=>{
                let dato = date.data()
                dato.id = date.id
                names.push(dato)
            })
            this.setState({customers: names})
            this.updateTotal()
        })
        
    }

    updateTotal = () =>{
        let { total, customers } = this.state

        if( customers.length > 0 ){
            total = 0
            for(let i = 0; i < customers.length; i++){
                total += customers[i].pago
            }

            this.setState({ total })
        }
    }

    render(){
        return(
            <div className="cut-day-container">
                <div className="part-one">
                    <p>Corte de Hoy</p>
                    <div className="list-loans-container">
                        {this.state.customers.length > 0 ?
                        this.state.customers.map((customer, i)=>(
                            <div className="customer-value-container" key={i}> 
                                <span className="customer-name">{customer.Cliente}</span>
                                <span className="customer-value">{ `$${customer.pago}` }</span>
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