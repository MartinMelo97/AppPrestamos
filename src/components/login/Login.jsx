import React, { Component } from 'react'
import './login.scss'

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            topics: [
                'correo',
                'contraseña'
            ]
        }
    }

    render(){
        return(
            <div className="login-container">
                <p className="login-title">Iniciar sesión</p>
                {this.state.topics.map((topic, i)=>(
                    <div className="login-topic" key={i}>
                        <p>{ topic }</p>
                        <input type={ topic === 'contraseña' ? 'password' : 'text' }/>
                    </div>
                ))}
                <button className="login-button">Entrar</button>
            </div>
        )
    }
}

export default Login