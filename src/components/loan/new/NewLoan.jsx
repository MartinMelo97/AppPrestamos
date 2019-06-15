import React, { Component } from 'react'
import './new_loan.scss'
import arrow from '../../../assets/icons/left-arrow.svg'
import plus from '../../../assets/icons/plus.svg'

class NewLoan extends Component {
    constructor(props){
        super(props)
        this.state = {
            loansLength: 19,
            client: null,
            customerNames:[
                'Alicia',
                'Pedro',
                'Martin',
                'Daniel',
                'Pablo',
                'Isaac'
            ],
            date: null,
            limit: null,
            days: [],
            active: false,
            select: false,
        }
    }

    date = () =>{
        let { date } = this.state
        let days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
        let months = [ 'Enero', 'Febrero', 'Merzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ]

        let thisDate = new Date()
        date = `${days[thisDate.getDay()]} ${thisDate.getDate()} ${months[thisDate.getMonth()]} ${thisDate.getFullYear()}`
        
        this.setState({ date })
    }

    selectClient = () =>{
        let { active } = this.state
        active = !active
        this.setState({ active })
    }
    inputClient = (i) =>{
        let select = document.getElementsByClassName(`opn${i}`)[0]
        let space = document.getElementsByClassName(`space`)[0]

        space.innerText = select.innerText
    }

    selectNumer = () =>{
        let { select } = this.state
        let number = document.getElementsByClassName('number-limit')[0].innerText;

        select = !select

        if( select ){
            let selector = document.getElementsByClassName(`numbers-container`)[0]
            let alloptions = document.getElementsByClassName(`number-option`)
            let option = document.getElementById(`n${number}`)
            for(let i = 0; i < alloptions.length; i++){
                alloptions[i].style.color="#000"
            }
            try{
                setTimeout(()=>{
                    option.style.color="#0ac8e5"
                    selector.scrollTo(0,40*(number-1))
                }, 0)
            }catch(e){
                alert(e)
            }
        }
        
        this.setState({ select })
    }
    inputNumber = (day) =>{
        let select = document.getElementById(`n${day}`)
        let space = document.getElementsByClassName(`number-limit`)[0]
        let options = document.getElementsByClassName(`number-option`)

        for(let i = 0; i < options.length; i++){
            options[i].style.color = "#000"
        }

        select.style.color = "#0ac8e5"

        space.innerText = select.innerText
    }

    componentDidMount = () =>{
        this.date()
        let { days } = this.state
        for(let i = 1; i < 51; i++){
            days.push(i)
        }
        this.setState({ days })
    }

    render(){
        return(
            <div className="new-loan-container">
                <p className="new-loan-title">Nuevo Prestamo</p>
                <span className="loan-number">{this.state.loansLength != null ?
                `#${this.state.loansLength+1}`
                :
                null}</span>
                <div className="data-container">
                    <span>Cliente</span>
                    <div 
                    className="select-customer"
                    onClick={ () => this.selectClient() }>
                        <p
                        className={`space ${this.state.active === false ? "not-active" : "active" }`}
                        >{ this.state.client != null ?
                        this.state.client
                        :
                        null }</p>
                        <img
                         src={ arrow }
                         alt="desplegar"
                         className={`view-button ${this.state.active === false ? "not-active" : "active" }`} />
                        <img src={ plus } alt="agregar" className="add-button"/>
                        <div
                        style={{
                            overflowY : this.state.customerNames.length >= 6 ? 'scroll' : 'hidden'
                        }}
                        className={`options-container ${this.state.active === false ? "not-active" : "active" }`}>
                            { this.state.customerNames.length > 0 ?
                            this.state.customerNames.map((name, i)=>(
                                <p 
                                className={`option opn${i}`}
                                onClick={()=>this.inputClient(i)}>{ name }</p>
                            ))
                            :
                            null }
                        </div>
                    </div>
                    <span>Cantidad</span>
                    <input type="number"/>
                    <span className="date-container">{ this.state.date != null ?
                    this.state.date
                    :
                    null }</span>
                    <div className="limit">
                        <span>Plazo</span>
                        <div className="choiseDay"
                        onClick = {()=>this.selectNumer()} >
                            <p 
                            className={`number-limit ${this.state.select ? 'active' : 'not-active'}`}>
                            { this.state.limit != null ?
                            this.state.limit
                            :
                            '20' }</p>
                            <div
                            className={`numbers-container ${this.state.select ? 'active' : 'not-active'}`} >
                                {this.state.days.map((day)=>(
                                    <span 
                                    className='number-option'
                                    id={`n${day}`}
                                    onClick={()=>this.inputNumber(day)}>
                                    {`${day}`}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <span>Días</span>
                    </div>
                    <button className="add-loan-button">Agregar</button>
                </div>
            </div>
        )
    }
}

export default NewLoan