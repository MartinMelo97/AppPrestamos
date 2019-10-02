import React, { Component } from 'react'
import './record.scss'
import arrow from '../../../assets/icons/left-arrow.svg'
import firebase from 'firebase'
import {NavLink} from 'react-router-dom' 
import plus from './../../../assets/icons/plus.svg'
export default class RecordUpdate extends Component {
    constructor(props){
        super(props)
        this.state = {
            customers:[],
            datesLoan: {
                Nombre: "",
                fecha: "",
                pago: 0,
                num: 0
            },
            day: 0,
            month: 0,
            year: 0, 
        }
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

    ChangeMonth = (e) =>{
        this.setState({month: e.target.value})
    }
    ChangeDay = (e) =>{
        this.setState({day: e.target.value})
    }
    ChangeYear = (e) =>{
        this.setState({year: e.target.value})
    }
    SearchDates = () =>{
        var fecha = this.state.day + "/" + this.state.month + "/"+ this.state.year
        console.log("Fecha: "+fecha)
        firebase.firestore().collection('loan').where("datePay", "==", fecha)
            .onSnapshot((dates)=>{
            let names = []
            dates.forEach(date=>{
                let dato = date.data()
                names.push(dato)
            })
            this.setState({customers: names})
        })
    }

    render(){
        const month = ["Mes","Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre","Octubre", "Noviembre", "Diciembre"]
        return(
            <div className="general-record-container">
                <NavLink to="/general/historial/ayer"><img src={ arrow } alt="anterior" className="arrow-l"/></NavLink>

                <p className="header-general-record">Historial</p>
                <span className="subtitle-general-record-search">Buscar</span>

                <div className="update-record">
                    <input type="number" placeholder="Día" onChange={(e)=>this.ChangeDay(e)}/>
                    <select onChange={(e)=>this.ChangeMonth(e)}>
                    { month.map((item, i)=>(
                        <option value={i} key={i} >{item}</option>
                    ))}
                    </select>
                    <input type="number" placeholder="Año" onChange={(e)=>this.ChangeYear(e)}/>
                    <img src={plus} alt="search" onClick={() => this.SearchDates()}/>
                </div>
                <div className="customers-name-container">
                    { this.state.customers.length > 0 ?
                    this.state.customers.map((customer, i)=>(
                        <span key={i} 
                        onClick={(e) => this.Detail(e, customer.Cliente, customer.numPay, customer.ultimatePay, customer.datePay )}
                        >{ customer.Cliente }</span>
                    ))
                    :
                    <p>No hay datos para mostrar.</p> }
                </div>
            </div>
        )
    }
}

 