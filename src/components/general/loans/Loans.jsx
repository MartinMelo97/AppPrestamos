import React, { Component } from 'react'
import './loans.scss'
import { NavLink } from 'react-router-dom'
import plus from '../../../assets/icons/plus.svg'
import firebase from 'firebase' 
import {toast} from 'react-toastify'
class Loans extends Component {
    constructor(props){
        super(props)
        this.state = {
            customers:[],
            blues:[],
            day: 1,
            actualDay: null,
            datesLoan: {
                id: ""
            }
        }
    }

    bluesGenerate = () =>{
        let { blues } = this.state

        let optionsB = ['7','8','9','a','b','c','d','e','f']
        let optionsRG = ['0','1','2']

        let blue = '#'
        let random

        for(let i = 0; i < 500; i++){
            for(let i = 0; i < 4; i++){
                random = Math.floor(Math.random() * optionsRG.length)
                blue += optionsRG[random]
            }
            for(let i = 0; i < 4; i++){
                random = Math.floor(Math.random() * optionsB.length)
                blue += optionsB[random]
            }
            blues.push(blue)
            blue = '#'
        }
        this.setState({ blues })
    }

    componentDidMount = () =>{
        this.bluesGenerate()
        let { actualDay } = this.state
        actualDay = new Date().getDate()
        this.setState({ actualDay })

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
        return(
            <div className="general-loans-container">
                <p className="customers-loans-title">Prestamos
                <NavLink to="/prestamos/nuevo/"><img src={ plus } alt="agregar"/></NavLink>
                </p>
                <div className="customers-container">
                    {this.state.customers.length > 0 ?
                    this.state.customers.map((customer, i)=>(
                        <div className="loans-container" key={i}
                        onClick={(e) => this.Detail(e, customer.id, customer.loans)}
                        style = {{
                            backgroundColor : this.state.blues[i]
                        }} >
                            <span>{customer.firstName} {customer.lastName}</span>
                        </div>
                    ))
                    :
                    null}
                </div>
            </div>
        )
    }
}

export default Loans