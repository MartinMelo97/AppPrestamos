import React from 'react'

const CustomerDetail = (props) => (
    props.customer ?

    <div className="detail">
        <div className="head">
            <p className="client-name">{props.customer.name}</p>
            <span>Info</span>
        </div>
        <div className="client-data">
            <p>Activos: <span>{props.customer.active}</span></p>
            <p>{props.customer.email}</p>
            <p>{props.customer.direction}</p>
            <p>{props.customer.phoneNumber}</p>
        </div>
        <button className="edit-button">Editar</button>
    </div>
    :
    <div>
        <p>Hola</p>
    </div>
)

export default CustomerDetail