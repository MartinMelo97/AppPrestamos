import React, { Component } from 'react'
import './record.scss'
import arrow from '../../../assets/icons/left-arrow.svg'
import firebase from 'firebase'
import {NavLink} from 'react-router-dom'
export default class RecordY extends Component {
    constructor(props){
        super(props)
        this.state = {
            customers:[],
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

        firebase.firestore().collection('loan').where("datePay", "==", newFecha)
            .onSnapshot((dates)=>{
            let names = []
            dates.forEach(date=>{
                let dato = date.data()
                names.push(dato)
            })
            this.setState({customers: names})
        })
    }
    Detail = (e, Cliente, numPay, ultimatePay, datePay) => {
        let {datesLoan} = this.state
        datesLoan.Nombre = Cliente
        datesLoan.num = numPay
        datesLoan.pago = ultimatePay
        datesLoan.fecha = datePay
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
                    { this.state.customers.length > 0 ?
                    this.state.customers.map((customer, i)=>(
                        <span key={i} 
                        onClick={(e) => this.Detail(e, customer.Cliente, customer.numPay, customer.ultimatePay, customer.datePay)}
                        >{ customer.Cliente }</span>
                    ))
                    :
                    <p>No hay datos para mostrar.</p> }
                </div>
            </div>
        )
    }
} 