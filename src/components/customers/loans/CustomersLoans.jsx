import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './customers_loans.scss'
import plus from '../../../assets/icons/plus.svg'
import info from '../../../assets/icons/information.svg'
import firebase from 'firebase'
class CustomersLoans extends Component {
    constructor(props){
        super(props)
        this.state = {
            reds:[],
            customers: null,
            areCustomers: false,
            datesCustomer: {
                id: "",
                nombre: "",
                apellido: "",
                correo: "",
                direccion: "",
                telefono: "",
            },
        }
    }

    componentDidMount = () => {
        firebase.firestore().collection('customers')
        .onSnapshot((customers)=>{
          let array_dates = []
          customers.forEach(date=>{
              let dato = date.data()
              dato.id = date.id
              array_dates.push(dato)
          })
          this.setState({customers: array_dates, areDates: true})
      })
      this.redsGenerate()
    }

    redsGenerate = () =>{
        let { reds } = this.state

        let optionsR = ['7','8','9','a','b','c','d','e','f']
        let optionsGB = ['0','1','2']

        let red = '#'
        let random

        for(let i = 0; i < 500; i++){
            for(let i = 0; i < 2; i++){
                random = Math.floor(Math.random() * optionsR.length)
                red += optionsR[random]
            }
            for(let i = 0; i < 4; i++){
                random = Math.floor(Math.random() * optionsGB.length)
                red += optionsGB[random]
            }
            reds.push(red)
            red = '#'
        }
        this.setState({ reds })
    }

    DatesCustomers = (e, id, Nombre, Apellido, Correo, Direccion, Telefono) => {
        console.log("llego?")
        let {datesCustomer} = this.state
        datesCustomer.id = id
        datesCustomer.nombre = Nombre
        datesCustomer.correo = Correo
        datesCustomer.apellido = Apellido
        datesCustomer.direccion = Direccion
        datesCustomer.telefono = Telefono
        this.setState(datesCustomer)

        this.props.history.push({
           pathname: '/clientes/detalle/',
           state: this.state.datesCustomer
        })
    }

    render(){
        return(
            <div className="customers-loans-container">
                <p className="customers-loans-title">Clientes
                <NavLink to="/clientes/nuevo/"><img src={ plus } alt="agregar"/></NavLink>
                </p>
                <div className="info-customers-container">
                    { this.state.customers ?
                    this.state.customers.map((customer, i)=>(
                        <div className="info-customer-container" key={i}>
                            <span style = {{
                                backgroundColor : this.state.reds[i]
                            }}>{customer.Nombre}</span>
                                <img src={ info } alt="info" onClick={(e)=>this.DatesCustomers(e, customer.id, customer.Nombre, customer.Apellido, customer.Correo, customer.Direccion, customer.Telefono )}/>
                        </div>
                    ))
                    :
                    <p>Cargando...</p>}
                </div>
                <div className="transparent-white-div"/>
            </div>
        )
    }
}

export default CustomersLoans