import React, { Component } from 'react'
import './index.scss'
import firebase from 'firebase' 
import {toast} from 'react-toastify'
import Circle from './status'
import Refresh from './../../../assets/icons/refresh.svg'
export default class Visits extends Component {
    constructor(props){
        super(props)
        this.state = {
            customers:[],
            Gral: [], 
            datesLoan: {
                id: ""
            }
        }
    }

    componentDidMount = () =>{
        var date = new Date().getDate()+"/"+(new Date().getMonth()+1)+"/"+new Date().getFullYear()
        var ListCustomers = []
        firebase.firestore().collection('Customers').where("deleted", "==", false)
            .onSnapshot((dates)=>{
            let customer = []
            dates.forEach(date=>{
                let dato = date.data()
                dato.id = date.id
                customer.push(dato)
            })
            var select
            customer.forEach(dataCustomer=>{
                var loans = dataCustomer.loans
                loans.forEach(loan =>{
                    var payments = loan.payments
                    payments.forEach(pay=>{
                        if(dataCustomer.visited !== 0){
                            if(date === pay.date){
                                select = true
                            }
                            else{
                                select = false
                            }
                        } else {
                            select = null
                        }
                    })
                })
                if(select===true){
                    dataCustomer.visited = true
                    ListCustomers.push(dataCustomer)
                }
                if(select===false){
                    dataCustomer.visited = false
                    ListCustomers.push(dataCustomer)
                }
                if(select===null){
                    ListCustomers.push(dataCustomer)
                }

                if(ListCustomers.length < 1){
                    dataCustomer.visited = false
                    ListCustomers.push(dataCustomer) 
                }
            })
            
            this.setState({customers: ListCustomers})
            this.setState({Gral: customer})
        })
    }

    Detail = (e,id, loans) => {
        let {datesLoan} = this.state
        datesLoan.id = id
        this.setState(datesLoan)
        if (loans === undefined){
            toast.warn("Cliente sin préstamos 💲✋")
        } else{
            this.props.history.push({
                pathname: '/prestamos/lista/',
                state: this.state.datesLoan
            })
        }
        
    }
    ComeBack = (id) =>{
        var date = new Date().getDate()+"/"+(new Date().getMonth()+1)+"/"+new Date().getFullYear()
        var ListCustomers = []
        firebase.firestore().collection("Customers").doc(id).update({visited: 0})
        .then(()=>{
            toast.warn('Vuelve más tarde!')
            var select
            this.state.Gral.forEach(dataCustomer=>{
                var loans = dataCustomer.loans
                loans.forEach(loan =>{
                    var payments = loan.payments
                    payments.forEach(pay=>{
                        if(dataCustomer.visited !== 0){
                            if(date === pay.date){
                                select = true
                            }
                            if(date !== pay.date){
                                select = false
                            }
                        } else {
                            select = null
                        }
                    })
                })
                if(select===true){
                    dataCustomer.visited = true
                    ListCustomers.push(dataCustomer)
                }
                if(select===false){
                    dataCustomer.visited = false
                    ListCustomers.push(dataCustomer)
                }
                if(select===null){
                    ListCustomers.push(dataCustomer)
                }
            })
            this.setState({customers: ListCustomers})
        })
        .catch((err)=>console.log(err))
    }

    render(){
        return(
            <div className="general-loans-container">
                <p className="customers-loans-title">Visitas
                </p>
                <div className="visit">
                    {this.state.customers.length > 0 ?
                    this.state.customers.map((customer, i)=>(
                        <div className="visit-container-gral" key={i}>
                        <div className="visit-container"
                        onClick={(e) => this.Detail(e, customer.id, customer.loans)}>
                            <span>{i+1}</span>
                            <span>{customer.firstName} {customer.lastName}</span>
                            <Circle status={customer.visited}/>        
                        </div>
                        <img onClick={()=>this.ComeBack(customer.id)} src={Refresh} alt="Regresar"/>
                        </div>
                    ))
                    :
                    <p>Nada para mostrar hoy.</p>}
                </div>
                <div className="footer-info">
                    <div className="info-circle">
                        <div className="circle-item" style={{backgroundColor: '#52c41a'}}/>
                        <p>Visitado</p>
                    </div>
                    <div className="info-circle">
                        <div className="circle-item" style={{backgroundColor: '#faad14'}}/>
                        <p>Más tarde</p>
                    </div>
                    <div className="info-circle">
                        <div className="circle-item" style={{backgroundColor: '#f5222d'}}/>
                        <p>Sin visita</p>
                    </div>
                </div>
            </div>
        )
    }
} 