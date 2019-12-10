import React, { Component } from 'react'
import './index.scss'
import firebase from 'firebase'
import loan from './../../../assets/icons/money.svg'
import more from './../../../assets/icons/money-bag.svg'
import {toast} from 'react-toastify'
import arrow from './../../../assets/icons/left-arrow.svg'
export default class ReportWeek extends Component {
    constructor(props){
        super(props)
        this.state = {
            month: this.props.location.state.month,
            loans: 0,
            numberWeek: 1,
            utility: 0,
            search: false,
            year: this.props.location.state.year,
            week: 0,
            daysOfMonth: [],
            selectDays: [],
            weekOne: [],
            weekTwo: [],
            weekThree: [],
            weekFour: [],
            weekFive: [],
        }
    }
    componentDidMount = () =>{
        var date = new Date(this.props.location.state.year, this.props.location.state.month-1, 1).getDay()
        var numDay
        if(parseInt(new Date().getFullYear()) === parseInt(this.props.location.state.year)){
            if(parseInt(new Date().getMonth())+1 === parseInt(this.props.location.state.month)){
                numDay= new Date().getDate()
            }else {numDay = new Date(this.props.location.state.year, this.props.location.state.month, 0).getDate()}
        }else {
            numDay = new Date(this.props.location.state.year, this.props.location.state.month, 0).getDate()
        }
        var weekOne = []
        var weekTwo = []
        var weekThree = []
        var weekFour = []
        var weekFive = []
        for(var i=1; i<=numDay; i++){
            switch(date){
            case 0:
                if(i>=1 && i<=7){weekOne.push(i); this.setState({numberWeek: 1})}
                if(i>=8 && i<=14){weekTwo.push(i); this.setState({numberWeek: 2})}
                if(i>=15 && i<=21){weekThree.push(i); this.setState({numberWeek: 3})}
                if(i>=22 && i<=28){weekFour.push(i); this.setState({numberWeek: 4})}
                if(i>=29 && i<=31){weekFive.push(i); this.setState({numberWeek: 5})}
            break;
            case 1:
                if(i>=1 && i<=6){weekOne.push(i); this.setState({numberWeek: 1})}
                if(i>=7 && i<=13){weekTwo.push(i); this.setState({numberWeek: 2})}
                if(i>=14 && i<=20){weekThree.push(i); this.setState({numberWeek: 3})}
                if(i>=21 && i<=27){weekFour.push(i); this.setState({numberWeek: 4})}
                if(i>=28 && i<=31){weekFive.push(i); this.setState({numberWeek: 5})}
            break;
            case 2:
                if(i>=1 && i<=5){weekOne.push(i); this.setState({numberWeek: 1})}
                if(i>=6 && i<=12){weekTwo.push(i); this.setState({numberWeek: 2})}
                if(i>=13 && i<=19){weekThree.push(i); this.setState({numberWeek: 3})}
                if(i>=20 && i<=26){weekFour.push(i); this.setState({numberWeek: 4})}
                if(i>=27 && i<=31){weekFive.push(i); this.setState({numberWeek: 5})}
            break;
            case 3:
                if(i>=1 && i<=4){weekOne.push(i); this.setState({numberWeek: 1})}
                if(i>=5 && i<=11){weekTwo.push(i); this.setState({numberWeek: 2})}
                if(i>=12 && i<=18){weekThree.push(i); this.setState({numberWeek: 3})}
                if(i>=19 && i<=25){weekFour.push(i); this.setState({numberWeek: 4})}
                if(i>=26 && i<=31){weekFive.push(i); this.setState({numberWeek: 5})}
            break;
            case 4:
                if(i>=1 && i<=3){weekOne.push(i); this.setState({numberWeek: 1})}
                if(i>=4 && i<=10){weekTwo.push(i); this.setState({numberWeek: 2})}
                if(i>=11 && i<=17){weekThree.push(i); this.setState({numberWeek: 3})}
                if(i>=18 && i<=24){weekFour.push(i); this.setState({numberWeek: 4})}
                if(i>=26 && i<=31){weekFive.push(i); this.setState({numberWeek: 5})}
            break;
            case 5:
                if(i>=1 && i<=2){weekOne.push(i); this.setState({numberWeek: 1})}
                if(i>=3 && i<=9){weekTwo.push(i); this.setState({numberWeek: 2})}
                if(i>=10 && i<=16){weekThree.push(i); this.setState({numberWeek: 3})}
                if(i>=17 && i<=23){weekFour.push(i); this.setState({numberWeek: 4})}
                if(i>=24 && i<=31){weekFive.push(i); this.setState({numberWeek: 5})}
            break;
            case 6:
                if(i>=1 && i<2){weekOne.push(i); this.setState({numberWeek: 1})}
                if(i>=2 && i<=8){weekTwo.push(i); this.setState({numberWeek: 2})}
                if(i>=9 && i<=15){weekThree.push(i); this.setState({numberWeek: 3})}
                if(i>=16 && i<=22){weekFour.push(i); this.setState({numberWeek: 4})}
                if(i>=23 && i<=31){weekFive.push(i); this.setState({numberWeek: 5})}
            break;
            default:
                console.log("Error")
        }}
        let {daysOfMonth} = this.state
        daysOfMonth.push(weekOne)
        daysOfMonth.push(weekTwo)
        daysOfMonth.push(weekThree)
        daysOfMonth.push(weekFour)
        daysOfMonth.push(weekFive)
        this.setState(daysOfMonth)
        this.setState({weekOne: weekOne, weekTwo: weekTwo, weekThree: weekThree, weekFour: weekFour, weekFive: weekFive })
    } 

