import React, { useCallback } from 'react'
import './../login/login.scss'
import {Link, withRouter} from 'react-router-dom'
import firebase from 'firebase'
import {toast} from 'react-toastify'
import './../../animate.css'

const Register = ({ history }) => {
    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const { email, password, username } = event.target.elements;
        try {
          await firebase
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value);
            firebase.firestore().collection('admin').add({
              correo: email.value,
              password: password.value,
              username: username.value
            }).catch((err)=>{
              console.log(err)
            })
            toast.info("¡Usuarioregistrado! \nAhora inicia sesión")
            email.value = ""
            password.value = ""
            username.value = ""
            history.push("/registro")
        } catch (error) {
          toast.error("¡Error! Usuario no registrado.")
        }
      }, [history]);
    
    return(
        <div className="login-container">
          <div className="login-container-form animated bounceInRight">
            <p className="login-title">Registro</p>
            <form onSubmit={handleSignUp}> 
            <div className="login-topic">
                <p>Correo</p>
                <input name="email" type="email"/>
            </div>
            <div className="login-topic">
                <p>Username</p>
                <input name="username" type="text"/>
            </div>
            <div className="login-topic">
                <p>Contraseña</p>
                <input name="password" type="password"/>
            </div>
            <Link className="link-register" to="/">Olvidalo, tengo una cuenta.</Link>
            <button type="submit" className="login-button">Crear</button>
            </form>
            </div>
        </div>
        )
}

export default withRouter(Register)