import React, { Component } from 'react'
import './cut_of_day.scss'
import firebase from 'firebase'
class CutOfDay extends Component {
    constructor(props){
        super(props)
        this.state = {
            payments: [],
            total: 0
        }
    }
    componentDidMount = () => {
        var newDate = new Date()
        var newDay = newDate.getDate()
        var newMonth = newDate.getMonth()+1
        var newYear = newDate.getFullYear()
        var fecha = newDay+"/"+newMonth+"/"+newYear
        firebase.firestore().collection('LoansByDate').where("date","==",fecha)
            .onSnapshot((infoLoan)=>{
            let loans = []
            infoLoan.forEach(date=>{
                let dato = date.data()
                loans.push(dato)
            })
            console.log(loans)
            loans.forEach(payment => this.setState({payments: payment.payments, total: payment.total}))
        })
        
    }
    render(){
        return(
            <div className="cut-day-container">
                <div className="part-one">
                    <p>Corte de Hoy</p>
                    <div className="list-loans-container">
                        {this.state.payments.length > 0 ?
                        this.state.payments.map((payment, i)=>(
                            <div className="customer-value-container" key={i}> 
                                <span className="customer-name">{payment.customer}</span>
                                <span className="customer-value">{ `$${payment.amount}` }</span>
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