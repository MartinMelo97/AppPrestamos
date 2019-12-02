import React, { Component } from 'react'
import './record.scss'
import arrow from '../../../assets/icons/left-arrow.svg'
import firebase from 'firebase'
import {NavLink} from 'react-router-dom'
import NotFoundData from './NotFound'
export default class RecordY extends Component {
    constructor(props){
        super(props)
        this.state = {
            payments:[],
            date: "",
            datesLoan: {
                Nombre: "",
                fecha: "",
                pago: 0,
                num: 0
            }
        }
    }
    componentDidMount = () =>{
        var newDate = new Date()
        var newDay = newDate.getDate()-1
        var newMonth = newDate.getMonth()+1
        var newYear = newDate.getFullYear()
        var newFecha = newDay+"/"+newMonth+"/"+newYear

        firebase.firestore().collection('LoansByDate').where("date", "==", newFecha)
            .onSnapshot((infoLoan)=>{
            let loans = []
            infoLoan.forEach(date=>{
                let dato = date.data()
                loans.push(dato)
            })
            loans.forEach(payment => this.setState({payments: payment.payments, date: payment.date}))
        })
    }
    Detail = (e, Cliente, pago, num ) => {
        let {datesLoan} = this.state
        datesLoan.Nombre = Cliente
        datesLoan.pago = pago
        datesLoan.num = num
        datesLoan.fecha = this.state.date 
        this.setState(datesLoan)
        this.props.history.push({
            pathname: '/historial/detalle/',
            state: this.state.datesLoan
        })
    }

    render(){
        return(
            <div className="general-record-container">
                <NavLink to="/general/historial/"><img src={ arrow } alt="anterior" className="arrow-l"/></NavLink>
                <NavLink to="/general/historial/buscar"><img src={ arrow } alt="siguiente" className="arrow-r"/></NavLink>

                <p className="header-general-record">Historial</p>
                <span className="subtitle-general-record">Ayer
                </span>
                <div className="customers-name-container">
                { this.state.payments.length > 0 ?
                    this.state.payments.map((payment, i)=>(
                        <span key={i} 
                        onClick={(e) => this.Detail(e, payment.customer, payment.amount, payment.NumLoan)}
                        ><p>{payment.customer}</p><p>${payment.amount}</p></span>
                    ))
                    :
                    <NotFoundData/> }
                </div>
            </div>
        )
    }
} 