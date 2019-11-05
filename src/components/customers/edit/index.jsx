import React, { Component } from 'react'
import './index.scss'
import firebase from 'firebase'
import { toast } from 'react-toastify'
import arrow from './../../../assets/icons/left-arrow.svg'

class EditCustomer extends Component {
    constructor(props){
        super(props)
        this.state = {
            dates: this.props.location.state,
            datesCustomers: {
                firstName: "",
                lastName: "",
                address: "",
                email: "",
                phoneNumber: ""
            },
        }
    }
    componentDidMount = () => {
        firebase.firestore().collection('Customers').doc(this.state.dates.id)
        .get().then(doc => {
            const {datesCustomers} = this.state
            datesCustomers.firstName = doc.data().firstName
            datesCustomers.lastName = doc.data().lastName
            datesCustomers.email = doc.data().email
            datesCustomers.address = doc.data().address
            datesCustomers.phoneNumber = doc.data().phoneNumber
            this.setState(datesCustomers)
          })
          .catch(err => {
            console.log('Error getting document', err);
          })
    }

    changeName = (e) => {
        let { datesCustomers } = this.state
        datesCustomers.firstName = e.target.value
        this.setState(datesCustomers)
    }
    changeFirstName = (e) => {
        let { datesCustomers } = this.state
        datesCustomers.lastName = e.target.value
        this.setState(datesCustomers)
    }
    changeAddress = (e) => {
        let { datesCustomers } = this.state
        datesCustomers.address = e.target.value
        this.setState(datesCustomers)
    }
    changeEmail = (e) => {
        let { datesCustomers } = this.state
        datesCustomers.email = e.target.value
        this.setState(datesCustomers)
    }
    changePhone = (e) => {
        let { datesCustomers } = this.state
        datesCustomers.phoneNumber = e.target.value
        this.setState(datesCustomers)
    }

    Edit = () => {
        firebase.firestore().collection('Customers').doc(this.state.dates.id)
        .update({
            firstName: this.state.datesCustomers.firstName,
            lastName: this.state.datesCustomers.lastName,
            address: this.state.datesCustomers.address,
            email: this.state.datesCustomers.email,
            phoneNumber: this.state.datesCustomers.phoneNumber,
            updated: firebase.firestore.Timestamp.fromDate(new Date())
        })
        .then(()=>{
            toast.info("Datos actualizados!")
            let {datesCustomers} = this.state
            datesCustomers.firstName = ""
            datesCustomers.lastName = ""
            datesCustomers.address = ""
            datesCustomers.email = ""
            datesCustomers.phoneNumber = ""
            this.setState(datesCustomers)
            this.props.history.push('/clientes/prestamos/')
        })
        .catch((err)=>{
            toast.error("Datos no actualizados.")
        })
        var container = document.getElementById('btn-edit-client')
        container.disabled = true
        container.className = "btn-not-active"
    }

    render(){
        return(
            <div className="new-custumer-container">
                <img src={arrow} onClick={()=> window.history.back()} className="img-arrow-back" alt="arrow"/>
                <p className="title-new-customer">Editar Cliente</p>
                <div className="topics-container">
                    <div className="topic">
                        <p>Nombre</p>
                        <input type="text" onChange={(e)=>this.changeName(e)} value={this.state.datesCustomers.firstName}/>
                        <p>Apellido</p>
                        <input type="text" onChange={(e)=>this.changeFirstName(e)} value={this.state.datesCustomers.lastName}/>
                        <p>Dirección</p>
                        <input type="text" onChange={(e)=>this.changeAddress(e)} value={this.state.datesCustomers.address}/>
                        <p>Correo</p>
                        <input type="text" onChange={(e)=>this.changeEmail(e)} value={this.state.datesCustomers.email}/>
                        <p>Teléfono</p>
                        <input type="text" onChange={(e)=>this.changePhone(e)} value={this.state.datesCustomers.phoneNumber}/>
                    </div>
                </div>
                <button className="add-button" id="btn-edit-client" onClick={this.Edit}>Editar</button>
            </div>
        )
    }
}

export default EditCustomer