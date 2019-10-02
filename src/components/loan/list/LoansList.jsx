import React, { Component } from 'react'
import './loans_list.scss'
import ProgressBar from './ProgressBar'
import firebase from 'firebase'
class LoansList extends Component {
    constructor(props){
        super(props)
        this.state = {
            list: [],
            loansDates: {
                Cantidad: 0,
                pago: 0,
                fechaInicio: "",
                fechaFin: "",
                percentage: 0
            }
        }
    }
    componentDidMount = () => {
        firebase.firestore().collection('loan').orderBy('Num_Prestamo')
            .onSnapshot((dates)=>{
            let Loans = []
            dates.forEach(date=>{
                let dato = date.data()
                Loans.push(dato)
            })
            this.setState({list: Loans})
        })
    }

    goInfo = (e, Cantidad, fechaInicio, fechaFin, percentage, pago ) => {
        const {loansDates} = this.state
        loansDates.pago = pago
        loansDates.percentage = percentage
        loansDates.fechaFin = fechaFin
        loansDates.fechaInicio = fechaInicio
        loansDates.Cantidad = Cantidad
        this.setState(loansDates)

        this.props.history.push({
            pathname: '/dashboard/info',
            state: this.state.loansDates
        })
    }

    render(){
        return(
            <div className="detail">
            <div className="head">
                    <p className="client-name">{this.state.list.prestamo}</p>
           </div>
           { this.state.list.length > 0 ? this.state.list.map((loan, i)=>(
               <div className="btn-list" key={i} onClick={(e) => this.goInfo(e, loan.Cantidad, loan.fechaInicio, loan.fechaFin, loan.percentage, loan.pago)}>
                    <span>{i+1}</span>
                    <span>{loan.Cliente}</span>
                    <span>{loan.fechaInicio}</span>
                    <div className="Progress"><ProgressBar percentage={loan.percentage}/></div>
               </div>
           ))
            : <p>Cargando..</p>
            }
            </div>
        )
    }
}

export default LoansList