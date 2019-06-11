import React, { Component } from 'react'
import './record.scss'
import arrow from '../../../assets/icons/left-arrow.svg'

class Record extends Component {
    constructor(props){
        super(props)
        this.state = {
            customers:[
                
            ],
            day: 1,
            actualDay: 1,
        }
    }

    render(){
        return(
            <div className="general-record-container">
                <img src={ arrow } alt="anterior" className="arrows"/>
                {this.state.day === this.state.actualDay ? 
                null
                :
                <img src={ arrow } alt="siguiente" className="arrows"/>}

                <p className="header-general-record">Historial</p>
                <span className="subtitle-general-record">
                {this.state.day === this.state.actualDay ? 
                'Hoy'
                :
                `${this.state.day}`}
                </span>
                <div className="customers-name-container">
                    { this.state.customers.length > 0 ?
                    this.state.customers.map((customer)=>(
                        <span>{ customer.name }</span>
                    ))
                    :
                    null }
                </div>
            </div>
        )
    }
}

export default Record