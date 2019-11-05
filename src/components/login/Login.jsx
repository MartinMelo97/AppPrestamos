import React, { useCallback } from 'react'
import './login.scss'
import {withRouter} from 'react-router-dom'
import firebase from 'firebase'
import {toast} from 'react-toastify'
import './../../animate.css'

const Login = ({ history }) => {
    const handleLogin = useCallback(
        async event => {
          event.preventDefault();
          const { email, password } = event.target.elements;
          try {
            await firebase
              .auth()
              .signInWithEmailAndPassword(email.value, password.value);
            history.push("/general/prestamos/");
          } catch (error) {
            toast.error("Ups! No es posible logearse.")
          }
        },
        [history]
      )

    return(
        <div className="login-container">
          <div className="login-container-form animated bounceInLeft">
            <p className="login-title">Iniciar sesión</p>
            <form onSubmit={handleLogin}> 
            <div className="login-topic">
                <p>Correo</p>
                <input name="email" type="email"/>
            </div>
            <div className="login-topic">
                <p>Contraseña</p>
                <input name="password" type="password"/>
            </div>
            <button type="submit" className="login-button">Entrar</button>
            </form>
            </div>
        </div>
        )
}

export default withRouter(Login)