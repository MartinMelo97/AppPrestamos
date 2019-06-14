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
                'Erik',
                'Victor'
            ],
            date: null,
            limit: null,
            active: false
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

    componentDidMount = () =>{
        this.date()
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
                        className={`options-container ${this.state.active === false ? "not-active" : "active" }`}>
                            { this.state.customerNames.length > 0 ?
                            this.state.customerNames.map((name)=>(
                                <p className="option">{ name }</p>
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
                        <div className="choiseDay">
                            <span>{ this.state.limit != null ?
                            this.state.limit
                            :
                            null }</span>
                            <span>Días</span>
                        </div>
                    </div>
                    <button>Agregar</button>
                </div>
            </div>
        )
    }
}

export default NewLoan