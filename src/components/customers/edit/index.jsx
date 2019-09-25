import React, { Component } from 'react'
import './index.scss'
import firebase from 'firebase'
import { toast } from 'react-toastify'

class EditCustomer extends Component {
    constructor(props){
        super(props)
        this.state = {
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
        let { datesCustomers } = this.state
        datesCustomers.Nombre = e.target.value
        console.log("Your name is " + e.target.value)
        this.setState(datesCustomers)
    }
    changeFirstName = (e) => {
        let { datesCustomers } = this.state
        datesCustomers.Apellido = e.target.value
        this.setState(datesCustomers)
    }
    changeAddress = (e) => {
        let { datesCustomers } = this.state
        datesCustomers.Direccion = e.target.value
        this.setState(datesCustomers)
    }
    changeEmail = (e) => {
        let { datesCustomers } = this.state
        datesCustomers.Correo = e.target.value
        this.setState(datesCustomers)
    }
    changePhone = (e) => {
        let { datesCustomers } = this.state
        datesCustomers.Telefono = e.target.value
        this.setState(datesCustomers)
    }

    Edit = () => {
        console.log(this.state.datesCustomers)
        firebase.firestore().collection('customers').doc(this.state.dates.id)
        .set(this.state.datesCustomers)
        .then(()=>{
            toast.success("Datos actualizados")
            let {datesCustomers} = this.state
            datesCustomers.Nombre = ""
            datesCustomers.Apellido = ""
            datesCustomers.Direccion = ""
            datesCustomers.Correo = ""
            datesCustomers.Telefono = ""
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