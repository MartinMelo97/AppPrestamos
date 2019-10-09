import React, { Component } from 'react'
import './record.scss'
import arrow from '../../../assets/icons/left-arrow.svg'
import firebase from 'firebase'
import {NavLink} from 'react-router-dom' 
import plus from './../../../assets/icons/magnifying-glass.svg'
export default class RecordUpdate extends Component {
    constructor(props){
        super(props)
        this.state = {
            payments:[],
            days: [],
            date: "",
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
    componentDidMount = () => {
        let { days } = this.state
        days.unshift("Día")
        for(var i=1; i<32; i++){
            days.push(`${i}`)
        }
        this.setState({days})
    }

    Detail = (e, Cliente, pago ) => {
        let {datesLoan} = this.state
        datesLoan.Nombre = Cliente
        datesLoan.pago = pago
        datesLoan.fecha = this.state.date 
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
        firebase.firestore().collection('LoansByDate').where("date", "==", fecha)
            .onSnapshot((infoLoan)=>{
            let loans = []
            infoLoan.forEach(date=>{
                let dato = date.data()
                loans.push(dato)
            })
            loans.forEach(payment => this.setState({payments: payment.payments, date: payment.date}))
        })
    }

    render(){
        const month = ["Mes","Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre","Octubre", "Noviembre", "Diciembre"]
        const years = ["Año", 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]
        return(
            <div className="general-record-container">
                <NavLink to="/general/historial/ayer"><img src={ arrow } alt="anterior" className="arrow-l"/></NavLink>

                <p className="header-general-record">Historial</p>
                <span className="subtitle-general-record-search">Buscar</span>

                <div className="update-record">
                    <select onChange={(e)=>this.ChangeDay(e)}>
                    { this.state.days.map((item, i)=>(
                        <option value={item} key={i} >{item}</option>
                    ))}
                    </select>

                    <select onChange={(e)=>this.ChangeMonth(e)}>
                    { month.map((item, i)=>(
                        <option value={i} key={i} >{item}</option>
                    ))}
                    </select>

                    <select onChange={(e)=>this.ChangeYear(e)}>
                    { years.map((item, i)=>(
                        <option value={item} key={i} >{item}</option>
                    ))}
                    </select>
                    <img src={plus} alt="search" onClick={() => this.SearchDates()}/>
                </div>
                <div className="customers-name-container">
                { this.state.payments ?
                    this.state.payments.map((payment, i)=>(
                        <span key={i} 
                        onClick={(e) => this.Detail(e, payment.customer, payment.amount)}
                        >{ payment.customer }</span>
                    ))
                    :
                    <p>No hay datos para mostrar.</p> }
                </div>
            </div>
        )
    }
}

 