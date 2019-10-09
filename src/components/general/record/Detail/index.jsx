import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import arrow from './../../../../assets/icons/left-arrow.svg'
import './../record.scss'

export default class DetailRecord extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }
    render() {
        const {Nombre, pago, fecha, num} = this.props.location.state
        return (
            <div>
                <div className="detail">
                <NavLink to="/dashboard"><img src={arrow} className="img-arrow-back" alt="arrow"/></NavLink>    
                <p className="head-record-detail">Detalle</p>
                    <div className="client-data">
                        <p>No. Pago: {num}</p>
                        <p>Cliente: {Nombre}</p>
                        <p>Pago: {pago} MXN</p>
                        <p>Fecha: {fecha}</p>
                    </div>
                </div>
            </div>
        )
    }
}
