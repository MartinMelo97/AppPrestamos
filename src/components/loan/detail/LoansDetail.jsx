import React, { Component } from 'react'
import './loans_detail.scss'
import arrow from '../../../assets/icons/left-arrow.svg'
import InfoLoan from './../info'
import LoanComplete from './../info/Information'
import moment from 'moment'
import {toast} from 'react-toastify'
class LoansDetail extends Component {
    constructor(props){
        super(props)
        this.state = {
            important: {
                range: 0,
            },
            day: 20,
            ultimateDay: 0,
            dateInit: "",
            dateEnd: "",
            month : "Enero",
            monthend: "",
            year : "2000",
            days : [],
            daystwo: [],
            startDay : 0,
            endDay: 0,
            contX: 2,
            datesProps:this.props.location.state,
            weeksDays : [
                "D","L","M","X","J","V","S"
            ]
        }

    }

    componentDidMount = () =>{
        var Init = this.Dates(this.props.location.state.fechaInicio)
        var End = this.Dates(this.props.location.state.fechaFin) 

        var diaInicio = Init[0]
        var mesInicio = Init[1]
        var diaFin = End[0]
        var mesFin = End[1]
        var Year = Init[2]
        var YearEnd = End[2]
        let { day, month, year, days, startDay, ultimateDay, endDay, daystwo, monthend } = this.state
        let months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
        let date = new Date()
        //The first moth
        startDay = new Date(Year, mesInicio-1, 1).getDay() + 1
        for(let i = 1; i <= new Date(date.getFullYear(), mesInicio, 0).getDate(); i++){
            days.push(`${i}`)
        }
        month = months[mesInicio-1]
        day = diaInicio
        year = Year

        // The second month
        endDay = new Date(YearEnd, mesFin-1, 1).getDay() + 1
        for(let i = 1; i <= new Date(date.getFullYear(), mesFin, 0).getDate(); i++){
            daystwo.push(`${i}`)
        }
        monthend = months[mesFin-1]
        ultimateDay= diaFin
        this.setState({important:{range: mesFin - mesInicio}})
        let monts = ["Ener", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
        let {dateEnd, dateInit } = this.state
        dateInit = diaInicio+" "+monts[mesInicio-1]+". "+Year
        dateEnd = diaFin+" "+monts[mesFin-1]+". "+YearEnd 
        this.setState({ day, month, year, days, startDay, ultimateDay, endDay, daystwo, monthend, dateEnd, dateInit })
        this.CountDays()
    }
    CountDays = () =>{
        var dateStart = this.Dates(this.props.location.state.fechaInicio)
        var dayStart = ('0'+ dateStart[0]).slice(-2)
        var monthStart = ('0'+ dateStart[1]).slice(-2)
        var date = dateStart[2] + "-" + monthStart + "-" + dayStart
        
        var today = moment()
        var before = moment(date)
        var days = today.diff(before, "days")

        var dateEnd = this.Dates(this.props.location.state.fechaFin)
        var dayEnd = ('0'+ dateEnd[0]).slice(-2)
        var monthEnd = ('0'+ dateEnd[1]).slice(-2)
        var dateEnding = dateEnd[2]+"-"+monthEnd+"-"+dayEnd
        var ending = moment(dateEnding)
        var range = ending.diff(before, "days")

          let {datesProps} = this.state
          datesProps.today = parseInt(days)
          datesProps.limit = parseInt(range)
          this.setState(datesProps)
    }

    Dates = (date) => {
        var array = date.split("/")
        var newArray = []
        // eslint-disable-next-line 
        array.map((item) => {
            newArray.push(parseInt(item))
        })
        return newArray
    }

    maping = () =>{
        let { startDay, contX, days, ultimateDay } = this.state
        var limit 
        if(this.state.important.range > 0){
            limit = days.length
        } else {
            limit = ultimateDay
        }
        var ActualDay
        var getMonth = new Date().getMonth()+1
        if(getMonth === this.Dates(this.props.location.state.fechaInicio)[1]){
        ActualDay = new Date().getDate()
        } else {
        ActualDay = days.length
        }
        var dateStar=this.Dates(this.props.location.state.fechaInicio)[0] 
        var rangeDays = []
        for(dateStar; dateStar<=ActualDay; dateStar++){
        rangeDays.push(dateStar)
        }
        //Select Days Correct 
        let SelectDays = []
        this.props.location.state.payments.forEach(item=>{
            if(this.Dates(item.date)[1]===this.Dates(this.props.location.state.fechaInicio)[1]){
                SelectDays.push(this.Dates(item.date)[0])
            }
        })
        let Select = [...new Set(SelectDays)]
        //Days not select
        rangeDays.forEach(date=>{
        Select.forEach(select=>{
            if(date === select){
            var index = rangeDays.indexOf(date)
            rangeDays.splice(index, 1)
            }
        })
        })

        let container = document.getElementById('calendar-body-loans')
        let text 
        let child 
        for(var i=0; i<days.length; i++){
            text = document.createTextNode(days[i])
            child = document.createElement('span')
            child.appendChild(text)
            child.style.gridColumn=startDay
            child.style.gridRow=contX
            if( days[i] >= this.state.day && days[i] <= limit){
                child.className="this-is-active"
            }
            for(var a=0; a<Select.length; a++){
                if(parseInt(days[i]) === parseInt(Select[a])){
                   child.className="this-is-select"
                }
            }
            for(var n=0; n<rangeDays.length; n++){
                if(parseInt(days[i]) === parseInt(rangeDays[n])){
                    child.className="this-not-select"
                }
            }

            container.appendChild(child)

            startDay++
            contX = startDay === 8 ? contX + 1 : contX
            startDay = startDay === 8 ?  1 : startDay
        }

        let calendar = document.getElementById('calendar-body-loans')
        if(contX < 8 && calendar != null && startDay > 1)
            calendar.style.gridTemplateRows= ('repeat(7, calc(100% / 7))')
        if(contX < 8 && calendar != null && startDay < 2)
            calendar.style.gridTemplateRows= ('repeat(6, calc(100% / 6))')
        if(contX < 7 && calendar != null)
            calendar.style.gridTemplateRows= ('repeat(6, calc(100% / 6))')
    }
    mapingo = () =>{
        let { endDay, contX, daystwo } = this.state
        var getMonth = new Date().getMonth()+1
        var ActualDay
        if(getMonth === this.Dates(this.props.location.state.fechaFin)[1]){
        ActualDay = new Date().getDate()
        }
        else {
            if(getMonth < this.Dates(this.props.location.state.fechaFin)[1]){
                ActualDay = 0
            }
            else{
                ActualDay = this.state.daystwo.length
            }
        }

        var dateStar= 1
        var rangeDays = []
        for(dateStar; dateStar<=ActualDay; dateStar++){
        rangeDays.push(dateStar)
        }

        //Select Days Correct 
        let SelectDays = []
        this.props.location.state.payments.forEach(item=> {
        if(this.Dates(item.date)[1]===this.Dates(this.props.location.state.fechaFin)[1]){
            SelectDays.push(this.Dates(item.date)[0])
        }
        
        })
        const Select = [...new Set(SelectDays)]

        //Days not select
        rangeDays.forEach(date=>{
        Select.forEach(select=>{
            if(date === select){
            var index = rangeDays.indexOf(date)
            rangeDays.splice(index, 1)
            }
        })
        })

        let container = document.getElementById('calendar-body-loans-two')
        let text 
        let child 
        for(let i = 0; i < daystwo.length; i++){
            text = document.createTextNode(daystwo[i])
            child = document.createElement('span')
            child.appendChild(text)
            child.style.gridColumn=endDay
            child.style.gridRow=contX
            if( daystwo[i] >= 1 && daystwo[i] <= this.state.ultimateDay){
                child.className="this-is-active"
            }
                for(var a=0; a<Select.length; a++){
                    if(parseInt(daystwo[i]) === parseInt(Select[a])){
                       child.className="this-is-select"
                    }
                }
                for(var n=0; n<rangeDays.length; n++){
                    if( parseInt(daystwo[i]) === parseInt(rangeDays[n])){
                        child.className="this-not-select"
                    }
                }    
            container.appendChild(child)

            endDay++
            contX = endDay === 8 ? contX + 1 : contX
            endDay = endDay === 8 ?  1 : endDay
        }

        let calendar = document.getElementById('calendar-body-loans-two')
        if(contX < 8 && calendar != null && endDay > 1)
            calendar.style.gridTemplateRows= ('repeat(7, calc(100% / 7))')
        if(contX < 8 && calendar != null && endDay < 2)
            calendar.style.gridTemplateRows= ('repeat(6, calc(100% / 6))')
        if(contX < 7 && calendar != null)
            calendar.style.gridTemplateRows= ('repeat(6, calc(100% / 6))')
    }
    RegisterPayment = () =>{
        var register = false
        var ActualDate = new Date().getDate()+"/"+ (new Date().getMonth()+1)+ "/" + new Date().getFullYear()
        this.props.location.state.payments.forEach(payment=>{
            if(payment.date === ActualDate){
                register = true
            }
        })

        if(register === true){
            toast.warn("Ya realizaste un pago hoy, vuelve mañana.")
        }else {
            this.props.history.push({
                pathname: '/prestamos/a-pagar/',
                state: this.state.datesProps
            })
        }
    }

    render(){
        const {cantidad, pago, restante, payments, prestamo, pagoPorDia, utilidad, limit} = this.props.location.state
        var percentage = (pago*100)/cantidad
        return(
            <div className="loans-div-container">
                <img src={arrow} onClick={()=> window.history.back()} className="img-arrow-back" alt="arrow"/>
                <p className="loans-detail-title">Detalles</p>
                {percentage < 100 ? 
                <div className="loans-div-container">
                <p className="p-pagoHoy">Pagar hoy ${this.props.location.state.pagoPorDia} MXN</p>   
                <button className="button-loans-detail" onClick={this.RegisterPayment}>Registrar pago</button>
                <InfoLoan
                cantidad={cantidad}
                pago={pago}
                restante={restante}
                payments={payments}
                utilidad={utilidad}
                prestamo={prestamo}
                dias={limit}
                pagoPorDia={pagoPorDia}
                />
                <p className="loans-detail-p">Inicio: <label>{this.state.dateInit}</label></p>
                <div className="calendar-loans">
                    <div id="calendar-header-loans">
                        <span className="month">{ this.state.month }</span>
                        <span className="month">{ this.state.year }</span>
                    </div>
                    <div id="calendar-body-loans">
                        {this.state.weeksDays.map((day, i)=>(
                            <span style = {{
                                gridColumn : `${i+1}`,
                                gridRow : 1
                            }} key={i}>{ day }</span>
                        ))}
                        {this.maping()}
                    </div>
                    
                    {this.state.important.range > 0 ?     
                    <div id="calendar-header-loans">
                        <span className="month">{ this.state.monthend }</span>
                        <span className="month">{ this.state.year }</span>
                    </div>
                    : null} 
                    <div id="calendar-body-loans-two">
                        {this.state.important.range > 0 ?this.state.weeksDays.map((day, i)=>(
                            <span style = {{
                                gridColumn : `${i+1}`,
                                gridRow : 1
                            }} key={i}>{ day }</span>
                        )) : null}
                       { this.state.important.range > 0 ?  this.mapingo() : null}
                    </div>
                </div>
                <p className="loans-detail-p">Término: <label>{this.state.dateEnd}</label></p>
                <div className="footer-info-calendar">
                        <div className="footer-list"><div className="circle-color-blue"/><span>Días del préstamo</span></div>
                        <div className="footer-list"><div className="circle-color-green"/><span>Días con pago</span></div>
                        <div className="footer-list"><div className="circle-color-red"/><span>Días sin pago</span></div>
                </div>
                </div> : <LoanComplete 
                dateEnd={this.state.dateEnd}
                dateInit={this.state.dateInit}
                cantidad={cantidad}
                pago={pago}
                utilidad={utilidad}
                prestamo={prestamo}
                restante={restante}
                dias={limit}/> }
            </div>
        )
    }
}

export default LoansDetail
