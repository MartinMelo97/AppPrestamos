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
            customers: "",
            NumLoan: "",
            Admins: "",
            Cantidad: "",
            SupAdmin: 0,
            NomAdmin: 0
        }
    }

    componentDidMount = () =>{
        firebase.firestore().collection('loan')
            .onSnapshot((dates)=>{
            let loan = []
            dates.forEach(date=>{
                let dato = date.data()
                loan.push(dato)
            })
            this.setState({NumLoan: loan.length})
            this.setState({customers: loan})
            this.updateTotal()
        })
        firebase.firestore().collection('customers')
            .onSnapshot((dates)=>{
            let customer = []
            dates.forEach(date=>{
                let dato = date.data()
                customer.push(dato)
            })
            this.setState({NumCustomer: customer.length})
        })
        firebase.firestore().collection('admin')
            .onSnapshot((dates)=>{
            let admin = []
            dates.forEach(date=>{
                let dato = date.data()
                admin.push(dato)
            })
            this.setState({Admins: admin.length})
        })
        firebase.firestore().collection('admin').where("super", "==", true)
            .onSnapshot((dates)=>{
            let Superadmin = []
            dates.forEach(date=>{
                let dato = date.data()
                Superadmin.push(dato)
            })
            this.setState({SupAdmin: Superadmin.length})
        })
        var normal = this.state.Admins - this.state.SupAdmin 
        this.setState({NomAdmin: normal})
    }
    updateTotal = () =>{
        let { customers } = this.state
        if( customers.length > 0 ){
            var total = 0
            for(let i = 0; i < customers.length; i++){
                total += customers[i].Cantidad
            }

            this.setState({ Cantidad: total })
        }
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
                        <p>{this.state.Admins} Administradores</p>
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