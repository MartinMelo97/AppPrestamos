import React from 'react'
import {NavLink} from 'react-router-dom'
import arrow from '../../../../assets/icons/left-arrow.svg'

const AdminDetail = (props) =>{
    const {username, lastname, phone, root, email} = props.location.state
    return(
        <div className="detail">
            <NavLink to="/opciones/admins"><img src={arrow} className="img-arrow-back" alt="arrow"/></NavLink>
            <div className="head">
                <p className="client-name">{username}</p>
                <span>Info</span>
            </div>
            <div className="client-data">
                <p>Apellido <span>{lastname}</span></p>
                <p>Correo <span>{email}</span></p>
                <p>Teléfono<span>{phone}</span></p>
                {root === true ?
                <p>Súper Administrador</p> :
                <p>Administrador Normal</p>
                 }
                
            </div>
        </div>
    )
}

export default AdminDetail