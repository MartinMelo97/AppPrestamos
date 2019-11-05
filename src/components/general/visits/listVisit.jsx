import React, { Component } from 'react'
import './index.scss'
import firebase from 'firebase' 
import {toast} from 'react-toastify'
export default class Visits extends Component {
    constructor(props){
        super(props)
        this.state = {
            customers:[],
            datesLoan: {
                id: ""
            }
        }
    }

    componentDidMount = () =>{
        firebase.firestore().collection('Customers').where("deleted", "==", false)
            .onSnapshot((dates)=>{
            let customer = []
            dates.forEach(date=>{
                let dato = date.data()
                dato.id = date.id
                customer.push(dato)
            })
            this.setState({customers: customer})
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

    render(){
        console.log(this.state.customers)
        return(
            <div className="general-loans-container">
                <p className="customers-loans-title">Visitas
                </p>
                <div className="customers-container">
                    {this.state.customers.length > 0 ?
                    this.state.customers.map((customer, i)=>(
                        <div className="visit-container" key={i}
                        onClick={(e) => this.Detail(e, customer.id, customer.loans)}>
                            <span>{i+1}</span>
                            <span>{customer.firstName} {customer.lastName}</span>
                            <div className="circle-item"/>
                        </div>
                    ))
                    :
                    null}
                </div>
            </div>
        )
    }
} 