    ChangeWeek = (e) =>{
        this.setState({week: e.target.value})
    }
    GenerateReport = () =>{
        if(this.state.week === 0){
            toast.error("Selecciona una semana (1-5).")
        } else {
            var select = parseInt(this.state.week)-1
        var SelectWeek = this.state.daysOfMonth[select]
        this.setState({search: true, selectDays: SelectWeek})
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
                     SelectWeek.forEach(day =>{
                        var getDate = day+"/"+this.props.location.state.month+"/"+this.props.location.state.year
                        if(getDate === date.dateStart){
                            total += date.amountLoan
                            ganancia += date.utility
                        }  
                     })
                 })
             }
         })
         this.setState({loans: total, utility: ganancia})
        })
        } 
    }
    render() {
        const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
        let months = ["Ener", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
        let weeks = []
        const weeksList = ["Semanas", 
        `Semana 1 (${this.state.weekOne[0]} - ${this.state.weekOne[this.state.weekOne.length - 1]} de ${months[this.props.location.state.month-1]}.)`,
        `Semana 2 (${this.state.weekTwo[0]} - ${this.state.weekTwo[this.state.weekTwo.length - 1]} de ${months[this.props.location.state.month-1]}.)`,
        `Semana 3 (${this.state.weekThree[0]} - ${this.state.weekThree[this.state.weekThree.length - 1]} de ${months[this.props.location.state.month-1]}.)`,
        `Semana 4 (${this.state.weekFour[0]} - ${this.state.weekFour[this.state.weekFour.length - 1]} de ${months[this.props.location.state.month-1]}.)`,
        `Semana 5 (${this.state.weekFive[0]} - ${this.state.weekFive[this.state.weekFive.length - 1]} de ${months[this.props.location.state.month-1]}.)`]
        for(var d=0; d<=this.state.numberWeek; d++){
            weeks.push(weeksList[d])
        }
        var n = new Date(this.props.location.state.year, this.props.location.state.month, 0).getDate()
        var position
        if (parseInt(this.state.week) === 1){
            position = new Date(this.props.location.state.year, this.props.location.state.month-1, 1).getDay()
        }
        if (parseInt(this.state.week) === 5){
            position = new Date(this.props.location.state.year, this.props.location.state.month-1, n).getDay()
        }
        return (
            <div>
                <img src={arrow} onClick={()=> window.history.back()} className="img-arrow-back" alt="arrow"/>
                <div className="head-tittle-report">
                    <p>Reporte</p>
                    <span>Semanal</span>
                </div>
                <div className="header-reportMonth">
                    <select onChange={(e)=>this.ChangeWeek(e)}>
                        { weeks.map((item, i)=>(
                            <option value={i} key={i} >{item}</option>
                        ))}
                    </select>
                    <button onClick={this.GenerateReport}>Generar reporte</button>
                </div>
                {this.state.search === true ?
                <div className="div-report">
                    <p className="date-info-week">Desde: {parseInt(this.state.week) === 1 ? days[position] : days[0]} {this.state.week === 1 ? 1 : this.state.selectDays[0]} de {months[this.props.location.state.month-1]}. {this.props.location.state.year}</p>
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
                    <p className="date-info-week">Hasta: {parseInt(this.state.week) === 5 ? days[position] : days[6]} {this.state.week === 5 ? n : this.state.selectDays[this.state.selectDays.length - 1]} de {months[this.props.location.state.month-1]}. {this.props.location.state.year}</p>
                </div>: null}
            </div>
        )
    }
}
