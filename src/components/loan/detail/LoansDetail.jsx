import React, { Component } from 'react'
import './loans_detail.scss'

class LoansDetail extends Component {
    constructor(props){
        super(props)
        this.state = {
            numberLoan: 5,
            startDate:{
                day: 1,
                month: 4,
                nameMonth: null,
                year: 2019,
            },
            finishDate:{
                day: 21,
                month: 4,
                nameMonth: null,
                year: 2019,
            },
            days:[],
            limit: 20
        }
    }
    changeNameMonth = () =>{
        let { startDate, finishDate } = this.state
        let months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
        
        startDate.nameMonth = months[startDate.month]
        finishDate.nameMonth = months[finishDate.month]

        this.setState({ startDate, finishDate })

    }

    inputDays = () =>{
        let { days, startDate, finishDate, limit } = this.state
        let startMonth = new Date(0,startDate.month+1,startDate.year)

        for(let i = 1; i <= limit; i++){
            if(startMonth)
            days.push(startDate.day + i)
        }
    }

    componentDidMount = () =>{
        this.changeNameMonth()
        this.inputDays()
    }

    render(){
        return(
            <div className="loan-detail-container">
                <p className="loan-detail-title">Prestamo {`${this.state.numberLoan}`}</p>
                <span className="date start">{`${this.state.startDate.day} ${this.state.startDate.nameMonth} ${this.state.startDate.year}`}</span>
                <div className="calendar-loan-detail">

                </div>
                <span className="date finish">{`${this.state.finishDate.day} ${this.state.finishDate.nameMonth} ${this.state.finishDate.year}`}</span>
            </div>
        )
    }
}

export default LoansDetail