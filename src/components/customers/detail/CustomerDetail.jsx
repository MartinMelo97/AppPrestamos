import React from 'react'
import './customer_detail.scss'

const CustomerDetail = (props) =>{
        return(
            <div className="detail">
                <div className="head">
                    <p className="client-name">{props.nombre}</p>
                    <span>Info</span>
                </div>
                <div className="client-data">
                    <p>Activos: <span>1</span></p>
                    <p>{props.correo}</p>
                    <p>{props.direccion}</p>
                    <p>{props.telefono}</p>
                </div>
                <button className="edit-button">Editar</button>
            </div>
        )
}

export default CustomerDetail