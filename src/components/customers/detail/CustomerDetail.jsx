import React from 'react'
import {NavLink} from 'react-router-dom'
import './customer_detail.scss'
import arrow from './../../../assets/icons/left-arrow.svg'

const CustomerDetail = (props) =>{
    const {nombre, correo, direccion, telefono, apellido} = props.location.state

    return(
        <div className="detail">
            <img src={arrow} onClick={()=> window.history.back()} className="img-arrow-back" alt="arrow"/>
            <div className="head">
                <p className="client-name">{nombre}</p>
                <span>Info</span>
            </div>
            <div className="client-data">
                <p>Apellido: <span>{apellido}</span></p>
                <p>Correo: <span>{correo}</span></p>
                <p>Dirección: <span>{direccion}</span></p>
                <p>Teléfono: <span>{telefono}</span></p>
            </div>
            <NavLink
            to={{
                pathname: '/clientes/editar/',
                state: {
                    id: props.location.state.id
                }
            }}
            >
            <button className="edit-button">Editar</button></NavLink>
        </div>
    )
}

export default CustomerDetail