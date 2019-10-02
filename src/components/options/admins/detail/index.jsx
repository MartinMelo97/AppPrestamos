import React from 'react'
import {NavLink} from 'react-router-dom'

const AdminDetail = (props) =>{
    const {username, email, fecha, active} = props.location.state
    return(
        <div className="detail">
            <div className="head">
                <p className="client-name">{username}</p>
                <span>Info</span>
            </div>
            <div className="client-data">
                <p>Activos: <span>1</span></p>
                <p>{email}</p>
                <p>{fecha}</p>
                {active === true ?
                <p>Super Admin</p> :
                <p>Admin. Normal</p>
                 }
                
            </div>
            <NavLink
            to={{
                pathname: '/admins/editar/',
                state: props.location.state
            }}
            >
            <button className="edit-button">Editar</button></NavLink>
        </div>
    )
}

export default AdminDetail