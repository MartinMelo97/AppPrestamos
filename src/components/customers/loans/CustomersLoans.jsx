import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './customers_loans.scss'
import plus from '../../../assets/icons/plus.svg'
import info from '../../../assets/icons/information.svg'
import close from './../../../assets/icons/close.svg'
import firebase from 'firebase'
import {toast} from 'react-toastify'
import {Modal} from 'antd'
class CustomersLoans extends Component {
    constructor(props){
        super(props)
        this.state = {
            reds:[],
            visible: false,
            id: "",
            name: "",
            customers: null,
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
        firebase.firestore().collection('Customers').where("deleted", "==", false)
        .onSnapshot((customers)=>{
          let array_dates = []
          customers.forEach(date=>{
              let dato = date.data()
              dato.id = date.id
              array_dates.push(dato)
          })
          this.setState({customers: array_dates})
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
    DeleteCustomer = (e, id, name) => {
        this.setState({visible: true, id: id, name: name});
    }

    handleOk = e => {
        firebase.firestore().collection('Customers').doc(this.state.id).update({
            deleted: true
        }).then(()=>{
            toast.info("Cliente eliminado!")
        }).catch(err => {
            toast.error("Ups! no se pudo eliminar al cliente.")
            console.log(err)
        } )
        this.setState({
          visible: false,
        })
      }
    
      handleCancel = e => {
        this.setState({
          visible: false,
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
                            <span style = {{backgroundColor : this.state.reds[i]}}
                            onClick={(e)=>this.DatesCustomers(e, customer.id, customer.firstName, customer.lastName, customer.email, customer.address, customer.phoneNumber )}>
                            {customer.firstName} {customer.lastName}</span>
                                <img src={ info } alt="info" onClick={(e)=>this.DatesCustomers(e, customer.id, customer.firstName, customer.lastName, customer.email, customer.address, customer.phoneNumber )}/>
                                <img src={close} alt="close" onClick={(e)=>this.DeleteCustomer(e, customer.id, customer.firstName)}/>
                        </div>
                    ))
                    :
                    <p>Cargando...</p>}
                </div>
                <Modal
                    className="design-modal-c"
                    title="Confirma"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
                    <p>¿Estás seguro de eliminar a {this.state.name}?</p>
                </Modal>
            </div>
        )
    }
}

export default CustomersLoans