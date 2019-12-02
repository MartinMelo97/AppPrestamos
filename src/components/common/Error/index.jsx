import React, { Component } from 'react'
import error from './../../../assets/icons/padlock.svg'
import './index.scss'
export default class ErrorAccount extends Component {
    render() {
        return (
            <div className="error-locked">
                <p className="head-error-locked">Página bloqueada</p>
                <img src={error} alt="error" />
                <p>Lo siento, no tienes permiso para acceder.</p>
            </div>
        )
    }
}
