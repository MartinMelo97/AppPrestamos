import React, { Component } from 'react'
import firebase from 'firebase'
import {toast} from 'react-toastify'
import './../../animate.css'
import { Checkbox } from 'antd'
import './index.scss'

export default class Register extends Component {
  constructor(props){
      super(props)
      this.state = {
          Admin:{
            correo: "",
            password: "",
            username: "",
            super: false, 
            uid: "",
            date: "",
            session: false,
          },
          checked: false,
      }
  }
  componentDidMount = () => {
    var newDate = new Date()
    var newDay = newDate.getDate()
    var newMonth = newDate.getMonth()+1
    var newYear = newDate.getFullYear()
    var newFecha = newDay+"/"+newMonth+"/"+newYear 
    let { Admin } = this.state
      Admin.date = newFecha 
    this.setState(Admin)
    console.log(this.props.location.state)
  }

  changeCorreo = (e) => {
      let { Admin } = this.state
      Admin.correo = e.target.value 
      this.setState(Admin)
  }
  changePass = (e) => {
    let { Admin } = this.state
    Admin.password = e.target.value 
    this.setState(Admin)
  } 
  changeUser = (e) => {
    let { Admin } = this.state
    Admin.username = e.target.value 
    this.setState(Admin)
  }
  onChange = (e) => {
    this.setState({checked: !this.state.checked})
    let { Admin } = this.state
    Admin.super = e.target.checked
    this.setState(Admin)
  }

  CreateUser = () => {
    var email = this.state.Admin.correo
    var password = this.state.Admin.password
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((result)=>{
    let {Admin} = this.state
        Admin.uid = result.user.uid
    this.setState(Admin)

    firebase.firestore().collection('admin').add(this.state.Admin)
        .then(()=>{
          console.log(this.state.Admin)
          toast.info("Admin. registrado!")
          let {Admin} = this.state
          Admin.correo = ""
          Admin.password = ""
          Admin.super = false
          Admin.username = ""
          Admin.uid = ""
          this.setState(Admin)
          this.setState({checked:false})
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
              <p className="title-new-customer">Añadir Admin.</p>
              <div className="topics-container">
                  <div className="topic">
                      <p>Correo</p>
                      <input type="text" onChange={(e)=>this.changeCorreo(e)} value={this.state.Admin.correo}/>
                      <p>Username</p>
                      <input type="text" onChange={(e)=>this.changeUser(e)} value={this.state.Admin.username}/>
                      <p>Contraseña</p>
                      <input type="password" onChange={(e)=>this.changePass(e)} value={this.state.Admin.password}/>
                  </div>
                  <Checkbox checked={this.state.checked} className="checkbox-form" value={this.state.Admin.super} onChange={this.onChange}>Súper Administrador</Checkbox>    
              </div>
              <button className="add-button" onClick={this.CreateUser}>Añadir</button>
          </div>
      )
  }
}