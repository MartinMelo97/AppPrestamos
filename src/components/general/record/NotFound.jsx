import React, { Component } from 'react'
import warn from './../../../assets/icons/warning.svg'
export default class NotFound extends Component {
    render() {
        return (
            <div className="Record-not-found">
                <img src={warn} alt="warning"/>
                <p>Ups! No se encontraron resultados.</p>
            </div>
        )
    }
}
