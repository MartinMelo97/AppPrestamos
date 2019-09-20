import React, { Component } from 'react'
import './new_customer.scss'
import firebase from 'firebase'
import { toast } from 'react-toastify'

class NewCustomer extends Component {
    constructor(props){
        super(props)
        this.state = {
            Customers: {
                Nombre: "",
                Apellido: "",
                Direccion: "",
                Correo: "",
                Telefono: ""
            }
        }
    }
    
    changeName = (e) => {
        let { Customers } = this.state
        Customers.Nombre = e.target.value
        this.setState(Customers)
    }
    changeFirstName = (e) => {
        let { Customers } = this.state
        Customers.Apellido = e.target.value
        this.setState(Customers)
    }
    changeAddress = (e) => {
        let { Customers } = this.state
        Customers.Direccion = e.target.value
        this.setState(Customers)
    }
    changeEmail = (e) => {
        let { Customers } = this.state
        Customers.Correo = e.target.value
        this.setState(Customers)
    }
    changePhone = (e) => {
        let { Customers } = this.state
        Customers.Telefono = e.target.value
        this.setState(Customers)
    }

    Register = () => {
        console.log(this.state.Customers)
        firebase.firestore().collection('customers').add(this.state.Customers)
        .then(()=>{
            toast.success("Datos registrados")
            let {Customers} = this.state
            Customers.Nombre = ""
            Customers.Apellido = ""
            Customers.Direccion = ""
            Customers.Correo = ""
            Customers.Telefono = ""
            this.setState(Customers)
        })
        .catch((err)=>{
            toast.error("Datos no registrados")
            console.log(err)
        })
    }
    render(){
        return(
            <div className="new-custumer-container">
                <p className="title-new-customer">Nuevo Cliente</p>
                <div className="topics-container">
                    <div className="topic">
                        <p>Nombre</p>
                        <input type="text" onChange={(e)=>this.changeName(e)} value={this.state.Customers.Nombre}/>
                        <p>Apellido</p>
                        <input type="text" onChange={(e)=>this.changeFirstName(e)} value={this.state.Customers.Apellido}/>
                        <p>Dirección</p>
                        <input type="text" onChange={(e)=>this.changeAddress(e)} value={this.state.Customers.Direccion}/>
                        <p>Correo</p>
                        <input type="text" onChange={(e)=>this.changeEmail(e)} value={this.state.Customers.Correo}/>
                        <p>Teléfono</p>
                        <input type="text" onChange={(e)=>this.changePhone(e)} value={this.state.Customers.Telefono}/>
                    </div>
                </div>
                <button className="add-button" onClick={this.Register}>Agregar</button>
            </div>
        )
    }
}

export default NewCustomer