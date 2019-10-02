import React, { Component } from 'react'
import './loans_to_pay.scss'
import firebase from 'firebase'
import {toast} from 'react-toastify'

class LoansToPay extends Component {
    constructor(props){
        super(props)
        this.state = {
            customer:{
                name: '',
                payNumber: '',
            },
            pago: "",
            UpdateFecha: "",
            percentage: "",
            active: false
        }
    }
    componentDidMount = () =>{
        var newDate = new Date()
        var newDay = newDate.getDate()
        var newMonth = newDate.getMonth()+1
        var newYear = newDate.getFullYear()
        var newFecha = newDay+"/"+newMonth+"/"+newYear
        this.setState({UpdateFecha: newFecha})
        let {customer} = this.state
        customer.name = this.props.location.state.Nombre
        customer.payNumber = this.props.location.state.numPay+1
        this.setState(customer)

    }

    changeActive = () =>{
        let button = document.getElementsByClassName('button-style-two')[0]
        let container = document.getElementsByClassName('ghost-container')[0]
        let { active } = this.state

        button.className = active ? "button-style-two not-active" : "button-style-two active"
        container.className = active ? "ghost-container not-active" : "ghost-container active"
        active = !active

        this.setState({ active })
    }
    payChange = (e) => {
        var numPago = parseInt(e.target.value)
        this.setState({pago: numPago})
    }
    loanPay = () => {
        var Totalpay = this.state.pago + this.props.location.state.pago 
        console.log("El total que vinen: "+Totalpay)
        var numPercentage = (Totalpay * 100)/ this.props.location.state.cantidad

        firebase.firestore().collection('loan').doc(this.props.location.state.id)
        .update({
            pago:this.state.pago + this.props.location.state.pago,
            ultimatePay: this.state.pago,
            numPay: this.state.customer.payNumber,
            datePay: this.state.UpdateFecha,
            percentage: numPercentage
        })
        .then(()=>{
            toast.info("Se agregó el pago")
            this.setState({pago: ""})
        })
        .catch((err)=>{
            toast.error("No se agregó el pago")
            console.log(err)
        })
    }

    render(){
        return(
            <div className="pay-loan-container">
                <p className="pay-loan-title">
                { this.state.customer != null ?
                this.state.customer.name
                : 
                null}
                    <span className="pay-loan-subtitle">
                        Pago #{ this.state.customer != null ?
                                this.state.customer.payNumber
                                : 
                                null}
                    </span>
                </p>
                <div className="buttons-container">
                    <button className="button-style-one">Pagar</button>
                    <span>Ó</span>
                    <button 
                    className="button-style-two not-active"
                    onClick={ () => this.changeActive() }
                    >Parcial</button>
                    <div className="ghost-container not-active">
                        <input type="number" placeholder="$" onChange={(e) => this.payChange(e)} value={this.state.pago}/>
                        <button className="button-add" onClick={this.loanPay}>Agregar</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoansToPay