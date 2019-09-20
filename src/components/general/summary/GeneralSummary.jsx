import React, { Component } from 'react'
import './general_summary.scss'

class GeneralSummary extends Component {
    constructor(props){
        super(props)
        this.state = {
            day : 1,
            month : "Enero",
            year : "2000",
            days : [],
            startDay : 0,
            contX: 2,
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
        day = date.getDate()
        year = date.getFullYear()
        month = months[date.getMonth()]

        this.setState({ day, month, year, days, startDay })
    }

    maping = () =>{
        let { startDay, contX, days } = this.state

        let container = document.getElementById('calendar-body')
        let text
        let child

        for(let i = 0; i < days.length; i++){
            text = document.createTextNode(days[i])
            child = document.createElement('span')
            child.appendChild(text)
            child.style.gridColumn=startDay
            child.style.gridRow=contX
            if( days[i] === this.state.day)
                child.className="this-is"
            container.appendChild(child)

            startDay++
            contX = startDay === 8 ? contX + 1 : contX
            startDay = startDay === 8 ?  1 : startDay
        }

        let calendar = document.getElementById('calendar-body')
        if(contX < 8 && calendar != null && startDay > 1)
            calendar.style.gridTemplateRows= ('repeat(7, calc(100% / 7))')
        if(contX < 8 && calendar != null && startDay < 2)
            calendar.style.gridTemplateRows= ('repeat(6, calc(100% / 6))')
        if(contX < 7 && calendar != null)
            calendar.style.gridTemplateRows= ('repeat(6, calc(100% / 6))')
    }

    render(){
        return(
            <div className="summary-div-container">
                <p className="summary-title">Resumen Gral</p>

                <div className="calendar">
                    <div id="calendar-header">
                        <span className="month">{ this.state.month }</span>
                        <span className="month">{ this.state.year }</span>
                    </div>
                    <div id="calendar-body">
                        {this.state.weeksDays.map((day, i)=>(
                            <span style = {{
                                gridColumn : `${i+1}`,
                                gridRow : 1
                            }}>{ day }</span>
                        ))}
                        {this.maping()}
                    </div>
                </div>
            </div>
        )
    }
}

export default GeneralSummary