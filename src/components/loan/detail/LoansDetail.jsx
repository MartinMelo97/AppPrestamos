import React, { Component } from 'react'
import './loans_detail.scss'
import {NavLink} from 'react-router-dom'

class LoansDetail extends Component {
    constructor(props){
        super(props)
        this.state = {
            day : 1,
            ultimateDay: 20,
            dateInit: "",
            dateEnd: "",
            month : "Enero",
            year : "2000",
            days : [],
            startDay : 0,
            contX: 2,
            datesProps:"",
            weeksDays : [
                "D","L","M","X","J","V","S"
            ]
        }
    }

    componentDidMount = () =>{
        let { day, month, year, days, startDay } = this.state
        let months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
        let date = new Date()

        startDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay() + 1
        for(let i = 1; i <= new Date(date.getFullYear(), date.getMonth()+1, 0).getDate(); i++){
            days.push(`${i}`)
        }
        day = 1
        year = date.getFullYear()
        month = months[date.getMonth()]

        this.setState({ day, month, year, days, startDay })

        let monts = ["Ener", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
        const {diaInicio, diaFin, mesInicio, mesFin,Year} = this.props.location.state
        let {dateEnd, dateInit, datesProps} = this.state 
        datesProps = this.props.location.state
        dateInit = diaInicio+" "+monts[mesInicio-1]+". "+Year
        dateEnd = diaFin+" "+monts[mesFin-1]+". "+Year 
        this.setState({ dateEnd, dateInit, datesProps}) 
    }

    maping = () =>{
        let { startDay, contX, days } = this.state

        let container = document.getElementById('calendar-body-loans')
        let text
        let child
        for(let i = 0; i < days.length; i++){
            text = document.createTextNode(days[i])
            child = document.createElement('span')
            child.appendChild(text)
            child.style.gridColumn=startDay
            child.style.gridRow=contX
            if( days[i] >= this.state.day && days[i] <= this.state.ultimateDay)
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

    render(){
        return(
            <div className="loans-div-container">
                <p className="loans-detail-title">Prestamo</p>
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
                </div>
                <p className="loans-detail-p">{this.state.dateEnd}</p>
                <NavLink to={{
                    pathname: '/prestamos/a-pagar/',
                    state: this.state.datesProps
                }}><button className="button-loans-detail">Liquidar</button></NavLink>
            </div>
        )
    }
}

export default LoansDetail
