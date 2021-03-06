import React, { Component } from 'react'
//import { NavLink } from 'react-router-dom'
import info from '../../../assets/icons/information.svg'
//import plus from '../../../assets/icons/plus.svg'
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
                username: "",
                phone: "",
                lastname: "",
                root: false,
                uid: ""
            },
            codesAccount: {
                id: "",
                uid: ""
            }
        }
    }

    componentDidMount = () => {
        firebase.firestore().collection('Admins')
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

    DatesAccount = (e, id, correo, apellido, username, phone, root, uid) => {
        let {datesAccount} = this.state
        datesAccount.id = id
        datesAccount.email = correo
        datesAccount.lastname = apellido
        datesAccount.username = username
        datesAccount.phone = phone
        datesAccount.root = root
        datesAccount.uid = uid
        this.setState(datesAccount)

        this.props.history.push({
           pathname: '/admins/detalle/',
           state: this.state.datesAccount
        })
    }

    render(){
        return(
            <div className="customers-loans-container">
                <p className="customers-loans-title-admin">Administradores</p>
                <div className="info-customers-container">
                    { this.state.accounts ?
                    this.state.accounts.map((account, i)=>(
                        <div className="info-customer-container" key={i}>
                            <span style = {{
                                backgroundColor : "#0ac8e5"
                            }}>{account.firstName}</span>
                                <img src={ info } alt="info" onClick={(e)=>this.DatesAccount(e, account.id, account.email, account.lastName, account.firstName, account.phone, account.root, account.uid )}/>                                
                        </div>
                    ))
                    :
                    <p>Cargando...</p>}
                </div>
                
            </div>
        )
    }
}

 