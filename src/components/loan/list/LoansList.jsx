import React, { Component } from 'react'
import './loans_list.scss'
import ProgressBar from './ProgressBar'
import arrow from './../../../assets/icons/left-arrow.svg'
import firebase from 'firebase'
class LoansList extends Component {
    constructor(props){
        super(props)
        this.state = {
            loansDates: {
                cantidad: 0,
                pago: 0,
                fechaInicio: "",
                fechaFin: "",
                restante: 0,
                name: "",
                id: this.props.location.state.id,
                payments: "",
                loans: "",
                ref: "",
            },
            name: "",
            loans: []
        }
    }
    componentDidMount = () =>{
        firebase.firestore().collection('Customers').doc(this.props.location.state.id)
            .onSnapshot((customer)=>{
                var text = customer.data().firstName + " " + customer.data().lastName 
                var arrayName = text.split(" ")
                var exactName = arrayName[0]+" "+arrayName[1]
                this.setState({
                    name: exactName, 
                    loans: customer.data().loans
                })
        })
    } 

    goInfo = (e, fechaFin, fechaInicio, cantidad, ref, pago, rest, payments ) => {
        const {loansDates} = this.state
        loansDates.restante = rest
        loansDates.pago = pago
        loansDates.fechaFin = fechaFin
        loansDates.fechaInicio = fechaInicio
        loansDates.cantidad = cantidad
        loansDates.ref = ref
        loansDates.payments = payments
        loansDates.loans = this.state.loans
        loansDates.name = this.state.name
        this.setState(loansDates)
        
        this.props.history.push({
            pathname: '/prestamos/detalle/',
            state: this.state.loansDates
        })
    }


    render(){
        return(
            <div className="detail">
            <img onClick={()=> this.props.history.push('/general/prestamos/')} src={arrow} className="img-arrow-back" alt="arrow"/>    
            <div className="head">
                <p className="client-name">{this.state.name}</p>
                <span>Préstamo</span>
           </div>
           { this.state.loans.length > 0 ? this.state.loans.map((loan, i)=>(
               <div className="btn-list" key={i} onClick={(e) => this.goInfo(e, loan.dateEnd, loan.dateStart, loan.total, loan.loanRef, loan.payed, loan.remaining, loan.payments)}>
                    <span>{i+1}</span>
                    <span>${loan.total}</span>
                    <span>{loan.dateStart}</span>
                    <div className="Progress"><ProgressBar percentage={(loan.payed*100)/loan.total}/></div>
               </div>
           ))
            : <p>Cargando..</p>
            }
            </div>
        )
    }
}

export default LoansList