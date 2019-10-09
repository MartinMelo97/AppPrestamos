import React, { Component } from 'react'
import './general_summary.scss'
import money from './../../../assets/icons/money.svg'
import loan from './../../../assets/icons/funding.svg'
import admin from './../../../assets/icons/coordinator.svg'
import customer from './../../../assets/icons/teamwork.svg'
import firebase from 'firebase'  
class GeneralSummary extends Component {
    constructor(props){
        super(props)
        this.state = {
            NumCustomer: "",
            NumLoan: "",
            Cantidad: "",
            SupAdmin: 0,
            NomAdmin: 0
        }
    }

    componentDidMount = () =>{
        firebase.firestore().collection('SummaryDates')
            .onSnapshot((dates)=>{
            let summary = []
            dates.forEach(date=>{
                let dato = date.data()
                summary.push(dato)
            })
            summary.forEach(date=>{
                this.setState({NumLoan: date.loans, Cantidad: date.total, NumCustomer: date.customers, SupAdmin: date.admins.root, NomAdmin: date.admins.normal})
            })
        })
    }

    render(){
        return(
            <div className="summary-div-container">
                <p className="summary-title">Resumen Gral</p>
                <div className="summary-content">
                    <div className="summary-head-l">
                        <img src={customer} alt="client"/>
                        <p>{this.state.NumCustomer} Clientes</p>
                    </div>
                    <div className="summary-head-r">
                        <img src={loan} alt="loan"/>
                        <p>{this.state.NumLoan} Préstamos</p>
                    </div>
                    <div className="summary-body-one">
                        <img src={money} alt="money"/>
                        <p>{this.state.Cantidad} MXN Prestados</p>
                    </div>
                    <div className="summary-body-two">
                        <img src={admin} alt="admins"/>
                        <p>{this.state.SupAdmin + this.state.NomAdmin} Administradores</p>
                    </div>
                    <div className="summary-body-three-l">
                        <p>{this.state.SupAdmin} Super Admin.</p>
                    </div>
                    <div className="summary-body-three-r">
                        <p>{this.state.NomAdmin} Adim. Normal</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default GeneralSummary