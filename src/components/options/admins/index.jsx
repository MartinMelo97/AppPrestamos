import React, { Component } from 'react'
import info from '../../../assets/icons/information.svg'
import firebase from 'firebase'
export default class AdminList extends Component {
    constructor(props){
        super(props)
        this.state = {
            reds:[],
            accounts: null,
            datesAccount: {
                email: "",
                pass: "",
                username: "",
                fecha: ""
            },
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
          console.log(this.state.accounts)
      })
    }

    DatesAccount = (e, correo, password, username, date) => {
        let {datesAccount} = this.state
        datesAccount.email = correo
        datesAccount.pass = password
        datesAccount.username = username
        datesAccount.fecha = date
        this.setState(datesAccount)

        this.props.history.push({
           pathname: '/admins/detalle/',
           state: this.state.datesAccount
        })
    }

    render(){
        return(
            <div className="customers-loans-container">
                <p className="customers-loans-title-admin">Administradores
                </p>
                <div className="info-customers-container">
                    { this.state.accounts ?
                    this.state.accounts.map((account, i)=>(
                        <div className="info-customer-container" key={i}>
                            <span style = {{
                                backgroundColor : "#0ac8e5"
                            }}>{account.username}</span>
                                <img src={ info } alt="info" onClick={(e)=>this.DatesAccount(e, account.correo, account.password, account.username, account.date )}/>
                        </div>
                    ))
                    :
                    <p>Cargando...</p>}
                </div>
                
            </div>
        )
    }
}

 