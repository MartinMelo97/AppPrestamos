import React,{ Component } from 'react'
import './detallecliente.scss'

class DetalleCliente extends Component {
    constructor(props){
        super(props)
        this.state={
            client:'Alicia',
            active:2,
            email:'test@gmail.com',
            direction:'Col. Centro #20',
            phoneNumber:'772 123 9823',
        }
    }

    render(){
        return(
            <div className="detail">
                <div className="head">
                    <p className="client-name">{this.state.client}</p>
                    <span>Info</span>
                </div>
                <div className="client-data">
                    <p>Activos: <span>{this.state.active}</span></p>
                    <p>{this.state.email}</p>
                    <p>{this.state.direction}</p>
                    <p>{this.state.phoneNumber}</p>
                </div>
                <button className="edit-button">Editar</button>
            </div>
        )
    }
}

export default DetalleCliente