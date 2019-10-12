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
        firebase.firestore().collection('Admins').onSnapshot(admins=>{
            let datesAdmins = []
            admins.forEach(admin=>{
                let dataAmin = admin.data()
                datesAdmins.push(dataAmin)
            })
            var typeRoot = 0
            var typeNormal = 0 
            datesAdmins.forEach(admin=>{
                if(admin.root === true){
                    typeRoot += 1
                }else{
                    typeNormal += 1
                }
            })
            this.setState({SupAdmin: typeRoot, NomAdmin: typeNormal})
        })
        
        firebase.firestore().collection('Customers').onSnapshot((customers)=>{
         let datesCustomer = []
         let Loans = []
         customers.forEach(customer=>{
             let dato = customer.data()
             datesCustomer.push(dato)
             let loan = customer.data().loans
             Loans.push(loan)
         })
         var NumLoans = 0
         var total = 0
         Loans.forEach(loan=>{
             if(loan !== undefined){
                 NumLoans+= loan.length
                 loan.forEach(date=>total += date.total)
             }
         })
         this.setState({NumCustomer: datesCustomer.length, NumLoan: NumLoans, Cantidad: total})
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