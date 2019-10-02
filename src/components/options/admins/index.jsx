import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import info from '../../../assets/icons/information.svg'
import plus from '../../../assets/icons/plus.svg'
import close from './../../../assets/icons/close.svg'
import firebase from 'firebase'
export default class AdminList extends Component {
    constructor(props){
        super(props)
        this.state = {
            reds:[],
            accounts: null,
            user: "",
            datesAccount: {
                id: "",
                email: "",
                pass: "",
                username: "",
                fecha: "",
                active: false,
                uid: ""
            },
            codesAccount: {
                id: "",
                uid: ""
            }
        }
    }

    componentDidMount = () => {
        firebase.firestore().collection('admin')
        .onSnapshot((accounts)=>{
          let array_dates = []
          accounts.forEach(date=>{
              let dato = date.data()
              dato.id = date.id
              array_dates.push(dato)
          })
          this.setState({accounts: array_dates})
      })

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          firebase.firestore().collection('admin').where("correo", "==", user.email).onSnapshot((users)=>{
            let datos = []
            users.forEach(user=>{
                let dato = user.data()
                datos.push(dato)
            })
            this.setState({user: datos})
          })
        }
      })
    }

    DatesAccount = (e, id, correo, password, username, date, active, uid) => {
        let {datesAccount} = this.state
        datesAccount.id = id
        datesAccount.email = correo
        datesAccount.pass = password
        datesAccount.username = username
        datesAccount.fecha = date
        datesAccount.active = active
        datesAccount.uid = uid
        this.setState(datesAccount)

        this.props.history.push({
           pathname: '/admins/detalle/',
           state: this.state.datesAccount
        })
    }
    DeleteAccount = (e, id, uid) => {
        let {codesAccount} = this.state
        codesAccount.id = id
        codesAccount.uid = uid
        this.setState(codesAccount)
        console.log(this.state.codesAccount)

        firebase.auth().deleteUser(uid).then(() => {
            firebase.firestore().collection("admin").doc(id).delete()
            .then(()=>alert("Producto eliminado correctamente"))            
            .catch((err)=>{
                alert("No se puedo eliminar el producto")
                console.log(err)
            })
        }).catch((error)=>{
            console.log("Recent error gral " + error)
        })
    }

    render(){
        return(
            <div className="customers-loans-container">
                <p className="customers-loans-title-admin">Administradores
                <NavLink to={{ pathname: '/registro', state: this.state.user}}><img src={ plus } alt="agregar"/></NavLink>
                </p>
                <div className="info-customers-container">
                    { this.state.accounts ?
                    this.state.accounts.map((account, i)=>(
                        <div className="info-customer-container" key={i}>
                            <span style = {{
                                backgroundColor : "#0ac8e5"
                            }}>{account.username}</span>
                                <img src={ info } alt="info" onClick={(e)=>this.DatesAccount(e, account.id, account.correo, account.password, account.username, account.date, account.super, account.uid )}/>
                                <img src={close} alt="close" onClick={(e)=>this.DeleteAccount(e, account.id, account.uid)}/>
                        </div>
                    ))
                    :
                    <p>Cargando...</p>}
                </div>
                
            </div>
        )
    }
}

 