import React, { Component } from 'react'
import './newcustomer.scss'

class NewCustomer extends Component {
    constructor(props){
        super(props)
        this.state = {
            topics : [
                'Nombre',
                'Apellidos',
                'Dirección',
                'Correo',
                'Teléfono'
            ]
        }
    }

    render(){
        return(
            <div className="new-custumer-container">
                <p className="title-new-customer">Nuevo Cliente</p>
                <div className="topics-container">
                    {this.state.topics.map((topic, i)=>(
                        i != this.state.topics.length-1 ?
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
        )
    }
}

export default NewCustomer