import React, { Component } from 'react'
import './loader.scss'
export default class loader extends Component {
    render() {
        return (
            <div className="loader">
                <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                <p>Cargando</p>
            </div>
        )
    }
}
