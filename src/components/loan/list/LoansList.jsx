import React, { Component } from 'react'
import './loans_list.scss'
import ProgressBar from './ProgressBar'
import arrow from './../../../assets/icons/left-arrow.svg'
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
                name: this.props.location.state.name,
                id: this.props.location.state.id,
                payments: "",
                loans: this.props.location.state.loans,
                ref: "",
            },
            loansInfo: {
                cantidad: 0,
                pago: 0,
                fechaInicio: "",
                fechaFin: "",
                restante: 0,
                loans: this.props.location.state.loans,
                payments: ""
            }
        }
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
        this.setState(loansDates)
        
        this.props.history.push({
            pathname: '/prestamos/detalle/',
            state: this.state.loansDates
        })
    }


    render(){
        return(
            <div className="detail">
            <img onClick={()=> window.history.back()} src={arrow} className="img-arrow-back" alt="arrow"/>    
            <div className="head">
                <p className="client-name">{this.props.location.state.name}</p>
                <span>Préstamo</span>
           </div>
           { this.props.location.state.loans.length > 0 ? this.props.location.state.loans.map((loan, i)=>(
               <div className="btn-list" key={i} onClick={(e) => this.goInfo(e, loan.dateEnd, loan.dateStart, loan.total, loan.loanRef, loan.payed, loan.remaining, loan.payments)}>
                    <span>{i+1}</span>
                    <span>${loan.total} MXN</span>
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