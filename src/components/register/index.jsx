import React, { Component } from 'react'
import firebase from 'firebase'
import {toast} from 'react-toastify'
import './../../animate.css'
import { Checkbox } from 'antd'
import './index.scss'
import {NavLink} from 'react-router-dom'
import arrow from '../../assets/icons/left-arrow.svg'

export default class Register extends Component {
  constructor(props){
      super(props)
      this.state = {
          Admin:{
            email: "",
            firstName: "",
            root: false, 
            uid: "",
            lastName: "",
            phone: "",
            created: firebase.firestore.Timestamp.fromDate(new Date()),
            updated: firebase.firestore.Timestamp.fromDate(new Date()),
          },
          password: "",
          checked: false,
      }
  }

  changeCorreo = (e) => {
      let { Admin } = this.state
      Admin.email = e.target.value 
      this.setState(Admin)
  }
  changePass = (e) => {
    this.setState({password: e.target.value})
  } 
  changeUser = (e) => {
    let { Admin } = this.state
    Admin.firstName = e.target.value 
    this.setState(Admin)
  }
  changeLN = (e) => {
    let { Admin } = this.state
    Admin.lastName = e.target.value 
    this.setState(Admin)
  }
  changePhone = (e) => {
    let { Admin } = this.state
    Admin.phone = e.target.value 
    this.setState(Admin)
  }
  onChange = (e) => {
    this.setState({checked: !this.state.checked})
    let { Admin } = this.state
    Admin.root = e.target.checked
    this.setState(Admin)
  }

  CreateUser = () => {
    var email = this.state.Admin.email
    var password = this.state.password
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((result)=>{
    let {Admin} = this.state
        Admin.uid = result.user.uid
    this.setState(Admin)

    firebase.firestore().collection('Admins').add(this.state.Admin)
        .then(()=>{
          console.log(this.state.Admin)
          toast.info("Admin. registrado!")
          let {Admin} = this.state
          Admin.email = ""
          Admin.firstName = ""
          Admin.root = false
          Admin.lastName = ""
          Admin.uid = ""
          Admin.phone = ""
          this.setState(Admin)
          this.setState({checked:false})
          this.setState({password: "" })
        })
        .catch((err)=>{
          console.log(err)
        })
    })
    .catch((err) =>{
      toast.error("Admin. no registrado")
      console.log(err)
    })  
  }
  
  render(){
      return(
          <div className="new-custumer-container">
             <NavLink to="/opciones/admins"><img src={arrow} className="img-arrow-back" alt="arrow"/></NavLink>
              <p className="title-new-customer">Añadir Admin.</p>
              <div className="topics-container">
                  <div className="topic">
                      <p>Nombre</p>
                      <input type="text" onChange={(e)=>this.changeUser(e)} value={this.state.Admin.firstName}/>
                      <p>Apellido</p>
                      <input type="text" onChange={(e)=>this.changeLN(e)} value={this.state.Admin.lastName}/>
                      <p>Teléfono</p>
                      <input type="text" onChange={(e)=>this.changePhone(e)} value={this.state.Admin.phone}/>
                      <p>Correo</p>
                      <input type="text" onChange={(e)=>this.changeCorreo(e)} value={this.state.Admin.email}/>
                      <p>Contraseña</p>
                      <input type="password" onChange={(e)=>this.changePass(e)} value={this.state.password}/>
                  </div>
                  <Checkbox checked={this.state.checked} className="checkbox-form" value={this.state.Admin.super} onChange={this.onChange}>Súper Administrador</Checkbox>    
              </div>
              <button className="add-button" onClick={this.CreateUser}>Añadir</button>
          </div>
      )
  }
}