import React from 'react'
import {NavLink} from 'react-router-dom'
import './customer_detail.scss'

const CustomerDetail = (props) =>{
    const {nombre, correo, direccion, telefono} = props.location.state

    return(
        <div className="detail">
            <div className="head">
                <p className="client-name">{nombre}</p>
                <span>Info</span>
            </div>
            <div className="client-data">
                <p>Activos: <span>1</span></p>
                <p>{correo}</p>
                <p>{direccion}</p>
                <p>{telefono}</p>
            </div>
            <NavLink
            to={{
                pathname: '/clientes/editar/',
                state: {
                    id: props.location.state.id,
                    nombre: props.location.state.nombre,
                    apellido: props.location.state.apellido,
                    direccion: props.location.state.direccion,
                    correo: props.location.state.correo,
                    telefono: props.location.state.telefono
                }
            }}
            >
            <button className="edit-button">Editar</button></NavLink>
        </div>
    )
}

export default CustomerDetail