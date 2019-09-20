import React from 'react'
import sun from '../../../assets/icons/sun.svg'
import {Link} from 'react-router-dom'

const HamburgerMenu = (props) =>{
    return(
        <div className={ "side-bar-content " + props.active }>
            <div className="side-bar">
                <div className="day">
                    <p>{props.day}</p>
                    <img src={sun} alt="sol"/>
                    <p>{props.user}</p>
                </div>
                <div className="options-side-bar">
                    <Link to="/clientes/prestamos/" className="Link-option"><p>Clientes</p></Link>
                    <Link to="/general/historial/" className="Link-option"><p>Historial</p></Link>
                    <Link to="/general/corte-dia/" className="Link-option"><p>Corte del día</p></Link>
                    <Link to="/general/resumen/" className="Link-option"><p>Resumen Gral.</p></Link>
                    <Link to="/general/prestamos/" className="Link-option"><p>Prestamos</p></Link>
                </div>
            </div>
            <div className="on-click-exit" onClick={props.sidebar}></div>
        </div>
    )
}

export default HamburgerMenu