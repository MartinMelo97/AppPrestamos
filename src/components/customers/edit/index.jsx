import React, { Component } from 'react'
import './index.scss'
import firebase from 'firebase'
import { toast } from 'react-toastify'

class EditCustomer extends Component {
    constructor(props){
        super(props)
        this.state = {
            Customers: {
                Nombre: "",
                Apellido: "",
                Direccion: "",
                Correo: "",
                Telefono: ""
            },
            dates: this.props.location.state,
            datesCustomers: {
                Nombre: "",
                Apellido: "",
                Direccion: "",
                Correo: "",
                Telefono: ""
            },
        }
    }
    componentDidMount = () => {
        firebase.firestore().collection('customers').doc(this.state.dates.id)
        .get().then(doc => {
            const {datesCustomers} = this.state
            datesCustomers.Nombre = doc.data().Nombre
            datesCustomers.Apellido = doc.data().Apellido
            datesCustomers.Correo = doc.data().Correo
            datesCustomers.Direccion = doc.data().Direccion
            datesCustomers.Telefono = doc.data().Telefono
            this.setState(datesCustomers)
            console.log("Datos que traigo uwu "+this.state.datesCustomers)
          })
          .catch(err => {
            console.log('Error getting document', err);
          })
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

    Edit = () => {
        console.log(this.state.Customers)
        firebase.firestore().collection('customers').doc(this.state.dates.id)
        .set(this.state.Customers)
        .then(()=>{
            toast.success("Datos actualizados")
            let {datesCustomers} = this.state
            datesCustomers.nombre = ""
            datesCustomers.apellido = ""
            datesCustomers.direccion = ""
            datesCustomers.correo = ""
            datesCustomers.telefono = ""
            this.setState(datesCustomers)
        })
        .catch((err)=>{
            toast.error("Datos no actualizados")
            console.log(err)
        })
    }

    render(){
        return(
            <div className="new-custumer-container">
                <p className="title-new-customer">Editar Cliente</p>
                <div className="topics-container">
                    <div className="topic">
                        <p>Nombre</p>
                        <input type="text" onChange={(e)=>this.changeName(e)} value={this.state.datesCustomers.Nombre}/>
                        <p>Apellido</p>
                        <input type="text" onChange={(e)=>this.changeFirstName(e)} value={this.state.datesCustomers.Apellido}/>
                        <p>Dirección</p>
                        <input type="text" onChange={(e)=>this.changeAddress(e)} value={this.state.datesCustomers.Direccion}/>
                        <p>Correo</p>
                        <input type="text" onChange={(e)=>this.changeEmail(e)} value={this.state.datesCustomers.Correo}/>
                        <p>Teléfono</p>
                        <input type="text" onChange={(e)=>this.changePhone(e)} value={this.state.datesCustomers.Telefono}/>
                    </div>
                </div>
                <button className="add-button" onClick={this.Edit}>Editar</button>
            </div>
        )
    }
}

export default EditCustomer