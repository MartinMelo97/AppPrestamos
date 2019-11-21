import React, { Component } from 'react'
import './new_customer.scss'
import firebase from 'firebase'
import { toast } from 'react-toastify'
import Loader from './../../common/loader/loader'
import arrow from './../../../assets/icons/left-arrow.svg'

class NewCustomer extends Component {
    constructor(props){
        super(props)
        this.state = {
            Customers: {
                firstName: "",
                lastName: "",
                address: "",
                email: "",
                phoneNumber: "",
                deleted: false,
                created: firebase.firestore.Timestamp.fromDate(new Date()),
                updated: firebase.firestore.Timestamp.fromDate(new Date()),
            },
            loader: false,
            list: [],
            id_list: "",
        }
    }
    componentDidMount = () =>{
        firebase.firestore().collection('Visits')
        .onSnapshot((customers)=>{
          let array_dates = []
          customers.forEach(date=>{
              let dato = date.data()
              dato.id = date.id
              array_dates.push(dato)
          })
          array_dates.forEach(date=>{
            this.setState({id_list: date.id, list: date.ListVisit})
          })
      })
    }
    changeName = (e) => {
        let { Customers } = this.state
        Customers.firstName = e.target.value
        this.setState(Customers)
    }
    changeFirstName = (e) => {
        let { Customers } = this.state
        Customers.lastName = e.target.value
        this.setState(Customers)
    }
    changeAddress = (e) => {
        let { Customers } = this.state
        Customers.address = e.target.value
        this.setState(Customers)
    }
    changeEmail = (e) => {
        let { Customers } = this.state
        Customers.email = e.target.value
        this.setState(Customers)
    }
    changePhone = (e) => {
        let { Customers } = this.state
        Customers.phoneNumber = e.target.value
        this.setState(Customers)
    }

    Register = () => {
        firebase.firestore().collection('Customers').add(this.state.Customers)
        .then((ref)=>{
            toast.info("Datos del cliente registrados!")
            setTimeout(()=>this.props.history.push('/clientes/prestamos/'), 3000)
            var dataVisit = {
                uid: ref.id,
                ref: firebase.firestore().collection('Customers').doc(ref.id),
                name: this.state.Customers.firstName +" "+ this.state.Customers.lastName,
                visited: null,
                loan: false,
                deleted: false
            }
            var ListVisit = this.state.list
            ListVisit.push(dataVisit)
            if(this.state.id_list === ""){
                firebase.firestore().collection('Visits').add({ListVisit})
            }else{
                firebase.firestore().collection('Visits').doc(this.state.id_list).update({ListVisit})
            }
        })
        .catch((err)=>{
            toast.error("Datos del cliente no registrados")
        })
        var container = document.getElementById('btn-add-client')
        container.disabled = true
        container.className = "btn-not-active"
        this.setState({loader: true})
    }
    render(){
        return(
            <div className="new-custumer-container">
                <img src={arrow} onClick={()=> window.history.back()} className="img-arrow-back" alt="arrow"/>
                <p className="title-new-customer">Nuevo Cliente</p>
                <div className="topics-container">
                    <div className="topic">
                        <p>Nombre</p>
                        <input type="text" onChange={(e)=>this.changeName(e)} value={this.state.Customers.firstName}/>
                        <p>Apellido</p>
                        <input type="text" onChange={(e)=>this.changeFirstName(e)} value={this.state.Customers.lastName}/>
                        <p>Dirección</p>
                        <input type="text" onChange={(e)=>this.changeAddress(e)} value={this.state.Customers.address}/>
                        <p>Correo</p>
                        <input type="text" onChange={(e)=>this.changeEmail(e)} value={this.state.Customers.email}/>
                        <p>Teléfono</p>
                        <input type="text" onChange={(e)=>this.changePhone(e)} value={this.state.Customers.phoneNumber}/>
                    </div>
                </div>
                <button className="add-button" id="btn-add-client" onClick={this.Register}>Agregar</button>
                {this.state.loader === true ? <Loader/> : null}
            </div>
        )
    }
}

export default NewCustomer