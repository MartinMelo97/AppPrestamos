import React, { useCallback } from 'react'
import './../login/login.scss'
import {Link, withRouter} from 'react-router-dom'
import firebase from 'firebase'
import {toast} from 'react-toastify'

const Register = ({ history }) => {
    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
          await firebase
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value);
            toast.info("¡Usuario no registrado!")
          history.push("/");
        } catch (error) {
          toast.error("¡Error! Usuario no registrado.")
        }
      }, [history]);
    
    return(
        <div className="login-container">
            <p className="login-title">Registro</p>
            <form onSubmit={handleSignUp}> 
            <div className="login-topic">
                <p>Correo</p>
                <input name="email" type="email"/>
            </div>
            <div className="login-topic">
                <p>Contraseña</p>
                <input name="password" type="password"/>
            </div>
            <Link className="link-register" to="/">Olvidalo, tengo una cuenta.</Link>
            <button type="submit" className="login-button">Entrar</button>
            </form>
        </div>
        )
}

export default withRouter(Register)