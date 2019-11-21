import React, { Component } from 'react'
import './index.scss'
import firebase from 'firebase'
import loan from './../../../assets/icons/money.svg'
import more from './../../../assets/icons/money-bag.svg'
import arrow from './../../../assets/icons/left-arrow.svg'
import {toast} from 'react-toastify'
export default class reportMonth extends Component {
    constructor(props){
        super(props)
        this.state = {
            month: 0,
            loans: 0,
            utility: 0, 
            search: false,
            year: 0 
        }
    }

    ChangeMonth = (e) =>{
        this.setState({month: e.target.value})
    }
    ChangeYear = (e) =>{
        this.setState({year: e.target.value})
    }
    SearchMonth = (date) => {
        var array = date.split("/")
        var newArray = []
        array.map((item) =>{
            newArray.push(parseInt(item))
        })
        return newArray
    }
    GenerateReport = () =>{
        if(this.state.month === 0){
            toast.error("Selecciona un mes (Enero - Diciembre).")
        }
        if(this.state.year === 0 || this.state.year === "Año"){
            toast.error("Selecciona un año.")
        }
        else{
            this.setState({search: true})
        firebase.firestore().collection('Customers').where("deleted", "==", false)
        .onSnapshot((customers)=>{
         let datesCustomer = []
         let Loans = []
         customers.forEach(customer=>{
             let dato = customer.data()
             datesCustomer.push(dato)
             let loan = customer.data().loans
             Loans.push(loan)
         })
         var total = 0
         var ganancia = 0
         Loans.forEach(loan=>{
             if(loan !== undefined){
                 loan.forEach(date=> {
                    var getMonth = this.SearchMonth(date.dateStart)[1]
                    var getYear = this.SearchMonth(date.dateStart)[2]
                    if(getYear === parseInt(this.state.year)){
                        if(getMonth === parseInt(this.state.month)){
                            total += date.amountLoan
                            ganancia += date.utility
                        }
                    }
                 })
             }
         })
         this.setState({loans: total, utility: ganancia})
        })
        }
    }
    ReportWeek = () =>{
        this.props.history.push({
            pathname:'/general/reporte/semanas/',
            state: {
                month: this.state.month,
                year: this.state.year
            } 
        })
    }

    render() {
        var date = new Date()
        var actualYear = date.getFullYear()
        var year = actualYear - 5
        let years = ["Año"]
        for (year; year<=actualYear; year++){
        years.push(year.toString())
        }        
        years.sort((dateOne, dateTwo)=>{return dateTwo - dateOne})
        const monthGral = ["Mes","Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre","Octubre", "Noviembre", "Diciembre"]
        var month = []
        if(parseInt(this.state.year) === date.getFullYear()){
            for(var i=0; i<=date.getMonth()+1; i++){
                month.push(monthGral[i])
            }
        } else {
            for(var j=0; j<monthGral.length; j++){
                month.push(monthGral[j])
            }
        }
        return (
            <div>
                <img src={arrow} onClick={()=> window.history.back()} className="img-arrow-back" alt="arrow"/>
                <div className="head-tittle-report">
                    <p>Reporte</p>
                    <span>Mensual</span>
                </div>
                <div className="header-reportMonth">
                    <select onChange={(e)=>this.ChangeYear(e)}>
                        { years.map((item, i)=>(
                            <option value={item} key={i} >{item}</option>
                        ))}
                    </select>
                    <select onChange={(e)=>this.ChangeMonth(e)}>
                            { month.map((item, i)=>(
                                <option value={i} key={i} >{item}</option>
                            ))}
                    </select>
                    <button onClick={this.GenerateReport}>Generar reporte</button>
                </div>
                {this.state.search === true ? 
                <div>
                    <div className="general-info-report">
                        <div className="loan-container-report">
                            <img src={loan} alt="Préstamo"/>
                            <p>${this.state.loans} MXN Prestados</p>
                        </div>
                        <div className="utility-container-report">
                            <img src={more} alt="Préstamo"/>
                            <p>${this.state.utility} MXN Ganancia</p>
                        </div>
                    </div>
                    {this.state.loans > 0 ? <p className="link-report" onClick={this.ReportWeek}>Reporte Semanal</p> : null}
                </div> : null}
            </div>
        )
    }
}
