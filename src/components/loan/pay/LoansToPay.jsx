import React, { Component } from 'react'
import './loans_to_pay.scss'
import firebase from 'firebase'
import {toast} from 'react-toastify'
import arrow from '../../../assets/icons/left-arrow.svg'

class LoansToPay extends Component {
    constructor(props){
        super(props)
        this.state = {
            customer:{
                name: this.props.location.state.name,
                payNumber: this.props.location.state.payments.length + 1,
            },
            percentage: "",
            payment: [],
            pay: {
                date: "",
                number: 0,
                amount: "",
                created: firebase.firestore.Timestamp.fromDate(new Date()),
                updated: firebase.firestore.Timestamp.fromDate(new Date()),
            }, 
            infoByLoan: {
                pays: [],
                total: 0,
                id: ""
            },
            info: "",
            SummaryLoan: {
                amount: 0,
                customer: this.props.location.state.name,
                customerRef: `/Customers/${this.props.location.state.id}`,
                created: firebase.firestore.Timestamp.fromDate(new Date()),
                updated: firebase.firestore.Timestamp.fromDate(new Date()),
            }  
        }
    }
    componentDidMount = () =>{
        var newDate = new Date()
        var newDay = newDate.getDate()
        var newMonth = newDate.getMonth()+1
        var newYear = newDate.getFullYear()
        var newFecha = newDay+"/"+newMonth+"/"+newYear
        let {pay} = this.state
        pay.date = newFecha
        
        firebase.firestore().collection('LoansByDate').where("date", "==", newFecha)
        .onSnapshot(infoLoan=>{
            let loans = []
            infoLoan.forEach(date=>{
                let dato = date.data()
                dato.id = date.id
                loans.push(dato)
            })
            let {infoByLoan} = this.state
            loans.forEach(item => {
                infoByLoan.id = item.id
                infoByLoan.total = item.total
                if(item.payments !== undefined){
                    infoByLoan.pays = item.payments
                }
            }) 
            this.setState(infoByLoan)
        })
        if (this.props.location.state.payments !== undefined){
            this.setState({payment: this.props.location.state.payments})
            pay.number = this.props.location.state.payments.length + 1
        } else {
            pay.number = 1
        }
        this.setState(pay)
        
    }
    payChange = (e) => {
        let {pay} = this.state
        pay.amount = parseInt(e.target.value)
        this.setState(pay)
    }
    loanPay = () => {
        if (this.state.pay.amount === ""){
            toast.error("No has agregado un pago!")
        } else {
            var payed = this.state.pay.amount + this.props.location.state.pago
        var remaining = this.props.location.state.cantidad - payed

        var payments = this.state.payment
        payments.push(this.state.pay)

        const loans = this.props.location.state.loans
        let loanToSelect = loans.filter(loan => {
            return loan.loanRef === this.props.location.state.ref;
        }) 

        var addItemsLoans = loanToSelect[0]
        addItemsLoans.payments = payments
        addItemsLoans.payed = payed
        addItemsLoans.remaining = remaining
        addItemsLoans.updated = firebase.firestore.Timestamp.fromDate(new Date())


        let {SummaryLoan} = this.state
        SummaryLoan.amount = this.state.pay.amount
        this.setState(SummaryLoan)

        var Acumpay = this.state.infoByLoan.pays
        Acumpay.push(this.state.SummaryLoan)
        firebase.firestore().collection('Customers').doc(this.props.location.state.id)
        .update({loans})
        .then(()=>{
            toast.info("Se agregó el pago")
            let {pay} = this.state
            pay.amount = ""
            this.setState(pay)
            if (this.state.infoByLoan.id !== ""){
                firebase.firestore().collection('LoansByDate').doc(this.state.infoByLoan.id)
                .update({
                    date: this.state.pay.date,
                    total: this.state.infoByLoan.total + this.state.SummaryLoan.amount,
                    payments: Acumpay
                })
            } else {
                firebase.firestore().collection('LoansByDate').add({
                    date: this.state.pay.date,
                    total: this.state.SummaryLoan.amount,
                    payments: Acumpay
                })
            }
            this.props.history.push('/general/prestamos/')
        })
        .catch((err)=>{
            toast.error("No se agregó el pago")
            console.log(err)
        })
        }
    }

    render(){
        const {cantidad, pago, restante} = this.props.location.state
        return(
            <div className="pay-loan-container">
                <img onClick={()=> window.history.back()} src={arrow} className="img-arrow-back" alt="arrow"/>
                <p className="pay-loan-title">
                {this.state.customer.name}
                    <span className="pay-loan-subtitle">
                        Pago #{this.state.customer.payNumber}
                    </span>
                </p>
                <div className="buttons-container">
                    <div className="info-loan-summary-p">
                        <p>El préstamo fue: <span>${cantidad}</span></p>
                        <p>Cantidad pagada: <span>${pago}</span></p>
                        <p>Cantidad restante: <span>${restante}</span></p>
                    </div>
                    <button 
                    className="button-style-two active">Agregar pago</button>
                    <div className="ghost-container active">
                        <input type="number" placeholder="$" onChange={(e) => this.payChange(e)} value={this.state.pay.amount}/>
                        <button className="button-add" onClick={this.loanPay}>Registrar</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoansToPay