import React, { Component } from 'react'
import './loans_list.scss'
import ProgressBar from './ProgressBar'
import arrow from './../../../assets/icons/left-arrow.svg'
import close from './../../../assets/icons/close.svg'
import firebase from 'firebase'
import { toast } from 'react-toastify'
import {Modal} from 'antd'
class LoansList extends Component {
    constructor(props){
        super(props)
        this.state = {
            loansDates: {
                cantidad: 0,
                pago: 0,
                fechaInicio: "",
                fechaFin: "",
                restante: 0,
                name: "",
                id: this.props.location.state.id,
                payments: "",
                loans: "",
                ref: "",
                utilidad: "",
                pagoPorDia: "",
                prestamo: ""
            },
            name: "",
            loans: [],
            visible: false,
            position: 0,
        }
    }
    componentDidMount = () =>{
        firebase.firestore().collection('Customers').doc(this.props.location.state.id)
            .onSnapshot((customer)=>{
                var text = customer.data().firstName + " " + customer.data().lastName 
                var arrayName = text.split(" ")
                var exactName = arrayName[0]+" "+arrayName[1]
                this.setState({
                    name: exactName, 
                    loans: customer.data().loans
                })
        })
    } 

    goInfo = (e, fechaFin, fechaInicio, cantidad, ref, pago, rest, payments, prestamo, utilidad, pagodia ) => {
        const {loansDates} = this.state
        loansDates.restante = rest
        loansDates.pago = pago
        loansDates.fechaFin = fechaFin
        loansDates.fechaInicio = fechaInicio
        loansDates.cantidad = cantidad
        loansDates.ref = ref
        loansDates.payments = payments
        loansDates.pagoPorDia = pagodia
        loansDates.utilidad = utilidad
        loansDates.prestamo = prestamo
        loansDates.loans = this.state.loans
        loansDates.name = this.state.name
        this.setState(loansDates)
        
        this.props.history.push({
            pathname: '/prestamos/detalle/',
            state: this.state.loansDates
        })
    }
    DeleteLoan = (i) =>{
        this.setState({visible: true, position: i})    
    }

    handleOk = e => {
        var data = this.state.loans[this.state.position]
        data.deleted = true
        firebase.firestore().collection('Customers').doc(this.props.location.state.id).update({loans: this.state.loans})
        .then(()=>{
            toast.info("Préstamo eliminado.")
        })
        .catch(()=>{
            toast.error("Préstamo no eliminado, inténtalo más tarde.")
        })
        this.setState({
            visible: false,
        })
    }
    
    handleCancel = e => {
        this.setState({
          visible: false,
        })
    }
    render(){
        var Loans = []
        this.state.loans.forEach(loan=>{
            if(loan.deleted === false){
                Loans.push(loan)
            }
        })
        return(
            <div className="detail">
            <img onClick={()=> this.props.history.push('/general/prestamos/')} src={arrow} className="img-arrow-back" alt="arrow"/>    
            <div className="head">
                <p className="client-name">{this.state.name}</p>
                <span>Préstamo</span>
           </div>
           { this.state.loans.length > 0 ? Loans.map((loan, i)=>(
               <div className="container-list" key={i}>
                    <div className="btn-list" onClick={(e) => this.goInfo(e, loan.dateEnd, loan.dateStart, loan.total, loan.loanRef, loan.payed, loan.remaining, loan.payments, loan.amountLoan, loan.utility, loan.payForDay)}>
                            <span>{i+1}</span>
                            <span>${loan.total}</span>
                            <span>{loan.dateStart}</span>
                            <div className="Progress"><ProgressBar percentage={(loan.payed*100)/loan.total}/></div>
                    </div>
                    <img src={close} onClick={()=>this.DeleteLoan(i)} alt="delete-loan"/>
               </div>
           ))
            : <p>Cargando..</p>
            }
            <Modal
                className="design-modal-c"
                title="Confirma"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                >
                <p>¿Estás seguro de eliminar este préstamo?</p>
            </Modal>
            </div>
        )
    }
}

export default LoansList