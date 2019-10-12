import React, { Component } from 'react'
import './loans_detail.scss'
import {NavLink} from 'react-router-dom'
import arrow from '../../../assets/icons/left-arrow.svg'
import InfoLoan from './../info'
import LoanComplete from './../info/Information'
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
            datesProps:"",
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
        console.log(this.props.location.state)
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
        
        this.setState({ day, month, year, days, startDay, ultimateDay, endDay, daystwo, monthend })
        

        let monts = ["Ener", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
        
        let {dateEnd, dateInit, datesProps} = this.state 
        datesProps = this.props.location.state
        dateInit = diaInicio+" "+monts[mesInicio-1]+". "+Year
        dateEnd = diaFin+" "+monts[mesFin-1]+". "+YearEnd 
        this.setState({ dateEnd, dateInit, datesProps})
    }

    Dates = (date) => {
        var array = date.split("/")
        var newArray = []
        array.map((item) =>{
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
        let container = document.getElementById('calendar-body-loans')
        let text 
        let child 
        for(let i = 0; i < days.length; i++){
            text = document.createTextNode(days[i])
            child = document.createElement('span')
            child.appendChild(text)
            child.style.gridColumn=startDay
            child.style.gridRow=contX
            if( days[i] >= this.state.day && days[i] <= limit)
                child.className="this-is-active"
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

        let container = document.getElementById('calendar-body-loans-two')
        let text 
        let child 
        for(let i = 0; i < daystwo.length; i++){
            text = document.createTextNode(daystwo[i])
            child = document.createElement('span')
            child.appendChild(text)
            child.style.gridColumn=endDay
            child.style.gridRow=contX
            if( daystwo[i] >= 1 && daystwo[i] <= this.state.ultimateDay)
                child.className="this-is-active"
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

    render(){
        const {cantidad, pago, restante, payments} = this.props.location.state
        var percentage = (pago*100)/cantidad
        return(
            <div className="loans-div-container">
                <img src={arrow} onClick={()=> window.history.back()} className="img-arrow-back" alt="arrow"/>
                <p className="loans-detail-title">Detalles</p>
                {percentage < 100 ? 
                <div className="loans-div-container">
                <NavLink to={{
                    pathname: '/prestamos/a-pagar/',
                    state: this.state.datesProps
                }}><button className="button-loans-detail">Registrar pago</button></NavLink>
                <InfoLoan
                cantidad={cantidad}
                pago={pago}
                restante={restante}
                payments={payments}
                />
                <p className="loans-detail-p">{this.state.dateInit}</p>
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
                <p className="loans-detail-p">{this.state.dateEnd}</p>
                </div> : <LoanComplete 
                dateEnd={this.state.dateEnd}
                dateInit={this.state.dateInit}
                cantidad={cantidad}
                pago={pago}
                restante={restante}/> }
            </div>
        )
    }
}

export default LoansDetail
