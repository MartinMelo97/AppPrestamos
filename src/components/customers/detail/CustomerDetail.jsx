import React, { Component } from 'react'
import './customer_detail.scss'

const CustomerDetail = (props) =>{
        return(
            <div className="detail">
                <div className="head">
                    <p className="client-name"></p>
                    <span>Info</span>
                </div>
                <div className="client-data">
                    <p>Activos: <span></span></p>
                    <p>{props.id}</p>
                    <p>tion}</p>
                    <p>Number}</p>
                </div>
                <button className="edit-button">Editar</button>
            </div>
        )
}

export default CustomerDetail