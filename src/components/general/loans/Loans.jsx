import React, { Component } from 'react'
import './loans.scss'
import { NavLink } from 'react-router-dom'
import plus from '../../../assets/icons/plus.svg'
import firebase from 'firebase' 
class Loans extends Component {
    constructor(props){
        super(props)
        this.state = {
            customers:[],
            blues:[],
            day: 1,
            actualDay: null,
            datesLoan: {
                id: "",
                Nombre: "",
                diaInicio: "",
                diaFin: "",
                mesInicio: "",
                mesFin: "",
                Year: "",
                numPay: "",
                pago: "",
                cantidad: "",
            }
        }
    }

    bluesGenerate = () =>{
        let { blues } = this.state

        let optionsB = ['7','8','9','a','b','c','d','e','f']
        let optionsRG = ['0','1','2']

        let blue = '#'
        let random

        for(let i = 0; i < 500; i++){
            for(let i = 0; i < 4; i++){
                random = Math.floor(Math.random() * optionsRG.length)
                blue += optionsRG[random]
            }
            for(let i = 0; i < 4; i++){
                random = Math.floor(Math.random() * optionsB.length)
                blue += optionsB[random]
            }
            blues.push(blue)
            blue = '#'
        }
        this.setState({ blues })
    }

    componentDidMount = () =>{
        this.bluesGenerate()
        let { actualDay } = this.state
        actualDay = new Date().getDate()
        this.setState({ actualDay })

        firebase.firestore().collection('loan')
            .onSnapshot((dates)=>{
            let names = []
            dates.forEach(date=>{
                let dato = date.data()
                dato.id = date.id
                names.push(dato)
            })
            this.setState({customers: names})
        })
    }

    Detail = (e,id, Cliente, diaInicio, diaFin, mesInicio, mesFin,Year, pago, numPay, Cantidad) => {
        let {datesLoan} = this.state
        datesLoan.id = id
        datesLoan.mesInicio = mesInicio
        datesLoan.mesFin = mesFin
        datesLoan.Year = Year
        datesLoan.Nombre = Cliente
        datesLoan.diaInicio = diaInicio
        datesLoan.diaFin = diaFin
        datesLoan.numPay = numPay
        datesLoan.pago = pago
        datesLoan.cantidad = Cantidad
        this.setState(datesLoan)
        this.props.history.push({
            pathname: '/prestamos/detalle/',
            state: this.state.datesLoan
        })
    }

    render(){
        return(
            <div className="general-loans-container">
                <p className="customers-loans-title">Prestamos
                <NavLink to="/prestamos/nuevo/"><img src={ plus } alt="agregar"/></NavLink>
                </p>
                <div className="customers-container">
                    {this.state.customers.length > 0 ?
                    this.state.customers.map((customer, i)=>(
                        <div className="loans-container" key={i}
                        onClick={(e) => this.Detail(e, customer.id, customer.Cliente, customer.diaInicio, customer.diaFin, customer.mesInicio, customer.mesFin,customer.Year, 
                            customer.pago, customer.numPay, customer.Cantidad )}
                        style = {{
                            backgroundColor : this.state.blues[i]
                        }} >
                            <span>{customer.Cliente}</span>
                            <span>${customer.Cantidad}</span>
                        </div>
                    ))
                    :
                    null}
                </div>
            </div>
        )
    }
}

export default Loans