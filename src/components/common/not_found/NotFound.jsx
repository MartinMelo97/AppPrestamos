import React, { Component } from 'react'
import NotFound from './../../../assets/icons/page-not-found.svg'
import './../Error/index.scss'
export default class ErrorAccount extends Component {
    render() {
        return (
            <div className="error-locked">
                <p className="head-error-locked">Página no encontrada</p>
                <img src={NotFound} alt="NotFound" />
                <p>ERROR 404</p>
            </div>
        )
    }
}
