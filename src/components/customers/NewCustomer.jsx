import React, { Component } from 'react'

const NewCustomer = (props) => (
    props.topics ?
    <div className="new-custumer-container">
        <p className="title-new-customer">Nuevo Cliente</p>
        <div className="topics-container">
            {props.topics.map((topic, i)=>(
                i != props.topics.length-1 ?
                <div className="topic">
                    <p>{topic}</p>
                    <input type="text"/>
                </div>
                :
                <div className="topic">
                    <p>{topic}</p>
                    <input type="number"/>
                </div>
            ))}
        </div>
        <button className="add-button">Agregar</button>
    </div>
    :
    <div>
        <p>Error</p>
    </div>

)

export default NewCustomer