import React, { Component } from 'react'
import {Link} from'react-router-dom' 
import './index.scss' 
import firebase from 'firebase'
export default class MenuOptions extends Component {
    render() {
        return (
            <div>
                <Link to="/opciones/admins" className="configuration-option"><p>Administradores</p></Link>
                <div className="configuration-option" onClick={() => firebase.auth().signOut()}><p>Cerrar sesión</p></div>
            </div>
        )
    }
}
