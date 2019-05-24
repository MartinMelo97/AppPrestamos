import React, { Component } from 'react'
import 'antd/dist/antd.css'
import '/Login.css'
import { Button, Input, Icon } from 'antd';


class Login extends Component {
    render(){
        return (
            <div >
                <h1 className="tittle">Iniciar sesión</h1>
                <label>correo</label><br/> 
                <input type="text" className="input-lg" /><br/> <br/> 
                <label>contraseña</label> <br/> 
                <input type="pass" className="input-lg" /><br/> <br/> 
                
            <center>
        <Button 
            className="btn-style"
            shape="round"
            size="large"
           // onClick={}
            >Entrar</Button>
        </center>
                 
            </div>
        ) 
    }
}

export default Login;