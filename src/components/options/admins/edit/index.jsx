import React, { Component } from 'react'
import firebase from 'firebase'
import { toast } from 'react-toastify'
import { Checkbox } from 'antd'

export default class EditAdmins extends Component {
    constructor(props){
        super(props)
        this.state = {
            datesAdmin: {
                correo: "",
                password: "",
                username: "",
                super: false, 
            },
        }
    }
    componentDidMount = () => {
        console.log(this.props.location.state)
        firebase.firestore().collection('admin').doc(this.props.location.state.id)
        .get().then(doc => {
            const {datesAdmin} = this.state
            datesAdmin.correo = doc.data().correo
            datesAdmin.username = doc.data().username
            datesAdmin.super = doc.data().super
            this.setState(datesAdmin)
            console.log("Datos que traigo uwu ")
            console.log(this.state.datesAdmin)
          })
          .catch(err => {
            console.log('Error getting document', err);
          })
    }

    changeCorreo = (e) => {
        let { datesAdmin } = this.state
        datesAdmin.correo = e.target.value
        this.setState(datesAdmin)
    }
    changeUser = (e) => {
        let { datesAdmin } = this.state
        datesAdmin.username = e.target.value
        this.setState(datesAdmin)
    }
    changePass = (e) => {
        let { datesAdmin } = this.state
        datesAdmin.password = e.target.value
        this.setState(datesAdmin)
    }
    onChange = (e) => {
        let { datesAdmin } = this.state
        datesAdmin.super = e.target.checked
        this.setState(datesAdmin)
    }

    Edit = () => {
        firebase.firestore().collection('admin').doc(this.props.location.state.id)
        .update(this.state.datesAdmin)
        .then(()=>{
            toast.success("Datos actualizados!")
            this.props.history.push('/opciones/admins')
        })
        .catch((err)=>{
            toast.error("Datos no actualizados")
            console.log(err)
        })
    }

    render(){
        return(
            <div className="new-custumer-container">
                <p className="title-new-customer">Editar Admin.</p>
                <div className="topics-container">
                    <div className="topic">
                        <p>Correo</p>
                        <input type="text" onChange={(e)=>this.changeCorreo(e)} value={this.state.datesAdmin.correo}/>
                        <p>Username</p>
                        <input type="text" onChange={(e)=>this.changeUser(e)} value={this.state.datesAdmin.username}/>
                        <p>Contraseña</p>
                        <input type="password" onChange={(e)=>this.changePass(e)} value={this.state.datesAdmin.password}/>
                        <Checkbox checked={this.state.datesAdmin.super} className="checkbox-form" value={this.state.datesAdmin.super} onChange={this.onChange} >Súper Administrador</Checkbox>
                    </div>
                </div>
                <button className="add-button" onClick={this.Edit}>Editar</button>
            </div>
        )
    }
}

 